discard """
  targets: "c cpp"
  matrix: "--gc:orc --threads:on; --gc:orc --threads:on -d:blockingTest"
  disabled: "windows"
  disabled: "bsd"
"""

include std/channel

import std/unittest


type
  ChannelBufKind = enum
    Unbuffered # Unbuffered (blocking) channel
    Buffered   # Buffered (non-blocking channel)


proc capacity(chan: ChannelRaw): int32 {.inline.} = chan.size - 1
func isBuffered(chan: ChannelRaw): bool =
  chan.size - 1 > 0

when defined(blockingTest):
  const nonBlocking = false
else:
  const nonBlocking = true

type
  Pthread {.importc: "pthread_t", header: "<sys/types.h>".} = distinct culong
  PthreadAttr* {.byref, importc: "pthread_attr_t", header: "<sys/types.h>".} = object
  Errno* = distinct cint

proc pthread_create[T](
      thread: var Pthread,
      attr: ptr PthreadAttr, # In Nim this is a var and how Nim sets a custom stack
      fn: proc (x: ptr T): pointer {.thread, noconv.},
      arg: ptr T
  ): Errno {.header: "<sys/types.h>".}

proc pthread_join(
      thread: Pthread,
      thread_exit_status: ptr pointer
    ): Errno {.header: "<pthread.h>".}

template channel_send_loop(chan: ChannelRaw,
                      data: sink pointer,
                      size: int32,
                      body: untyped): untyped =
  while not channel_send(chan, data, size, nonBlocking):
    body

template channel_receive_loop(chan: ChannelRaw,
                        data: pointer,
                        size: int32,
                        body: untyped): untyped =
  while not channel_receive(chan, data, size, nonBlocking):
    body

when not compileOption("threads"):
  {.error: "This requires --threads:on compilation flag".}

# Without threads:on or release,
# worker threads will crash on popFrame

import unittest, strformat

type ThreadArgs = object
  ID: int32
  chan: ChannelRaw

template Worker(id: int32, body: untyped): untyped {.dirty.} =
  if args.ID == id:
    body

template Master(body: untyped): untyped =
  Worker(0, body)

const Sender = 1
const Receiver = 0

proc runSuite(
            name: string,
            fn: proc(args: ptr ThreadArgs): pointer {.noconv, gcsafe.}
          ) =
  var chan: ChannelRaw

  for impl in Mpmc .. Spsc:
    for i in Unbuffered .. Buffered:
      test &"{i:10} {impl} channels":
        if i == Unbuffered:
          chan = allocChannel(size = 32, n = 0, impl)
          check:
            peek(chan) == 0
            capacity(chan) == 0
            isBuffered(chan) == false
            isUnbuffered(chan) == true
            chan.impl == impl
        else:
          chan = allocChannel(size = int.sizeof.int32, n = 7, impl)
          check:
            peek(chan) == 0
            capacity(chan) == 7
            isBuffered(chan) == true
            isUnbuffered(chan) == false
            chan.impl == impl

        var threads: array[2, Pthread]
        var args = [
          ThreadArgs(ID: 0, chan: chan),
          ThreadArgs(ID: 1, chan: chan)
        ]

        discard pthread_create(threads[0], nil, fn, args[0].addr)
        discard pthread_create(threads[1], nil, fn, args[1].addr)

        discard pthread_join(threads[0], nil)
        discard pthread_join(threads[1], nil)

        freeChannel(chan)

# ----------------------------------------------------------------------------------

proc thread_func(args: ptr ThreadArgs): pointer {.noconv.} =

  # Worker RECEIVER:
  # ---------
  # <- chan
  # <- chan
  # <- chan
  #
  # Worker SENDER:
  # ---------
  # chan <- 42
  # chan <- 53
  # chan <- 64
  #

  Worker(Receiver):
    var val: int
    for j in 0 ..< 3:
      channel_receive_loop(args.chan, val.addr, val.sizeof.int32):
        # Busy loop, normally it should yield
        discard
      check: val == 42 + j*11

  Worker(Sender):
    var val: int
    check: peek(args.chan) == 0
    for j in 0 ..< 3:
      val = 42 + j*11
      channel_send_loop(args.chan, val.addr, val.sizeof.int32):
        # Busy loop, normally it should yield
        discard

  return nil

runSuite("[ChannelRaw] 2 threads can send data", thread_func)

# ----------------------------------------------------------------------------------

iterator pairs(chan: ChannelRaw, T: typedesc): (int, T) =
  var i = 0
  var x: T
  while not isClosed(chan) or peek(chan) > 0:
    let r = channel_receive(chan, x.addr, x.sizeof.int32, true)
    # printf("x: %d, r: %d\n", x, r)
    if r:
      yield (i, x)
      inc i

proc thread_func_2(args: ptr ThreadArgs): pointer {.noconv.} =
  # Worker RECEIVER:
  # ---------
  # <- chan until closed and empty
  #
  # Worker SENDER:
  # ---------
  # chan <- 42, 53, 64, ...

  const N = 100

  Worker(Receiver):
    for j, val in pairs(args.chan, int):
      # TODO: Need special handling that doesn't allocate
      #       in thread with no GC
      #       when check fails
      #
      check: val == 42 + j*11

  Worker(Sender):
    var val: int
    check: peek(args.chan) == 0
    for j in 0 ..< N:
      val = 42 + j*11
      channel_send_loop(args.chan, val.addr, int.sizeof.int32):
        discard
    discard channel_close(args.chan)

  return nil

runSuite("[ChannelRaw] channel_close, freeChannel, channelCache", thread_func_2)

# ----------------------------------------------------------------------------------

proc isCached(chan: ChannelRaw): bool =
  assert not chan.isNil

  var p = channelCache
  while not p.isNil:
    if chan.itemsize == p.chanSize and
        chan.size-1 == p.chanN and
        chan.impl == p.chanKind:
      for i in 0 ..< p.numCached:
        if chan == p.cache[i]:
          return true
      # No more channel in cache can match
      return false
    p = p.next
  return false

block: # [ChannelRaw] ChannelRaw caching implementation

  # Start from clean cache slate
  freeChannelCache()

  block: # Explicit caches allocation
    check:
      allocChannelCache(int32 sizeof(char), 4, Mpmc)
      allocChannelCache(int32 sizeof(int32), 8, Mpsc)
      allocChannelCache(int32 sizeof(ptr float64), 16, Spsc)

      # Don't create existing channel cache
      not allocChannelCache(int32 sizeof(char), 4, Mpmc)
      not allocChannelCache(int32 sizeof(int32), 8, Mpsc)
      not allocChannelCache(int32 sizeof(ptr float64), 16, Spsc)

    check:
      channelCache.chanKind == Spsc
      channelCache.next.chanKind == Mpsc
      channelCache.next.next.chanKind == Mpmc

      channelCacheLen == 3

  # ---------------------------------
  var chan, stash: array[10, ChannelRaw]

  block: # Implicit caches allocation

    chan[0] = allocChannel(int32 sizeof(char), 4, Mpmc)
    chan[1] = allocChannel(int32 sizeof(int32), 8, Mpsc)
    chan[2] = allocChannel(int32 sizeof(ptr float64), 16, Spsc)

    chan[3] = allocChannel(int32 sizeof(char), 5, Mpmc)
    chan[4] = allocChannel(int32 sizeof(int64), 8, Mpsc)
    chan[5] = allocChannel(int32 sizeof(ptr float64), 16, Mpsc)

    # We have caches ready to store specific channel kinds
    check: channelCacheLen == 6 # Cumulated with previous test
    # But they are not in cache while in use
    check:
      not chan[0].isCached
      not chan[1].isCached
      not chan[2].isCached
      not chan[3].isCached
      not chan[4].isCached
      not chan[5].isCached

  block: # Freed channels are returned to cache
    stash[0..5] = chan.toOpenArray(0, 5)
    for i in 0 .. 5:
      # Free the channels
      freeChannel(chan[i])

    check:
      stash[0].isCached
      stash[1].isCached
      stash[2].isCached
      stash[3].isCached
      stash[4].isCached
      stash[5].isCached

  block: # Cached channels are being reused

    chan[6] = allocChannel(int32 sizeof(char), 4, Mpmc)
    chan[7] = allocChannel(int32 sizeof(int32), 8, Mpsc)
    chan[8] = allocChannel(int32 sizeof(ptr float32), 16, Spsc)
    chan[9] = allocChannel(int32 sizeof(ptr float64), 16, Spsc)

    # All (itemsize, queue size, implementation) were already allocated
    check: channelCacheLen == 6

    # We reused old channels from cache
    check:
      chan[6] == stash[0]
      chan[7] == stash[1]
      chan[8] == stash[2]
      # chan[9] - required a fresh alloc

  block: # Clearing the cache

    stash[6..9] = chan.toOpenArray(6, 9)

    for i in 6 .. 9:
      freeChannel(chan[i])

    check:
      stash[6].isCached
      stash[7].isCached
      stash[8].isCached
      stash[9].isCached

    freeChannelCache()

    # Check that nothing is cached anymore
    for i in 0 .. 9:
      check: not stash[i].isCached
    # And length is reset to 0
    check: channelCacheLen == 0

    # Cache can grow again
    chan[0] = allocChannel(int32 sizeof((int, float, int32, uint)), 1, Spsc)
    chan[1] = allocChannel(int32 sizeof(int32), 0, Spsc)
    chan[2] = allocChannel(int32 sizeof(int32), 0, Spsc)

    check: channelCacheLen == 2

    # Interleave cache clear and channel free
    freeChannelCache()
    check: channelCacheLen == 0

    freeChannel(chan[0])
    freeChannel(chan[1])
    freeChannel(chan[2])