var assert = require("assert");
var utils = require("../src/modules/common/utils");
describe('Test orb', function(){
    describe('#getValue()', function(){
        it('returns the value resolved by a give path expression', function(){
            assert.equal("astring", utils.orb.value("a.b.c").from({a:{b:{c:"astring"}}}).get());
        });
    })
})