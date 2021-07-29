discard """
nimout: '''
tpragmascurlyri.nim(7, 22) Warning: Using right curly to enclose pragmas is deprecated; use '.}' [Deprecated]
'''
"""

proc hello() {.inline} = discard