define( [
    "knockout",
    "knockout-projections",
    "module/pipes",
    "module/stages"], function ( ko, projections, Pipeline, stages ) {
    /**
     * @constructor
     */
    function TagProcessor () {
        this.tags = new stages.Memorizer();
        this.tagIndex = new stages.Indexer();
        this.subTags = new stages.Indexer( {target : function ( tag ) {
            return tag.tags;
        }} );
        this.stages = {
            JsonToTag : JsonToTag,
            TagIndexer : this.tagIndex.asStage(),
            SubTagIndexer : this.subTags.asStage()
        };
    }

    TagProcessor.prototype.pipeline = function () {
        var _pipe = new Pipeline()
            .stage( this.stages.SubTagIndexer )
            .stage( this.stages.JsonToTag )
            .stage( this.stages.TagIndexer );
        return _pipe;
    };

    /**
     * @instance
     * @memberof TagProcessor
     * @param tag - The source for the tag
     */
    var JsonToTag = function ( src ) {
        // TODO: maybe this is an independent function and not a member
        var _tags = ko.observableArray( [] );
        var _selfVisible = ko.observable( true );
        var _visibleChildren = _tags.filter( function ( tag ) {
            return tag.isVisible();
        } );
        var isVisible = ko.computed( function () {
            return _selfVisible() || _visibleChildren().length > 0;
        } );

        var result = {
            id : src.id,
            name : src.name,
            selfVisible : _selfVisible,
            isVisible : isVisible,
            tags : _tags,
            addTag : function ( src ) {
                this.tags.push( src );
            },
            addChild : function () {
                this.tags.push( JsonToTag( {id : 11, name : "skin", tags : []} ) );
            },
            hidden : function () {
                this.selfVisible( false );
            },
            visible : function () {
                this.selfVisible( true );
            },
            visibleChildren : function () {
                return _visibleChildren().length;
            }
        };
        return result;
    };


    /**
     * @instance
     * @memberof TagProcessor
     * @param tag
     */
    TagProcessor.prototype.buildHierarchy = function () {
        var self = this;

        self.tags.memory.forEach( function ( tag ) {
            self.subTags.index[tag.id].forEach( function ( subTagId ) {
                var subTag = self.tagIndex.index[subTagId];
                if ( !subTag )console.log( "Required tag not defined" );
                else tag.addTag( subTag );
            } );
        } );
    };

    return TagProcessor;
} );