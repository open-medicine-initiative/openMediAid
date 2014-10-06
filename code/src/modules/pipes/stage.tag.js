var ko = require('knockout');
var projections = require('../../lib/ko.projections.js');

/**
 * @constructor
 */
function Assembler(){
    var tags = [];
    var tagIndex = {};
    var subTags = {};

    /**
     * @instance
     * @memberof Assembler
     * @param tag
     */
    var TagIndex = function(tag){
        tags.push(tag);
        tagIndex[tag.id] = tag;
    };

    /**
     * @instance
     * @memberof Assembler
     * @param tag
     */
    var SubTagIndex = function(tag){
        subTags[tag.id] = tag.tags;
    };

    /**
     * @instance
     * @memberof Assembler
     * @param tag
     */
    var TreeBuilder = function(){
        tags.forEach(function(tag){
            subTags[tag.id].forEach(function (subTagId){
                tag.addTag(tagIndex[subTagId]);
            });
        });
    };

    /**
     * @instance
     * @memberof Assembler
     * @param {Object} tag - The source for the tag
     */
    var Observable = function(tag){
        var tags = ko.observableArray([]);
        var selfVisible = ko.observable(true);
        var visibleChildren = tags.filter(function(tag){
            return tag.isVisible();
        });
        var isVisible = ko.computed(function (){return selfVisible() || visibleChildren().length > 0;});

        var result = {
            id: tag.id,
            name: tag.name,
            selfVisible : selfVisible ,
            isVisible: isVisible,
            tags: tags,
            addTag: function (src){
                result.tags.push(src);
            },
            hidden:function(){
                selfVisible(false);
            },
            visible:function(){
                selfVisible(true);
            },
            visibleChildren: function(){return visibleChildren().length;}
        };
        return result;
    };

    return {
        TagIndex: TagIndex,
        SubTagIndex: SubTagIndex,
        Observable: Observable,
        assemble: function(){TreeBuilder();}
    };
}

module.exports = Assembler();