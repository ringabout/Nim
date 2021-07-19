discard """
  targets: "c cpp js"
"""

import std/strtabs


# bug #18489
macro m =
  var t = {"name": "John"}.newStringTable
  doAssert t["name"] == "John"

block:
  var t = {"name": "John"}.newStringTable
  doAssert t["name"] == "John"

m()
