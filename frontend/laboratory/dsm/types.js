var ko = require('knockout');

/**
 * Types define mappings between schema elements and ko.observables
 */
var types = {
    string: function(value){
        return ko.observable(value);
    },
    number:function(value){
        return ko.observable(value);
    },
    array:function(value){
        return ko.observableArray(value);
    }
};

module.exports = types;