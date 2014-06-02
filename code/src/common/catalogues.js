// use taffy db for internal representation of catalogue data
var db = require("../lib/taffy");

/**
 * The catalogue module exposes objects that wrap the raw catalogue data to provide
 * search functionality.
 *
 * @module catalogues
 */
var Catalogues = {
    Symptoms:Symptoms
};

/**
 * @class The symptoms catalogue can be used to lookup symptoms by their names, synonyms or tags
 * @constructor
 * @param {object} data - The raw symptoms catalogue data as parsed from its json representation
 *
 */
function Symptoms(data){
    var _tags = db(data.tags);
    var _symptoms = db(data.entries);
    var self = this;
    /**
     * Find a set of symptoms by a given search criteria.
     *
     * @example <caption>Find matching exact value</caption>
     * // returns 2
     *
     * @param criteria
     * @returns {*}
     */
     this.find = function (criteria){
        var sids = _tags(criteria);
        var joined = sids.join(_symptoms, function(left, right){

            return left.symptoms.indexOf(right.sid) != -1;
        });
        var result = joined.select("sid", "cName");
        return result;
    }

    // this is the publicly exposed object
    return {
       find: self.find
    };
}


// export such that require(file).catalogue works
module.exports = Catalogues;
