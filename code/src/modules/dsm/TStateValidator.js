var DSM = require('./dsm');
var Trait = DSM.TraitJS;

/**
 * The state validator binds validation functions
 *
 * @constructor
 */
function TStateValidator(){
    var validations = {};

    var StateValidator = Trait({
        state: Trait.required,
        errors:Trait.required,
        hasValidation: function(){
            return Object.keys(validations).length > 0;
        }
    });
    StateValidator.initialize = function(){
        addValidation(this.state(), this, validations);
    };
    return DSM.traitify(StateValidator);
}


function addValidation (state, collector, validations){
    var property;
    var validators; // validators of a property
    for(property in state.properties){
        validators = state.properties[property].validations;
        if(validators){
            validations[property] = validators;
            addValidationToProperty(state.properties[property], validators, collector);
        }
    }
}

function addValidationToProperty (property, validators, collector){
    property.onUpdate(function (value){
        for(var i = 0 ; i < validators.length; i++){
            if(validators[i].isValid(value)){
                collector.clearError();
            }else{
                collector.addError(property.name, validators[i].msg);
            }
        }
    });
}



module.exports = TStateValidator;