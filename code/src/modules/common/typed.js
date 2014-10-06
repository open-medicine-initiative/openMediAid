var cocktail = require('cocktail');
var _ = require('lodash');

cocktail.mix({
    '@annotation': 'types',
    '@exports'   : module,


    exposed: undefined,
    required: undefined,

    setParameter: function(parameter) {
        this.exposed = parameter.expose;
        this.required = parameter.require || [];
    },

    process: function(subject, options) {
        var types = subject._types;
        if(!types){
           types = [];
           subject._types = types;
           subject.getTypes = function(){
                return types;
           };
           subject.hasType = function(type){
               return _.contains(types, type);
           };
        }
        // add exposed type
        types.push(this.exposed);

        // ensure requirements are met
        var intersect = _.intersection(this.required, types);
        if(intersect.length != this.required.length){
            throw new Error("Required types not found: " + _.difference(this.required, types));
        }
    }
});