var Utils = require('../common/utils.js');
var ko = require('knockout');
var DSM = require('./dsm');
var Trait = require('../../lib/traits-0.4.js');
var types = require('./types');

/**
 * This trait exposes a set of ko.observable values for a given js object according to a specified mapping schema.
 * The observable state contains the observable values and associated meta information for each observable.
 * Additionally, the trait generates properties to get/set the observable value using common js property syntax.
 *
 * Example:
 *
 * var observable = TObservableState({schema:{id:{
            path: "id",
            type: "number",
            editable: false
        }}).newInstance({id:12321});
    // shorthand for observable.state().id.observable()
    observable.id == 12321
 *
 *
 * @param options
 * @constructor
 */
function TObservableState(options){
    // validate parameters and configure with defaults;
    var _params = (function validate(options){
        if(!options) throw new Error("No options provided");
        if(!options.schema) throw new Error("An observable state requires a non null schema. Was: " + options.schema);
        return {
           schema: options.schema,
           copyJson : options.copyJson || false
        };
    })(options);

    // PRIVATE INSTANCE STATE
    var json; // the json underlying the observable state
    var state;  // the observable state as constructed by the initializer (json + schema)

    // PUBLIC
    var TObservable = Trait({
        updateJson: function(){
            for(var property in state.properties){
                state.properties[property].jsonbinding.set(state.observables[property]());
            }
        },
        state: function(){
            return state;
        }
    });

    TObservable.initialize = function(options){
        json = getJson(options); // provided json has precedence over constructor provided json
        state = parseState(json, _params.schema);
        Utils.orb.addProperties(state, this);
    };
    return DSM.traitify(TObservable);
}

/**
 * Translate a json object to a set of observable properties according to a given schema
 * @param json
 * @param schema
 * @returns An object containing the property and meta data for all mapped json properties
 */
var parseState = function(json, schema){
    var pdescriptors = {};
    var observables = {};
    for(var property in schema){
        pdescriptors[property] = {
            name:property,
            validator: schema[property].validator,
            editable:schema[property].editable,
            path: schema[property].path,
            jsonbinding: Utils.orb.value(schema[property].path).from(json) // value references to set values on the provided json
        };
        observables[property] = types[schema[property].type](pdescriptors[property].jsonbinding.get());
    }
    return {observables:observables, properties:pdescriptors};
};

var getJson = function(source){
    // TODO: throw Exception?
    // TODO: maybe make defensive deep copy of json if configured
    if(source){
        return source.json || {};
    }
    else return json;
}


module.exports = TObservableState;