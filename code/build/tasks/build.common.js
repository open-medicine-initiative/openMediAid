var gulp = require( 'gulp' ),
    jshint = require( 'gulp-jshint' ),
    jshintstylish = require( 'jshint-stylish' ),
    clean = require( 'gulp-clean' ),
    paths = require( './build.settings' ).paths,
    mkdirp = require( 'mkdirp' ),
    browserify = require( 'browserify' ),
    Finder = require( "fs-finder" ),
    source = require("vinyl-source-stream");

gulp.task( 'prepare', ["clean"], function ( callback ) {
    mkdirp( paths.reports, function ( err ) {
        callback();
    } );
} );

gulp.task( 'clean', function () {
    return gulp.src( [
            paths.dist,
            paths.jsdoc,
            paths.reports],
        { read : false } )
        .pipe( clean() );
} );

gulp.task( 'dep:cocktail', function ( callback ) {
    return browserify({standalone:"cocktail"})
        .add("./node_modules/cocktail/lib/cocktail.js")
        .bundle()
        // transform the stream to be gulp compatible
        .pipe( source( 'cocktail.js' ) )
        .pipe( gulp.dest( "./src/lib/cocktails" ) );
} );


gulp.task( 'lint', function () {
    gulp.src( [paths.modules + '**/*.js', paths.components + '**/*.js'] )
        .pipe( jshint() )
        .pipe( jshint.reporter( jshintstylish ) )
        .pipe( jshint.reporter( 'fail' ) )
    ;
} );

module.exports = {};