define [ 'modules/talents/TErrorCollector', 'modules/talents/TLogger' ], ( TErrorCollector, logging ) ->
  describe 'TErrorCollector', () ->
    collector = undefined
    beforeEach ( done ) ->
      collector = TErrorCollector( logging.TLogger( {} ) )
      done()

    describe '#Empty error collector', ()->
      it 'defines all expected properties', ()->
        expect( collector ).to.have.property "errors"
        expect( collector ).to.have.property "hasErrors"
        expect( collector ).to.have.property "addError"
        expect( collector ).to.have.property "logErrors"
        expect( collector ).to.have.property "getError"
        expect( collector ).to.have.property "log"
        expect( collector.hasType "TErrorCollector"  ).to.be.true

      it 'is empty', ()->
        expect( collector.hasErrors() ).to.be.false
        expect( collector.errors ).to.be.empty

    describe '#Error Reporting', ()->
      it 'add error', ()->
        collector.addError( "error1", "an error message" )
        expect( collector.hasErrors() ).to.be.true
        expect( collector.getError( "error1" ) ).to.equal "an error message"
