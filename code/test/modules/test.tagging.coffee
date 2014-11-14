define ['module/pipes', 'data/catalogue.tags', 'tagprocessor'], (pipe, tagDef, TagProcessor) ->
  describe 'Tag processing', ->
      describe 'with stage to create observable tags from simple json', ->
          jsonToTag = new TagProcessor().stages.JsonToTag
          # define the pipeline
          pipeline = new pipe() .stage jsonToTag
          # and process the tag data
          tags = pipeline .consumeAll tagDef
          it 'initial processing yields three transformed tags', ->
            # all tags are visible
            expect(tags[0].isVisible()) .to.be.true
            expect(tags[1].isVisible()) .to.be.true
            expect(tags[2].isVisible()) .to.be.true
            # no tag has children
            expect(tags[0].tags().length) .to.equal 0
            expect(tags[1].tags().length) .to.equal 0
            expect(tags[2].tags().length) .to.equal 0

          it 'changing tag hierarchy influences dependent properties', ->
            tags[0] .addTag tags[1]
            # all tags are visible
            expect(tags[0].isVisible()) .to.be.true
            expect(tags[1].isVisible()) .to.be.true
            expect(tags[2].isVisible()) .to.be.true
            # first tag has children
            expect(tags[0].tags().length) .to.equal 1
            expect(tags[0].visibleChildren()) .to.equal 1
            # other tags are not affected
            expect(tags[1].tags().length) .to.equal 0
            expect(tags[2].tags().length) .to.equal 0

          it 'hidden tag with visible children is visible', ->
            tags[0].hidden()
            # all tags are visible
            expect(tags[0].isVisible()) .to.be.true
            expect(tags[1].isVisible()) .to.be.true
            expect(tags[2].isVisible()) .to.be.true
            # first tag has children
            expect(tags[0].tags().length) .to.equal 1
            expect(tags[0].visibleChildren()) .to.equal 1
            # other tags are not affected
            expect(tags[1].tags().length) .to.equal 0
            expect(tags[2].tags().length) .to.equal 0

          it 'hidden tag without visible children is invisible', ->
            tags[1].hidden()
            # all tags are visible
            expect(tags[0].isVisible()) .not.to.be.true
            expect(tags[1].isVisible()) .not.to.be.true
            expect(tags[2].isVisible()) .to.be.ok
            # first tag has children
            expect(tags[0].tags().length) .to.equal 1
            expect(tags[0].visibleChildren()) .to.equal 0
            # other tags are not affected
            expect(tags[1].tags().length) .to.equal 0
            expect(tags[2].tags().length) .to.equal 0

          it 'hidden tag becomes visible again after adding visible child', ->
            tags[1] .addTag tags[2]
            # all tags are visible again
            expect(tags[0].isVisible()) .to.be.true
            expect(tags[1].isVisible()) .to.be.true
            expect(tags[2].isVisible()) .to.be.true
            # first tag has children
            expect(tags[0].tags().length) .to.equal 1
            expect(tags[0].visibleChildren()) .to.equal 1
            # second tag has children
            expect(tags[1].tags().length) .to.equal 1
            expect(tags[1].visibleChildren()) .to.equal 1
            expect(tags[2].tags().length) .to.equal 0

      describe 'with stage to create observable tags from simple json', ->
          # define the pipeline
          processor = new TagProcessor()
          console.log(processor)
          pipeline = new TagProcessor().pipeline()
          # and process the tag data
          tags = pipeline .consumeAll tagDef
          processor.buildHierarchy()
          it 'initial processing yields three transformed tags', ->
            # all tags are visible
            expect(tags[0].isVisible()) .to.be.true
            expect(tags[1].isVisible()) .to.be.true
            expect(tags[2].isVisible()) .to.be.true
            # no tag has children
            expect(tags[0].tags().length) .to.equal 0
            expect(tags[1].tags().length) .to.equal 0
            expect(tags[2].tags().length) .to.equal 0
