define ['mbassy'], (MBassy)->
  describe 'MBassy ', ->

    describe '# construction', ->
      messagebus = new MBassy();
      it 'without parameters', ->
        expect(messagebus) .not.to.equal null
        expect(messagebus.channel '') .to.equal undefined
        expect(messagebus.channel 'ROOT') .not.to.equal undefined
        expect(messagebus.channel('ROOT').isEmpty() ) .to.be.true
        expect(messagebus.channel('ROOT').parents() ) .to.be.empty

    describe '# subscription to channels', ->
      messagebus = new MBassy();
      it 'with simple id', ->
        channelOne = messagebus .channel 'channelOne'
        expect(channelOne.isEmpty() ) .to.be.true
        subscription = channelOne.subscribe (message) ->
          return message
        expect(channelOne.isEmpty() ) .to.be.false
        expect(subscription) .not.to.equal undefined
        channelOne.unsubscribe subscription
        expect(channelOne.isEmpty() ) .to.be.true

      it 'with hierarchical id', ->
        channelOne = messagebus .channel 'radio.one'
        expect(channelOne.isEmpty() ) .to.be.true
        expect(channelOne.parents().length) .to.equal 2
        channelRadio = channelOne.parents()[0]
        expect(channelRadio.isEmpty() ) .to.be.true



