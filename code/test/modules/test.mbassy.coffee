define ['mbassy'], (MBassy)->
  describe 'MBassy ', ->

    describe '#construction', ->
      messagebus = new MBassy();
      it 'of initial pipeline yields pipeline with configured stages', ->
        expect(messagebus) .not.to.equal null
        expect(messagebus.channel '') .to.equal undefined

