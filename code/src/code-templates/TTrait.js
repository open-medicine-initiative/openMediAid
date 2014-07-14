var DSM = require('./dsm');
var Trait = DSM.TraitJS;

function TName(){


    var Name = Trait({



    })
    Name.initialize = function(){
        // empty initializer
    };
    return DSM.traitify(Name);

}