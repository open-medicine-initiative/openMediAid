function uncovered(){
    // this line is not unit test covered
    return 16;
}

// export such that require(file).catalogue works
module.exports = {echo: function(param){return param;}};