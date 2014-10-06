var expect = require("expect.js")
var TErrorCollector = require("../modules/talents/TErrorCollector.js");
var TLogger = require("../modules/talents/TLogger.js");

describe('TErrorCollector', function(){

    var collector;
    beforeEach(function (done){
        collector = TErrorCollector(TLogger({}));
        done();
    })

    describe('#Empty error collector', function(){
        it('defines all expected properties', function(){
            expect(collector).to.have.property("errors");
            expect(collector).to.have.property("hasErrors");
            expect(collector).to.have.property("addError");
            expect(collector).to.have.property("logErrors");
            expect(collector).to.have.property("getError");
            expect(collector.hasType("TErrorCollector")).to.be(true);
        });

        it('is empty', function(){
            expect(collector.hasErrors()).to.be(false);
            expect(collector.errors).to.be.empty();
        });
    })

    describe('#Error Reporting', function(){

        it('add error', function(){
            collector.addError("error1", "an error message");
            expect(collector.hasErrors()).to.be(true);
            expect(collector.getError("error1")).to.be("an error message");
        });
    })

})
