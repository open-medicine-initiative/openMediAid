var expect = require("expect.js")
var traversal = require("../src/modules/common/object.traversal");

describe('Traversal ', function(){
    var transformation = traversal.Mapper()
        .add({type : "string", path: new RegExp(".*"), callback : function(value){return value}})
        .add({type : "array", path: new RegExp(".*"), callback : function(value){return []}})
        .add({type : "object", path: new RegExp(".*"), callback : function(value){return {}}});

    var source = {id: "id", desc : "desc", child : {id: "child", nodes:[{id:"childnode1"}, {id:"childnode2"}]}};

    describe('of object with identity mapped source types', function(){
        it('returns a deep copy of the source', function(){
            var result = transformation.transform(source);
            expect(result.id).to.be("id");
            expect(result._meta.id.path).to.be("id");

            expect(result.child.id).to.be("child");
            expect(result.child._meta.id.path).to.be("child.id");
            expect(result.child.nodes).to.have.length(2);
            expect(result.child._meta.nodes.path).to.be("child.nodes");
        });
    });

    describe('of object with knockout aware mappings', function(){
        it('returns a copy containing observables', function(){
            var mapper = traversal.Mapper();
            mapper.addAll(traversal.BuiltInMappings);
            var result = mapper.transform(source);
            expect(result.id()).to.be("id");
        });
    });
})