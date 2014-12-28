var gulp = require( 'gulp' ),
    clean = require( 'gulp-clean' ),
    paths = require( './build.settings' ).paths,
    mkdirp = require( 'mkdirp' ),
    browserify = require( 'browserify' ),
    Finder = require( "fs-finder" ),
    source = require("vinyl-source-stream" ),
    bower = require('bower');

gulp.task( 'dep:prepare', function ( callback ) {
    mkdirp( paths.reports, function ( err ) {
        callback();
    } );
} );

/**
 * rebundle node module cocktail to use in requirejs environment
 */
gulp.task( 'dep:cocktail', function ( ) {
    return browserify({standalone:"cocktail"})
        .add("./node_modules/cocktail/lib/cocktail.js")
        .bundle()
        // transform the stream to be gulp compatible
        .pipe( source( 'cocktail.js' ) )
        .pipe( gulp.dest( "./src/lib/cocktails" ) );
} );

gulp.task( 'dep:mochacakes', function ( ) {
    return browserify({standalone:"mocha-cakes"})
        .add("./node_modules/mocha-cakes/cakes.js")
        .bundle()
        // transform the stream to be gulp compatible
        .pipe( source( 'cakes-bundle.js' ) )
        .pipe( gulp.dest( "./node_modules/mocha-cakes" ) );
} );

gulp.task( 'dep', ['dep:cocktail'], function ( done ) {
    done();
} );

// BOWER
gulp.task('bower:install', function (callback) {
    return bower.commands.install()
        .on('log', function (log) {
            if (log.id !== 'install') { return; }
            gutil.log('install', log.message);
        })
        .on('end', function (installed) {
            callback();
        });
});

module.exports = {};