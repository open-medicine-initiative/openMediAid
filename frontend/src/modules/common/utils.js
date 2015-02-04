define([], function(){
    /**
     * Create a wrapper around a property that can be passed around to read or write
     * the underlying value.
     *
     * @param root
     * @param path
     * @returns {{set: Function, get: Function}}
     * @constructor
     */
    function ValueRef(root, path){
        path = path.split(".");
        // traverse up to the second last
        for(var i = 0; i < path.length - 1 ; i++){
            root = root[path[i]];
            if(!root){ // if undefined
                return {
                    set: function (value){
                        throw new Error("Unbound value ref")
                    },
                    get: function (){
                        return undefined;
                    }
                }
            }
        }
        var property = path[path.length -1];
        return {
            set: function (value){
                root[property] = value;
            },
            get: function (){
                return root[property];
            }
        };
    }

    function value(path){
        return {from: function(source){
            return ValueRef(source, path);
        }};
    }

    /**
     * Map the observables (internal state) to getter/setter of target
     * such that it can easily operate on its private observable state
     * without caring about the values actually being observables
     *
     * @param state
     * @param target
     */
    function addProperties(state, target){
        for(var property in state.observables){
            // enclose in function to get closure context right
            mapProperty(state.observables[property], target, state.properties[property]);
        }
    }
    function mapProperty(observable, target, property){
        Object.defineProperty(target, property.name, {
            get : function () {
                return observable();
            },
            set : function (val) {
                if(property.editable)observable(val);
            }
        });
    }


    var utils = {
        ValueRef: ValueRef,
        orb:{
            value: value,
            addProperties: addProperties
        }
    };

    return utils;
});
