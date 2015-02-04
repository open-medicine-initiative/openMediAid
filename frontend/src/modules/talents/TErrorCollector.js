define(['typo'], function(typo){
    /**
     * An error collector for simple key:valued error messages.
     * Error messages are stored using their id (-> one message per id)
     * and can be retrieved by id.
     * @param {object} target -
     * @constructor
     */
    function TErrorCollector(target){
        var errors = {};
        typo.mix(target, {
            '@types': {
                require:["TLogger"],
                expose:"TErrorCollector"
            },
            hasErrors: function(){
                return Object.keys(errors).length > 0;
            },
            addError: function (id, message){
                errors[id] = message;
            },
            clearError: function (id){
                delete errors[id];
            },
            getError: function(id){
                return errors[id];
            },
            get errors (){
                return errors;
            },
            logErrors: function (){
                for(var error in errors){
                    this.log(error + errors[error]);
                }
            }
        });
        return target;
    }

    return TErrorCollector;
});