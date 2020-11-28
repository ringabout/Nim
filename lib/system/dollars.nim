import std/private/since
import commonstrs

proc `$`*(x: int): string {.magic: "IntToStr", noSideEffect.}
  ## The stringify operator for an integer argument. Returns `x`
  ## converted to a decimal string. ``$`` is Nim's general way of
  ## spelling `toString`:idx:.

when defined(js):
  since (1, 3):
    proc `$`*(x: uint): string =
      ## Caveat: currently implemented as $(cast[int](x)), tied to current
      ## semantics of js' Number type.
      # for c, see strmantle.`$`
      $(cast[int](x))

    proc `$`*(x: uint64): string =
      ## Compatibility note:
      ## the results may change in future releases if/when js target implements
      ## 64bit ints.
      # pending https://github.com/nim-lang/RFCs/issues/187
      $(cast[int](x))
else:
  proc `$`*(x: uint64): string {.noSideEffect, raises: [].} =
    ## The stringify operator for an unsigned integer argument. Returns `x`
    ## converted to a decimal string.
    if x == 0:
      return "0"
    elif x == 1:
      return "1"

    var num = x
    let length = digits10(num)
    setLen(result, length)
    var next = length - 1

    while num >= 100:
      let index = (num mod 100) * 2
      num = num div 100
      result[next] = digitsTable[index + 1]
      result[next - 1] = digitsTable[index]
      dec(next, 2)

    # process last 1-2 digits
    if num < 10:
      result[next] = chr(ord('0') + num)
    else:
      let index = num * 2
      result[next] = digitsTable[index + 1]
      result[next - 1] = digitsTable[index]

proc `$`*(x: int64): string {.magic: "Int64ToStr", noSideEffect.}
  ## The stringify operator for an integer argument. Returns `x`
  ## converted to a decimal string.

proc `$`*(x: float): string {.magic: "FloatToStr", noSideEffect.}
  ## The stringify operator for a float argument. Returns `x`
  ## converted to a decimal string.

proc `$`*(x: bool): string {.magic: "BoolToStr", noSideEffect.}
  ## The stringify operator for a boolean argument. Returns `x`
  ## converted to the string "false" or "true".

proc `$`*(x: char): string {.magic: "CharToStr", noSideEffect.}
  ## The stringify operator for a character argument. Returns `x`
  ## converted to a string.
  ##
  ## .. code-block:: Nim
  ##   assert $'c' == "c"

proc `$`*(x: cstring): string {.magic: "CStrToStr", noSideEffect.}
  ## The stringify operator for a CString argument. Returns `x`
  ## converted to a string.

proc `$`*(x: string): string {.magic: "StrToStr", noSideEffect.}
  ## The stringify operator for a string argument. Returns `x`
  ## as it is. This operator is useful for generic code, so
  ## that ``$expr`` also works if ``expr`` is already a string.

proc `$`*[Enum: enum](x: Enum): string {.magic: "EnumToStr", noSideEffect.}
  ## The stringify operator for an enumeration argument. This works for
  ## any enumeration type thanks to compiler magic.
  ##
  ## If a ``$`` operator for a concrete enumeration is provided, this is
  ## used instead. (In other words: *Overwriting* is possible.)

proc `$`*(t: typedesc): string {.magic: "TypeTrait".}
  ## Returns the name of the given type.
  ##
  ## For more procedures dealing with ``typedesc``, see
  ## `typetraits module <typetraits.html>`_.
  ##
  ## .. code-block:: Nim
  ##   doAssert $(typeof(42)) == "int"
  ##   doAssert $(typeof("Foo")) == "string"
  ##   static: doAssert $(typeof(@['A', 'B'])) == "seq[char]"

when defined(nimHasIsNamedTuple):
  proc isNamedTuple(T: typedesc): bool {.magic: "TypeTrait".}
else:
  # for bootstrap; remove after release 1.2
  proc isNamedTuple(T: typedesc): bool =
    # Taken from typetraits.
    when T isnot tuple: result = false
    else:
      var t: T
      for name, _ in t.fieldPairs:
        when name == "Field0":
          return compiles(t.Field0)
        else:
          return true
      return false


proc `$`*[T: tuple|object](x: T): string =
  ## Generic ``$`` operator for tuples that is lifted from the components
  ## of `x`. Example:
  ##
  ## .. code-block:: Nim
  ##   $(23, 45) == "(23, 45)"
  ##   $(a: 23, b: 45) == "(a: 23, b: 45)"
  ##   $() == "()"
  result = "("
  const isNamed = T is object or isNamedTuple(T)
  var count = 0
  for name, value in fieldPairs(x):
    if count > 0: result.add(", ")
    when isNamed:
      result.add(name)
      result.add(": ")
    count.inc
    when compiles($value):
      when value isnot string and value isnot seq and compiles(value.isNil):
        if value.isNil: result.add "nil"
        else: result.addQuoted(value)
      else:
        result.addQuoted(value)
    else:
      result.add("...")
  when not isNamed:
    if count == 1:
      result.add(",") # $(1,) should print as the semantically legal (1,)
  result.add(")")


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

proc `$`*[T](x: set[T]): string =
  ## Generic ``$`` operator for sets that is lifted from the components
  ## of `x`. Example:
  ##
  ## .. code-block:: Nim
  ##   ${23, 45} == "{23, 45}"
  collectionToString(x, "{", ", ", "}")

proc `$`*[T](x: seq[T]): string =
  ## Generic ``$`` operator for seqs that is lifted from the components
  ## of `x`. Example:
  ##
  ## .. code-block:: Nim
  ##   $(@[23, 45]) == "@[23, 45]"
  collectionToString(x, "@[", ", ", "]")

proc `$`*[T, U](x: HSlice[T, U]): string =
  ## Generic ``$`` operator for slices that is lifted from the components
  ## of `x`. Example:
  ##
  ## .. code-block:: Nim
  ##  $(1 .. 5) == "1 .. 5"
  result = $x.a
  result.add(" .. ")
  result.add($x.b)


when not defined(nimNoArrayToString):
  proc `$`*[T, IDX](x: array[IDX, T]): string =
    ## Generic ``$`` operator for arrays that is lifted from the components.
    collectionToString(x, "[", ", ", "]")

proc `$`*[T](x: openArray[T]): string =
  ## Generic ``$`` operator for openarrays that is lifted from the components
  ## of `x`. Example:
  ##
  ## .. code-block:: Nim
  ##   $(@[23, 45].toOpenArray(0, 1)) == "[23, 45]"
  collectionToString(x, "[", ", ", "]")
