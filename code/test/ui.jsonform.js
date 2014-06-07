var assert = require("assert");
var jsonform = require("../src/modules/jsonform/jsonform");
describe('Test jsonform', function(){
    describe('#merge()', function(){
        it('returns a merged model', function(){
            assert.equal(jsonform()
                , {});
        });
    })
})