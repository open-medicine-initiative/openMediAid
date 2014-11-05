define(['jsclass'], function(jsclass){
    var Class = jsclass.Class;
    var Interface = jsclass.Interface;
    var Module = jsclass.Module;

    var IIdentifiable = new Interface(['id']);
    var Identifiable = new Module({
         initialize:function(options){
             this._id = options.id;
         },
         id : function(){
             return this._id;
         }

    });

    var Node = new Class({
        include:[Identifiable],

        initialize: function(options) {
            this.name = options.name;
            this.icon = options.icon;
            this.attributes = ko.observableArray([]);
            this.inlineAttributes = this.attributes.filter(function (attribute) {
                return attribute.inline;
            });
            this.nodes = ko.observableArray([]);
            this.selfVisible = ko.observable(true);
            this.visibleNodes = this.nodes.filter(function (node) {
                return node.isVisible();
            });
            this.isVisible = ko.computed(function () {
                return this.selfVisible() || this.visibleNodes().length > 0;
            });
        },

        attribute: function(attr) {
             for(var key in attr){
                 this.attributes.push (new Attribute ({name:key, value: attr[key]}));
             }
        }
    });


    var Attribute = new Class({
        initialize: function(options){
            this.name = options.name;
            this.value = options.value;
            this.inlined = options.inlined || false;
        }
    });


});