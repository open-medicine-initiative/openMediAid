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
        validator: {
            bind:function (collector, observable, name) {
                observable.subscribe(function (value) {
                    if (value !== "relative" && value !== "absolute") collector.addError(name, "unknown scale");
                    else collector.clearError(name);
                })
            }}
    }
}

function TObservableSymptom(){
    return TObservableState({schema: schema});
}

module.exports = TObservableSymptom;