var gulp = require( 'gulp' ),
  less = require( 'gulp-less' ),
  path = require( 'path' ),
  concat = require( 'gulp-concat' ),
  replace = require( 'gulp-replace' ),
  es = require( 'event-stream' ),
  project = require( './build.project' );

// the bundle task
gulp.task( 'styles', ['styles:less','styles:css' ], function () {

});

// css is built from less, which is derived from AdminLTE theme
gulp.task( 'styles:less', function () {
  return gulp.src( [
      project.paths.less + "main.less",
      project.paths.less + "skin-blue.less"] )
    .pipe( less() )
    .pipe( gulp.dest( project.paths.resources + "css" ) );
} );


// Concatenates CSS files, rewrites relative paths to Bootstrap fonts
gulp.task( 'styles:css', ['styles:less'], function () {
  var bootstrapCss = gulp.src( project.paths.bootstrap + 'css/bootstrap.min.css' )
      .pipe( replace( /url\((')?\.\.\/fonts\//g, 'url($1fonts/' ) ),
    appCss = gulp.src( project.paths.resources + 'css/*.css' ),
    combinedCss = es.concat( bootstrapCss, appCss ).pipe( concat( 'all.css' ) ),
    fontFiles = gulp.src( project.paths.bootstrap + 'fonts/*', { base : project.paths.bootstrap } );
  return es.concat( combinedCss, fontFiles )
    .pipe( gulp.dest( project.paths.css ) );
} );