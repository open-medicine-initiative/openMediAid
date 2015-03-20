var expect = require("expect.js");
var TObservableState = require("../src/modules/dsm/TObservableState.js");
var Data = require('./../../test/data/test.models.js');
var types = require("../src/modules/dsm/types.js");

describe('ObservableState Trait', function(){
    var TObservable = TObservableState({schema:Data.mapdsm, types:types});
    var instance;
    beforeEach(function (done){
        instance = TObservable.newInstance({json:Data.symptoms});
        done();
    });

    describe('#instantiation', function(){
        it('without prototype and with valid params return a working instance', function(){
            expect(instance).to.have.property("state"); // defined method
            expect(instance).to.have.property("updateJson"); // defined method
            expect(instance).to.have.property("sid"); // dynamic property generated from json
            expect(instance).to.have.property("unit"); // dynamic property generated from json
        });
        it('with a custom prototype', function(){
            // TODO: this is a general dsm test
            instance = TObservable.newInstance({extends: {customproperty:"this is a property of the prototype"}, json:Data.symptoms});
            expect(instance).to.have.property("customproperty");
            expect(instance.customproperty).to.be("this is a property of the prototype");
        });
        it('the instantiated object has a working model', function(){
            expect(instance).to.have.property("state");
            expect(instance.state()).not.to.be(undefined);
            expect(instance.state().observables.sid()).to.be(32133);
            expect(instance.sid).to.be(32133);
        });
    })
})
