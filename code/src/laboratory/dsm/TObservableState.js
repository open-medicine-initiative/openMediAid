var Utils = require('../common/utils.js');
var ko = require('knockout');
var DSM = require('./dsm');
var Trait = require('../../lib/traits-0.4.js');

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
        if(!options.types) throw new Error("An observable state requires a non null type mapping. Was: " + options.types);
        return {
           schema: options.schema,
           types : options.types,
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
        if(!options.json)throw new Error("No source object defined");
        json = options.json;
        state = parseState(json, _params.schema, _params.types);
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
var parseState = function(json, schema, types){
    var oState = {};
    var pdescriptors = {};
    var observables = {};
    for(var property in schema){
        var path = schema[property].path || property;
        var observable;
        var pdescriptor;
        pdescriptor = {
            name:property,
            validations: schema[property].validations,
            editable:schema[property].editable,
            path: schema[property].path,
            jsonbinding: Utils.orb.value(path).from(json) // value references to set values on the provided json
        };
        pdescriptors[property] = pdescriptor;
        observable = types[schema[property].type](pdescriptors[property].jsonbinding.get());
        // create an observable and initialize with value from json
        observables[property] = observable;
        addOnUpdate(pdescriptor, observable);
    }
    oState.observables = observables;
    oState.properties = pdescriptors;
    return oState;
};

function addOnUpdate(pdescriptor, observable){
    pdescriptor.onUpdate = function (subscriber){
        observable.subscribe(subscriber);
    };
}

module.exports = TObservableState;