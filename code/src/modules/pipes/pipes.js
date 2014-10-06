var _ = require('lodash');

/**
 * @class Pipelines can be used to process elements (data/objects/functions) through a chain of multiple
 * processing steps, called stages.
 *
 * Each stage is a function that processes a single element at a time. A stage may either modify the given
 * input or construct and return new data to be passed through the rest of the pipeline.
 *
 * @returns {} A new pipeline
 *
 * @example <caption>Create a pipeline that calculates f(x) = 2x + 15</caption>
 * var polynom = new Pipeline()
 *          .stage(function(x){return 2x})
 *          .stage(function(x){return x + 15});
 * polynom.consume(3)
 */
function Pipeline(){
    // The stages are stored in insertion order
    var stages = [];

    // Process a collection of elements and collect results
    var processElements = function(accumulator){
        return function(element){
            accumulator.push(processElement(element));
        };
    };
    // Run an element through all stages
    var processElement = function(element){
        if(stages.length < 1) return;
        var result = element;
        for(var i = 0; i < stages.length; i ++){
            result = stages[i](result) || result;
        }
        return result;
    };

    var pipe = {
        /**
         * Add another stage to the end of the pipeline
         *
         * @instance
         * @memberof Pipeline
         * @param {Function} stage - The processing function to be added to the pipeline
         * @returns {} - The pipeline
         */
        stage: function(stage){
            stages.push(stage);
            return pipe;
        },
        /**
         *
         * Process a given input by passing it through every stage of the pipeline.
         * If a stage returns anything different from undefined, then the returned
         * object will be used as the input of the next stage.
         *
         * @instance
         * @memberof Pipeline
         * @param {*} element - Any object compatible with all stages
         * @returns {*} - The processed result
         */
        consume: function (element){
           return processElement(element);
        },
        /**
         * Process a collection of elements. The processing semantics of each single
         * element follow the {@link Pipeline#consume}
         *
         * @instance
         * @memberof Pipeline
         * @param {*} element - Any object compatible with all stages
         * @returns {*} - The processed result
         */
        consumeAll: function (element){
            var collector = [];
            _.forEach(element, processElements(collector));
            return collector;
        },
        length: function(){
            return stages.length;
        }
    };
    return pipe;
}

module.exports = Pipeline;