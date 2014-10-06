define(["ko/knockout", "ko/knockout.mapping"], function(ko, mapping){
    var pipeline = require('pipes');
    var NodeModel = function(data) {
        this.isExpanded = ko.observable(true);
        this.description = ko.observable();
        this.name = ko.observable();
        this.nodes = ko.observableArray([]);

        this.toggleVisibility = function() {
            //self.isExpanded(!self.isExpanded());
            console.log("fkjdsnfkdsnf");
            this.nodes.push(new NodeModel({
                name: 'Child Child x',
                description: 'test description!',
                objectId: '',
                nodes: ko.observableArray([])
            }))
        };
        mapping.fromJS(data, {
            nodes: {
                create: function(args) {
                    return new NodeModel(args.data);
                }
            }
        }, this);
    };

    return NodeModel;

});

