var gulp = require( 'gulp' ),
    jshint = require( 'gulp-jshint' ),
    jshintstylish = require( 'jshint-stylish' ),
    clean = require( 'gulp-clean' ),
    paths = require( './build.settings' ).paths,
    mkdirp = require( 'mkdirp' ),
    browserify = require( 'browserify' ),
    Finder = require( "fs-finder" ),
    source = require("vinyl-source-stream");

/**
 * rebundle node module cocktail to use in requirejs environment
 */
gulp.task( 'lib:cocktail', function ( ) {
    return browserify({standalone:"cocktail"})
        .add("./node_modules/cocktail/lib/cocktail.js")
        .bundle()
        // transform the stream to be gulp compatible
        .pipe( source( 'cocktail.js' ) )
        .pipe( gulp.dest( "./src/lib/cocktails" ) );
} );

gulp.task( 'libs', ['lib:cocktail'], function ( done ) {
    done();
} );

module.exports = {};