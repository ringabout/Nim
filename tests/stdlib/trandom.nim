discard """
  joinable: false
"""

import random

randomize(233)

proc main =
  var occur: array[1000, int]

  var x = 8234
  for i in 0..100_000:
    x = rand(high(occur))
    inc occur[x]

  when false:
    var rs: RunningStat
    for j in 1..5:
      for i in 1 .. 1_000:
        rs.push(gauss())
      echo("mean: ", rs.mean,
        " stdDev: ", rs.standardDeviation(),
        " min: ", rs.min,
        " max: ", rs.max)
      rs.clear()

  var a = [0, 1]
  shuffle(a)
  doAssert a[0] == 1
  doAssert a[1] == 0

  doAssert rand(0) == 0
  doAssert sample("a") == 'a'

  when compileOption("rangeChecks"):
    try:
      discard rand(-1)
      doAssert false
    except RangeDefect:
      discard

    try:
      discard rand(-1.0)
      doAssert false
    except RangeDefect:
      discard


  # don't use causes integer overflow
  doAssert compiles(rand[int](low(int) .. high(int)))


main()


block:
  type Fooa = enum k0,k1,k2
  doAssert rand(Fooa.high) == k1

  type Dollar = distinct int
  doAssert rand(int.high.Dollar).int == 7266116338782525390

  doAssert rand(int64.high) == 1967081787890826204
  doAssert compiles(echo rand(uint64.high))
  doAssert (rand(char.high),) == ('\a',)
