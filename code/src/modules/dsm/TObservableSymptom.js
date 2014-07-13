var TObservableState = require('./TObservableState.js');

var schema = {
    sid: {
        path: "sid",
        type: "number",
        editable: false
    },
    unit: {
        path: "scale.unit",
        type: "string",
        editable: true,
        validations: [{isValid:function(value){return value == "relative" || value == "absolute"}, msg: "Unknown scale"}]
    }
}

function TObservableSymptom(){
    return TObservableState({schema: schema});
}

module.exports = TObservableSymptom;