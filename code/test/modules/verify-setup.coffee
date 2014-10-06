describe 'karma tests with chai', ->
  # see http://chaijs.com/api/bdd/

  it 'should expose the Chai assert method', ->
    assert.ok 'everything', 'everything is ok'

  it 'should expose the Chai expect method', ->
    expect('foo') .to .not .equal 'bar'

  it 'should expose the Chai should property', ->
    1 .should .not .equal 2
    should .exist 123

describe 'karma tests with sinon', ->

  it 'can spy on objects', ->
    foo = bar: ->
    sinon.spy foo, 'bar'

    foo.bar 'baz'

    foo.bar.should.have.been.calledWith 'baz'