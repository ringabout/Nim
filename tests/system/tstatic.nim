discard """
  targets: "c cpp js"
"""

import std/strutils


block: # bug #6133
  block:
    proc foo(q: string, a: int): int =
      result = q.len

    proc foo(q: static[string]): int =
      result = foo(q, 5)

    doAssert foo("123") == 3

  block:
    type E = enum A

    if false:
      var e = A
      discard $e

    proc foo(a: string): int =
      len(a) # 16640

    proc foo(a: static[bool]): int {.used.} =
      discard

    doAssert foo("") == 0

  block:
    proc foo(a: string): int =
      len(a)

    proc foo(a: static[bool]): int {.used.} =
      discard

    doAssert foo("abc") == 3

  block:
    proc parseInt(f: static[bool]): int {.used.} = discard

    doAssert "123".parseInt == 123
