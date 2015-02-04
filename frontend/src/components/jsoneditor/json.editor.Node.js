define(function ( ) {


    function Node ( options ) {
        var self = this;
        this.id = options.id;
        this.label = options.label;
        this.icon = options.icon;
        this.attributes = ko.observableArray( [] );
        this.inlineAttributes = this.attributes.filter( function ( attribute ) {
            return attribute.inline;
        } );
        this.nodes = ko.observableArray( [] );
        this.selfVisible = ko.observable( true );
        this.visibleNodes = this.nodes.filter( function ( node ) {
            return node.isVisible();
        } );
        this.isVisible = ko.computed( function () {
            return self.selfVisible() || self.visibleNodes().length > 0;
        } );
    }

    Node.prototype.attribute = function ( attr ) {
        for ( var key in attr ) {
            this.attributes.push( new Attribute( {name : key, value : attr[key]} ) );
        }
    };


    function Attribute ( options ) {
        this.name = options.name;
        this.value = options.value;
        this.inlined = options.inlined || false;
    }

    return Node;
} );