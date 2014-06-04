var assert = require("assert");
var utils = require("../src/modules/common/utils");
describe('Test utils', function(){
    describe('#echo()', function(){
        it('returns the value passed into it', function(){
            assert.equal(utils.echo("hello")
                , "hello");
        });
    })
})