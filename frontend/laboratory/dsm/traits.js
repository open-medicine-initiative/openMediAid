module.exports = {
    TObservableState: require('./TObservableState.js'),
    TErrorCollector: require('../talents/TErrorCollector.js'),
    TStateValidator: require('./TStateValidator.js'),
    TMasterDetail: require('./TMasterDetail.js'),
    TObservableSymptom: require('./TObservableSymptom.js'),
    TDataProvider: require('../collections/TDataProvider.js'),
    compose: require('./dsm').traitify
};