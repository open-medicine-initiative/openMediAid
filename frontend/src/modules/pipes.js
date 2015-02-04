define(['lodash'], function (_) {

    /**
     * @name Pipeline
     * @constructor
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
    var Pipeline = function () {
        // The stages are stored in insertion order
        this.stages = [];
    };

    /**
     * Add another stage to the end of the pipeline
     *
     * @instance
     * @memberof Pipeline
     * @param {Stage} stage - The processing function to be added to the pipeline
     * @returns {} - The pipeline
     */
    Pipeline.prototype.stage = function (stage) {
        this.stages.push(stage);
        return this;
    };

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
    Pipeline.prototype.consume = function (element) {
        return processElement(this.stages, element);
    };

    /**
     * Process a collection of elements. The processing semantics of each single
     * element follow the {@link Pipeline#consume}
     *
     * @instance
     * @memberof Pipeline
     * @param {*} element - Any object compatible with all stages
     * @returns {*} - The processed result
     */
    Pipeline.prototype.consumeAll = function (element) {
        var collector = [];
        _.forEach(element, processElements(this.stages, collector));
        return collector;
    };

    Pipeline.prototype.length = function () {
        return this.stages.length;
    };

    // Process a collection of elements and collect results
    // according to the semantics of processElement()
    var processElements = function (stages, accumulator) {
        return function (element) {
            accumulator.push(processElement(stages, element));
        };
    };
    // Run an element through all stages
    var processElement = function (stages, element) {
        if (stages.length < 1) return;
        var result = element;
        for (var i = 0; i < stages.length; i++) {
            result = stages[i](result) || result;
        }
        return result;
    };

    return Pipeline;
});