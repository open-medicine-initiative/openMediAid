var DSM = require('./dsm');
var Trait = DSM.TraitJS;
//var ko = require('../../lib/ko.observable.dictionary.js');  // load plugin

/**
 * The state validator binds validation functions
 *
 * @constructor
 */
function TStateValidator(){
    var validations = {};
    var addValidation = function (state, collector){
        var property;
        for(property in state.properties){
            if(state.properties[property].validator){
                validations[property] = state.properties[property].validator;
                validations[property].bind(
                    collector,
                    state.observables[property],
                    property);
            }
        }
    };

    var StateValidator = Trait({
        state: Trait.required,
        errors:Trait.required,
        hasValidation: function(){
            return Object.keys(validations).length > 0;
        }
    });
    StateValidator.initialize = function(){
        addValidation(this.state(), this);
    };
    return DSM.traitify(StateValidator);
}


module.exports = TStateValidator;