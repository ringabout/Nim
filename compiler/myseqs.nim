type
  NimSeqPayload[T] = object
    len, cap: int
    data: ptr UncheckedArray[T]
  PointerSeq*[T] = object
    p: ptr NimSeqPayload[T]

proc supportsCopyMem(t: typedesc): bool {.magic: "TypeTrait".}

proc shrink*[T](x: var PointerSeq[T]; newLen: Natural) {.tags: [], raises: [].} =
  #sysAssert newLen <= x.len, "invalid newLen parameter for 'shrink'"
  when not supportsCopyMem(T):
    for i in countdown(x.p.len - 1, newLen):
      reset x.p.data[i]
  # XXX This is wrong for const seqs that were moved into 'x'!
  x.p.len = newLen

proc collectionToString[T](x: T, prefix, separator, suffix: string): string =
  result = prefix
  var firstElement = true
  for value in items(x):
    if firstElement:
      firstElement = false
    else:
      result.add(separator)

    when value isnot string and value isnot seq and compiles(value.isNil):
      # this branch should not be necessary
      if value.isNil:
        result.add "nil"
      else:
        result.addQuoted(value)
    else:
      result.addQuoted(value)
  result.add(suffix)

proc `=destroy`*[T](x: var PointerSeq[T]) =
  if x.p != nil and x.p.data != nil:
    for i in 0..<x.p.len: `=destroy`(x.p.data[i])
    dealloc(x.p.data)

proc `=trace`[T](x: var PointerSeq[T]; env: pointer) =
  # `=trace` allows the cycle collector `--mm:orc`
  # to understand how to trace the object graph.
  if x.p.data != nil and x.p.data != nil:
    for i in 0..<x.p.len: `=trace`(x.p.data[i], env)

proc `=copy`*[T](a: var PointerSeq[T]; b: PointerSeq[T]) =
  # do nothing for self-assignments:
  if a.p == b.p: return
  `=destroy`(a)
  wasMoved(a)
  a.p.len = b.p.len
  a.p.cap = b.p.cap
  if b.p.data != nil:
    a.p.data = cast[typeof(a.p.data)](alloc(a.p.cap * sizeof(T)))
    for i in 0..<a.p.len:
      a.p.data[i] = b.p.data[i]

proc `=sink`*[T](a: var PointerSeq[T]; b: PointerSeq[T]) =
  # move assignment, optional.
  # Compiler is using `=destroy` and `copyMem` when not provided
  `=destroy`(a)
  wasMoved(a)
  a.p = b.p

iterator items*[T](x: PointerSeq[T]): lent T =
  for i in 0..<x.p.len:
    yield x.p.data[i]

proc `$`*[T](x: PointerSeq[T]): string =
  collectionToString(x, "@[", ", ", "]")

proc add*[T](x: var PointerSeq[T]; y: sink T) =
  if x.p.len >= x.p.cap:
    x.p.cap = max(x.p.len + 1, x.p.cap * 2)
    x.p.data = cast[typeof(x.p.data)](realloc(x.p.data, x.p.cap * sizeof(T)))
  x.p.data[x.p.len] = y
  inc x.p.len

proc `[]`*[T](x: PointerSeq[T]; i: Natural): T =
  assert i < x.p.len
  x.p.data[i]

proc `[]`*[T](x: var PointerSeq[T]; i: Natural): var T =
  assert i < x.p.len
  x.p.data[i]

proc `[]=`*[T](x: var PointerSeq[T]; i: Natural; y: sink T) =
  assert i < x.p.len
  x.p.data[i] = y

proc createSeq*[T](elems: varargs[T]): PointerSeq[T] =
  result.p = cast[ptr NimSeqPayload[T]](alloc(sizeof(NimSeqPayload[T])))
  result.p.cap = elems.len
  result.p.len = elems.len
  result.p.data = cast[typeof(result.p.data)](alloc(result.p.cap * sizeof(T)))
  for i in 0..<result.p.len: result.p.data[i] = elems[i]

proc createSeq*[T](x: var PointerSeq[T], children: int) =
  x.p = cast[ptr NimSeqPayload[T]](alloc(sizeof(NimSeqPayload[T])))
  x.p.cap = children
  x.p.len = children
  x.p.data = cast[typeof(x.p.data)](alloc(x.p.cap * sizeof(T)))

proc createSeqOfCap*[T](children: int): PointerSeq[T] =
  result.p = cast[ptr NimSeqPayload[T]](alloc(sizeof(NimSeqPayload[T])))
  result.p.cap = children
  result.p.len = children

proc `[]`*[T](s: PointerSeq[T]; i: BackwardsIndex): T {.inline.} =
  `[]`(s, s.len - int(i))

proc `[]`*[T](s: var PointerSeq[T]; i: BackwardsIndex): var T {.inline.} =
  `[]`(s, s.len - int(i))

proc `[]=`*[T](s: var PointerSeq[T]; i: BackwardsIndex; x: T) {.inline.} =
  `[]=`(s, s.len - int(i), x)

proc setLen*[T](x: var PointerSeq[T], newlen: Natural) =
  if newlen < x.p.len:
    shrink(x, newlen)
  elif newlen == x.p.len:
    discard
  else:
    x.p.cap = newlen # todo max(resize(x.p.len), newlen)
    x.p.len = newlen
    x.p.data = cast[typeof(x.p.data)](realloc(x.p.data, x.p.cap * sizeof(T)))

proc pop*[T](s: var PointerSeq[T]): T {.inline, noSideEffect.} =
  var L = s.len-1
  result = move s.p.data[L]
  shrink(s, L)

proc len*[T](x: PointerSeq[T]): int {.inline.} =
  # todo x.p != nil ?
  x.p.len

iterator pairs*[T](a: PointerSeq[T]): tuple[key: int, val: T] {.inline.} =
  ## Iterates over each item of `a`. Yields `(index, a[index])` pairs.
  var i = 0
  while i < len(a):
    yield (i, a[i])
    inc(i)

template `^^`(s, i: untyped): untyped =
  (when i is BackwardsIndex: s.len - int(i) else: int(i))

proc `[]`*[T; U, V: Ordinal](s: PointerSeq[T], x: HSlice[U, V]): PointerSeq[T] =
  let a = s ^^ x.a
  let L = (s ^^ x.b) - a + 1
  createSeq(result, L)
  for i in 0 ..< L: result[i] = s[i + a]