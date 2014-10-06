var Trait = require('../../lib/traits-0.4.js');

/**
 *
 * @returns A composed trait that is a combination of all provided trait objects.
 *          The composed trait works as a factory for new instances of the trait.
 * @private
 */
var _traitify = function(){
    var traits = arguments;
    // this function will call the initialization function provided by each trait
    // with correct binding of this (after the composed trait is instantiated)
    var initialize = function(_this, params){
        // _this is an instance of the composed trait
        for(var i= 0; i <  traits.length; i++){
            if(traits[i].initialize){
                // apply the initialization function provided by each trait
                traits[i].initialize.call(_this, params);
            }
        }
    };
    // compose the basic traits using trait.js
    var composed = Trait.compose.apply(null, traits);

    // add a factory method for convenient creation of new trait instances
    composed.newInstance = function(parameters){
        var params = parameters || {};
        var proto = params.extends || Object.prototype; // a trait instance may have a custom prototype object
        var instance = Trait.create(proto, composed);
        initialize(instance, params);
        return instance;
    };
    return composed;
};

var dsm = {
    traitify: _traitify,
    TraitJS: Trait // reexport trait.js
};

module.exports = dsm;