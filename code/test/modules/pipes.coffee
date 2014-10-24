define ['module/pipes'], (pipe)->
  describe 'Pipeline ', ->
    pipeline = new pipe()
    pipeline.stage (element) ->
      element.push 1
      return
    .stage (element) ->
      element.push 2
      return
    .stage (element) ->
      element.push 3
      return

    describe '#construction', ->
      it 'of initial pipeline yields pipeline with configured stages', ->
        expect(pipeline) .not.to.equal null
        expect(pipeline.length()) .to.equal 3

    describe '#executing pipeline will call all stages', ->
      it 'all stages are called in order of insertion', ->
        processed = pipeline.consume []
        expect(processed[0]).to.equal 1
        expect(processed[1]).to.equal 2
        expect(processed[2]).to.equal 3




