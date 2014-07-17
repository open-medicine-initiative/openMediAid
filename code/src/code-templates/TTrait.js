var DSM = require('./dsm');
var Trait = DSM.TraitJS;

function TName(){
    // PRIVATE


    // PUBLIC
    var Name = Trait({



    })
    Name.initialize = function(params){
        // empty initializer
    };
    return DSM.traitify(Name);

}

module.exports = TName;