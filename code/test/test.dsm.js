var expect = require("expect.js")
var Traits = require('../src/modules/dsm/traits.js')
var Data = require('./data/test.models');

describe('Compositions', function(){

    var dsm;
    beforeEach(function (done){
        var TObservable = Traits.TObservableState({schema:Data.mapdsm});
        var TErrorReporter = Traits.TErrorCollector();
        var TStateValidator = Traits.TStateValidator();
        dsm = Traits.compose(TObservable, TErrorReporter, TStateValidator).newInstance({json:Data.symptoms});
        done();
    });

    describe('Composed DSM', function(){
        it('should have the required public interface', function(){
            expect(dsm).not.to.be(undefined);
            expect(dsm).to.have.property("state");
            expect(dsm.state()).not.to.be(undefined);
            expect(dsm).to.have.property("addError");
            expect(dsm).to.have.property("state");
            expect(dsm.state().observables.sid()).to.be(32133);
            expect(dsm.sid).to.be(32133);
        });
    })

    describe('#empty error collector', function(){

        describe('#Error binding', function(){
            it('should collect errors when invalid values are set to properties of observable state', function(){
                expect(dsm.hasErrors()).to.be(false);
                expect(dsm.unit).to.be('relative');
                dsm.unit = "invalid unit";
                expect(dsm.hasErrors()).to.be(true);
            });
        })
    })
})

