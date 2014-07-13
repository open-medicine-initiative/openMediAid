var DSM = require('./dsm');
var Trait = DSM.TraitJS;
//var ko = require('../../lib/ko.observable.dictionary.js');  // load plugin

/**
 *
 * @param colllector
 * @constructor
 */
function TErrorCollector(){
    var errors = {};
    var ErrorCollector = Trait({
        hasErrors: function(){
           return Object.keys(errors).length > 0;
        },
        addError: function (id, message){
            errors[id] = message;
        },
        getError: function(id){
            return errors[id];
        },
        get errors (){
          return errors;
        },
        logErrors: function (){
            for(var error in errors){
                console.log(error + errors[error]);
            }
        }
    });
    ErrorCollector.initialize = function(){
    };
    return DSM.traitify(ErrorCollector);
}


module.exports = TErrorCollector;