catalogues = require "../src/modules/common/catalogues"
symptomData = require "../src/data/symptoms"
catalogue = new catalogues.Symptoms symptomData
expectThat = require './base/expectThat'

describe 'Test catalogue', ->
    specify '#find(criteria)', ->
        expectThat 'returns ',->
            expected = [ {sid:32133, cName:"Abdominal Pain"}   {sid:32134, cName:"Abdominal Irritation"} ]
            "an array of results for a criteria with at least one match" : ->
                   expected === catalogue .find lang:"en", val: is:"abdomen"
            "an array of results for a matching regex criterion" : ->
                   expected === catalogue .find lang:"en", val: regex:/.*dom.*/
