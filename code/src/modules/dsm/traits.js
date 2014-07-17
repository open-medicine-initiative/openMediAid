module.exports = {
    TObservableState: require('./TObservableState.js'),
    TErrorCollector: require('./TErrorCollector.js'),
    TStateValidator: require('./TStateValidator.js'),
    TMasterDetail: require('./TMasterDetail.js'),
    TObservableSymptom: require('./TObservableSymptom.js'),
    TDataProvider: require('../collections/TDataProvider.js'),
    compose: require('./dsm').traitify
};