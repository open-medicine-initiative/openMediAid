var gulp = require( 'gulp' ),
    complexity = require( 'gulp-complexity' ),
    jshint = require( 'gulp-jshint' ),
    jshintstylish = require( 'jshint-stylish' ),
    paths = require( './build.settings' ).paths,
    Finder = require( "fs-finder" ),
    plato = require( 'gulp-plato' ),
    codebase = {
        modules : function () {return Finder.from( "./src/modules" ).findFiles( '*.js' )}
    };

// see http://www.jshint.com/docs/options/ for reference
var jsHintsStrict = {
    "bitwise": true,
    "curly": false, // do not enforce curly braces
    "eqeqeq": true, // prevent accidental value coercion
    "forin": true,
    "immed": true,
    "newcap": true,
    "noarg": true,
    "noempty": true,
    "quotmark": "single",
    "undef": true,
    "unused": "strict",
    "trailing": true,
    "maxparams": 15,
    "maxdepth": 4,
    "maxstatements": 25,
    "maxcomplexity" : 5,
    "maxlen": 120,
    "browser": true,
    "jquery": true,
    "devel": true,
    "white": true,
    "indent": 4,
    "predef": [
        "_",
        "describe",
        "beforeEach",
        "module",
        "define",
        "it",
        "expect"
    ]
};

gulp.task( 'qa:complexity', function () {
    return gulp.src( codebase.modules() )
        .pipe( complexity( {
            cyclomatic : [4],
            halstead : [10],
            maintainability : 2,
            breakOnErrors : true
        } ) );
} );

gulp.task( 'qa:plato', function () {
    return gulp.src( codebase.modules() )
        .pipe( plato( paths.reports + 'plato', {
            jshint : {
                options : jsHintsStrict
            },
            complexity : {
                maxcost : 100,  // <change cost> specify the per-project change cost threshold
                maxsize : 100,// <core size>             specify the per-project core size threshold
                minmi : 70,// <maintainability index>   specify the per-module maintainability index threshold
                maxcyc : 4,// <cyclomatic complexity>  specify the per-function cyclomatic complexity threshold
                maxcycden : 4,// <cyclomatic density>  specify the per-function cyclomatic complexity density threshold
                maxhd : 12,// <halstead difficulty>     specify the per-function Halstead difficulty threshold
                maxhv : 100,// <halstead volume>         specify the per-function Halstead volume threshold
                maxhe : 151,// <halstead effort>         specify the per-function Halstead effort threshold
                trycatch : true
            }
        } ) );
} );

gulp.task( 'qa:lint', function () {
    return gulp.src( [paths.modules + '**/*.js', paths.components + '**/*.js'] )
        .pipe( jshint(jsHintsStrict) )
        .pipe( jshint.reporter( jshintstylish ) )
        .pipe( jshint.reporter( 'fail' ) )
    ;
} );

