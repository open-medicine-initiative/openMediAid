utils = require "../src/modules/common/utils"
expectThat = require './base/expectThat'

describe 'Test orb', ->
    specify '#getValue()', ->
        expect "djsnd" .to .equal "jds"
        expectThat 'returns the value referenced by a given path expression', ->
            "values are equal" : -> utils .orb .value "a.b.c" .from a: b: c: "astring" .get! is "astring"
