expect = require "expect.js"
pipe = require "../src/modules/pipes/pipes"
expectThat = require './base/expectThat'


describe 'Pipeline ', ->
    specify '#construction', ->
        pipeline = pipe!
            .stage (element) ->
                element ++ [1]
            .stage (element) ->
                element ++ [2]
            .stage (element) ->
                element ++ [3]
        expectThat 'of initial pipeline yields pipeline with configured stages', ->
              "pipeline is not null" : -> pipeline isnt null
              "pipeline has three stages" : -> pipeline.length! is 3


        expectThat '#executing pipeline will call all stages', ->
            processed = pipeline .consume []
            "all stages are called in order of insertion" : -> processed.0 is 1
                                                      and processed.1 is 2
                                                      and processed.2 is 3




