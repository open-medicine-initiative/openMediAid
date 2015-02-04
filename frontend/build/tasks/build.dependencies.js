var gulp = require( 'gulp' ),
  clean = require( 'gulp-clean' ),
  paths = require( './build.project' ).paths,
  mkdirp = require( 'mkdirp' ),
  browserify = require( 'browserify' ),
  Finder = require( "fs-finder" ),
  source = require( "vinyl-source-stream" ),
  bower = require( 'bower' ),
  gutil = require( 'gulp-util' );

gulp.task( 'dep:prepare', function ( done ) {
  mkdirp( paths.reports, function ( err ) {
    done();
  } );
} );

/**
 * rebundle node module cocktail for usage in requirejs environment
 */
gulp.task( 'dep:cocktail', function () {
  return browserify( {standalone : "cocktail"} )
    .add( "./node_modules/cocktail/lib/cocktail.js" )
    .bundle()
    // transform the stream to be gulp compatible
    .pipe( source( 'cocktail.js' ) )
    .pipe( gulp.dest( "./src/lib/cocktails" ) );
} );

gulp.task( 'dep', ['dep:cocktail', 'dep:bower'], function ( done ) {
  done();
} );

// BOWER
gulp.task( 'dep:bower', function () {
  return bower.commands.install()
    .on( 'log', function ( log ) {
      gutil.log( log.id, log.message );
    } );
} );

module.exports = {};