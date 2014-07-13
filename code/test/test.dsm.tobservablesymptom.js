var expect = require("expect.js")
var TObservableSymptom = require("../src/modules/dsm/TObservableSymptom.js");
var Data = require('./data/test.models');

describe('TObservableSymptom', function(){
    var TObservable = TObservableSymptom();
    var instance;
    beforeEach(function (done){
        instance = TObservable.newInstance({json:Data.symptoms});
        done();
    });

    describe('#instantiation', function(){
        it('without prototype and with valid params return a working instance', function(){
            expect(instance).to.have.property("sid"); // dynamic property generated from json
            expect(instance).to.have.property("unit"); // dynamic property generated from json
            expect(instance.state().observables.sid()).to.be(32133);
            expect(instance.sid).to.be(32133);
        });
    })
})
