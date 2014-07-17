var expect = require("expect.js")
var Traits = require('../src/modules/dsm/traits.js')
var Data = require('./data/test.models');

describe('Trait performance: ', function(){

    var loops = 10000;
    var begin;
    var expectedTimePerOp; // todo: calculate baseline to be somewhat machine independent
    beforeEach(function (done){
        begin = Date.now();
        done();
    });
    afterEach(function (done){
        var timePerOp = (Date.now() - begin) / loops;
        expect(timePerOp).to.be.lessThan(expectedTimePerOp);
        console.log(timePerOp + "ms");
        done();
    });

    describe('trait composition', function(){
        it('of medium complexity takes less then 0.2 ms', function(){
            expectedTimePerOp = 0.2;
            for(var i = 0 ; i < loops ;i++){
                var TObservable = Traits.TObservableState({schema:Data.mapdsm});
                var TErrorReporter = Traits.TErrorCollector();
                var TStateValidator = Traits.TStateValidator();
                Traits.compose(TObservable, TErrorReporter, TStateValidator);
            }

        });
    })
    describe('instantiation', function(){

        it('of composed trait takes less then 0.2 ms', function(){
            expectedTimePerOp = 0.2;
            var TObservable = Traits.TObservableState({schema:Data.mapdsm});
            var TErrorReporter = Traits.TErrorCollector();
            var TStateValidator = Traits.TStateValidator();
            var DSM = Traits.compose(TObservable, TErrorReporter, TStateValidator);
            for(var i = 0 ; i < loops ;i++){
                DSM.newInstance({json:Data.symptoms});
            }
        });
        it('of simple trait takes less then 0.1 ms ', function(){
            expectedTimePerOp = 0.1;
            var TErrorReporter = Traits.TErrorCollector();
            for(var i = 0 ; i < loops ;i++){
                TErrorReporter.newInstance();
            }
        });
    })

})

