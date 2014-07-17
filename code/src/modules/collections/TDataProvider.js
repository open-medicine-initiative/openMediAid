var DSM = require('../dsm/dsm');
var Trait = DSM.TraitJS;

function TDataProvider(){
    // PRIVATE
    var _provider;
    var _data = [];

    // PUBLIC
    var DataProvider = Trait({

        get: function(query){
            _data = _provider(query);
            return _data;
        }

    });
    DataProvider.initialize = function(params){
        _provider = params.provider;
    };
    return DSM.traitify(DataProvider);

}

module.exports = TDataProvider;