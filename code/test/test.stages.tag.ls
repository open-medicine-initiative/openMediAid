expect = require 'expect.js'
pipe = require '../src/modules/pipes/pipes'
tag = require "../src/modules/pipes/stage.tag" .Observable
tagDef = require '../src/data/catalogue.tags.js'
expectThat = require './base/expectThat'

describe 'Tag processing', ->

    specify 'with stage to create observable tags from simple json', ->
        # define the pipeline
        pipeline = pipe! .stage tag
        # and process the tag data
        tags = pipeline .consumeAll tagDef

        expectThat 'initial processing yields three transformed tags', ->
              "all tags are visible": -> tags[0].isVisible!
                                     and tags[1].isVisible!
                                     and tags[2].isVisible!
              "no tag has children": -> tags[0] .tags!.length is 0
                                    and tags[1] .tags!.length is 0
                                    and tags[2] .tags!.length is 0

        expectThat  'changing tag hierarchy influences dependent properties', ->
          tags[0] .addTag tags[1]
          "all tags are visible": -> tags[0].isVisible!
                                 and tags[1].isVisible!
                                 and tags[2].isVisible!
          "first tag has children": -> tags[0] .tags!.length is 1
                                and tags[0].visibleChildren! is 1
          "other tags are not affected": -> tags[1] .tags!.length is 0
                                and tags[2] .tags!.length is 0

        tags[0].hidden!
        expectThat  'hidden tag with visible children is visible', ->
          "all tags are visible": -> tags[0].isVisible!
                                 and tags[1].isVisible!
                                 and tags[2].isVisible!
          "first tag has children": -> tags[0] .tags!.length is 1
                                and tags[0].visibleChildren! is 1
                                and tags[1] .tags!.length is 0
                                and tags[2] .tags!.length is 0

        tags[1].hidden!
        expectThat  'hidden tag without visible children is invisible', ->

          "tag 0,1 are hidden": -> not tags[0].isVisible!
                                 and not tags[1].isVisible!
                                 and tags[2].isVisible!
          "first tag has children": -> tags[0] .tags!.length is 1
                                and tags[0].visibleChildren! is 0
                                and tags[1] .tags!.length is 0
                                and tags[2] .tags!.length is 0

        tags[1] .addTag tags[2]
        expectThat  'hidden tag becomes visible again after adding visible child', ->

          "all tags are visible": -> tags[0].isVisible!
                                 and tags[1].isVisible!
                                 and tags[2].isVisible!
          "first tag has children": -> tags[0] .tags!.length is 1
                                and tags[0].visibleChildren! is 1
                                and tags[1] .tags!.length is 1
                                and tags[1].visibleChildren! is 1
                                and tags[2] .tags!.length is 0
