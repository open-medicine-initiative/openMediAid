define(['jsclass'], function(jsclass){
    var Class = jsclass.Class;

    var Node = new Class({
        initialize: function(name) {
            this.name = name;
            this.attributes = ko.observableArray([]);
            this.nodes = [];
        },

        attribute: function(things) {

        }
    });
})