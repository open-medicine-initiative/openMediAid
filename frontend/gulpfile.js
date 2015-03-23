/**
 * This is the root build file that assembles all tasks and provides help about build usage.
 *
 * ToDo: put examples here
 *
 */

// Gulp and plugins
var gulp = require( 'gulp' ),
  webserver = require( 'gulp-webserver' ),
  watch = require( 'gulp-watch' ),
  chalk = require( 'chalk' );

// Include build tasks
var paths = require( './build/tasks/build.project' ).paths,
  common = require( './build/tasks/build.common' ),
  testing = require( './build/tasks/build.testing' ),
  documentation = require( './build/tasks/build.documentation' ),
  libs = require( './build/tasks/build.dependencies' ),
  site = require( './build/tasks/build.site' ),
  less = require( './build/tasks/build.less' ),
  dist = require( './build/tasks/build.dist' ),
  qa = require( './build/tasks/build.qa' );


gulp.task( 'default', ['build:dev'], function ( done ) {
  done();
} );

gulp.task( 'build:prod', ['dist', 'qa:lint'], function ( callback ) {
  callback();
  console.log( '\nPlaced optimized files in ' + chalk.magenta( paths.dist + '\n' ) );
} );

gulp.task( 'build:dev', ['dist'], function ( callback ) {
  callback();
  console.log( '\nPlaced optimized files in ' + chalk.magenta( paths.dist + '\n' ) );
} );

gulp.task( 'server', function () {
  return gulp.src( '../target/frontend/dist' )
    .pipe( webserver( {
      livereload : true
    } ) )
} );

gulp.task( 'help', function () {
  // TODO: explain options and build
  console.log( "This is the medium build script!" )
} );

// Watchers
// -------------------------------------------------
gulp.task( 'devmode', ['server'], function () {
  gulp.watch( [
    'src/components/**/*.js',
    'src/snippets/**/*.html'
  ], ['build:dev'] );
} );

//https://github.com/rschmukler/gulp-insert








