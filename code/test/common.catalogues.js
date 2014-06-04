var assert = require("assert");
var catalogues = require("../src/modules/common/catalogues");
var symptomData = require("../src/data/symptoms");
var catalogue = new catalogues.Symptoms(symptomData);
describe('Test catalogue', function(){
    describe('#find(criteria)', function(){
        it('returns an array of results for a criteria with at least one match', function(){
            assert.deepEqual([{sid:32133, cName:"Abdominal Pain"},{sid:32134,cName:"Abdominal Irritation"}]
                , catalogue.find({lang:"en", val:{is:"abdomen"}}));
        });
        it('returns an array of results for a matching regex criterion', function(){
            assert.deepEqual([{sid:32133, cName:"Abdominal Pain"},{sid:32134,cName:"Abdominal Irritation"}]
                , catalogue.find({lang:"en", val:{regex:/.*dom.*/}}));
        })
    })
})