var DSM = require('./dsm');
var Trait = DSM.TraitJS;



function TMasterDetail(TObservableState){
    // PRIVATE
    var _provider;
    var _items = [];
    var _selected = 0;
    var _observable = TObservableState;

    var MasterDetail = Trait({
        list: function(){
            return _items;
        },
        select: function(itemIdx){
           _selected = itemIdx;
        }
    });
    MasterDetail.initialize = function(params){
        _provider = params.provider;
        var items = _provider.get(params.query);
        var observable = _observable;
        items.forEach(function(item){
            _items.push(observable.newInstance({json:item}));
        });
    };
    return DSM.traitify(MasterDetail);
}

module.exports = TMasterDetail;