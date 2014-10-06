var _ = require('lodash');
var ko = require('knockout');

/**
 * Types define mappings between schema elements and ko.observables
 */
var DefaultMappings = [
    {type : "string", path: new RegExp(".*"), callback : function(value){return ko.observable(value)}},
    {type : "number", path: new RegExp(".*"), callback : function(value){return ko.observable(value)}},
    {type : "array", path: new RegExp(".*"), callback : function(value){return ko.observableArray([])}},
    {type : "object", path: new RegExp(".*"), callback : function(value){return {}}}
];

function Mapper(){
    var transformations = [];
    var self = {
        add: function (transformation){
            var typeSelector = _.isRegExp(transformation.type)
                ? function(type){return transformation.type.test(type);}
                : function(type){return Object.is(transformation.type, type);};

            var pathSelector = _.isRegExp(transformation.path)
                ? function(path){return transformation.path.test(path);}
                : function(path){return Object.is(transformation.path, path);};

            var selector = function(type, path){
                return typeSelector(type) && pathSelector(path);
            }
            transformations.push({matches: selector, callback: transformation.callback });
            return self;
        },
        addAll: function (mappings){
            _.forEach(mappings, function (item){self.add(item)});
        },
        callbackFor: function (type, path){
           return _.find(transformations, function(item){
                return item.matches(type, path);
            }).callback
        },
        transform: function (source){
            var map = self.callbackFor(typeof source, "");
            var target = map(source);
            _populate(source, target, null, "", this);
            return target;
        }
    }
    return self;
}

function _populate(source, target, parent, base,  context){
    // being explicit
    Object.defineProperty(target, "_meta", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {parent:parent}
    });
    // mapping is largely influenced by the type of source value
    if(_.isArray(source)){
        _.forEach(source, function(value){
            // mapping is largely influenced by the type of source value
            var srcType = _.isArray(value) ? "array" : typeof value;
            var path = base + "[" + 2 + "]"; // TODO: index
            // lookup the transformation function based on type and path

            var callback = context.callbackFor(srcType, base);
            var result = callback(value)
            target.push(result);
            if(srcType == 'object' || _.isArray(value)){
                _populate(value, result, target, base + ".", context);
            }
        })
    }else{
        _.forIn(source, function(value, key){
            // mapping is largely influenced by the type of source value
            var srcType = _.isArray(value) ? "array" : typeof value;
            // and its path
            var path = base + key;
            // lookup the transformation function based on type and path
            var callback = context.callbackFor(srcType, path);
            target[key] = callback(value);
            // store meta information about this value
            target._meta[key] = {path: path};
            if(srcType == 'object' || _.isArray(value)){
                _populate(value, target[key], target, path + ".", context);
            }
        });
    }
}

module.exports = {Mapper: Mapper, BuiltInMappings : DefaultMappings};