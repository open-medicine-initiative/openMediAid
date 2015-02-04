var gulp = require( 'gulp' ),
  clean = require( 'gulp-clean' ),
  paths = require( './build.project' ).paths,
  mkdirp = require( 'mkdirp' );

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


module.exports = {};