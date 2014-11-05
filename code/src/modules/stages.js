/**
 * Descibe me
 * @module stages
 */
define( function ( jsclass ) {

    /**
     * Describe me
     * @constructor module:stages.Indexer
     * @param {Object} options
     * @param {Function} [options.target=element] - Accessor for the property that should be indexed. The default value is a function that returns the element itself.
     */
    function Indexer ( options ) {
        this.index = {};
        this.target = options ? options.target : undefined;
    }

    /**
     * Create a function that is compatible with {@link Pipeline#stage}
     * @method module:stages.Indexer#asStage
     * @instance
     * @returns {Function}
     */
    Indexer.prototype.asStage = function () {
        var self = this;
        if ( this.target ) {
            return function ( element ) {
                if ( !element.id )return;
                self.index[element.id] = self.target( element );
            };
        }
        else {
            return function ( element ) {
                if ( !element.id )return;
                self.index[element.id] = element;
            };
        }
    };


    function Memorizer () {
        this.memory = [];
    }

    Memorizer.prototype.asStage = function () {
        var self = this;
        return function ( element ) {
            self.memory.push( element );
        };
    };

    return {
        Indexer:Indexer,
        Memorizer: Memorizer
    };

} );