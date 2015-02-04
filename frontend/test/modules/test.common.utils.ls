define ['utils'], (utils)->
  describe 'Test orb', ->
      specify '#getValue() returns the value referenced by a given path expression', ->
          root = a: b: c: "astring"
          ref = utils .orb .value "a.b.c"
          expect (ref.from(root).get!) .to .equal "astring"
