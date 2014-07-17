var expect = require("expect.js")
var TMasterDetail = require("../src/modules/dsm/TMasterDetail");
var TDataProvider = require("../src/modules/collections/TDataProvider.js");
var TObservable = require("../src/modules/dsm/TObservableState.js");

var schema = {
    id: {
        type: "number",
        editable: false
    },
    name: {
        type: "string",
        editable: false
    }
}


describe('A testcase:', function(){

    var testData = [
        {id:0, name:"first"},
        {id:1, name:"second"},
        {id:2, name:"third"},
        {id:3, name:"fourth"},
        {id:4, name:"fifth"}
    ]

    beforeEach(function (done){
        done();
    });
    afterEach(function (done){
        done();
    });

    describe('a sub group', function(){
        it('a test', function(){
            var provider = TDataProvider().newInstance({
                provider: function(query){
                    return testData;
                }
            })
            var masterdetail = TMasterDetail(TObservable({schema:schema})).newInstance({
                provider: provider
            })
            expect(masterdetail.list()[0].id).to.be(0);
            expect(masterdetail.list()[0].name).to.be("first");

        });
    })

})

