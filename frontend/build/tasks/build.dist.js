// Gulp and plugins
var gulp = require( 'gulp' ),
  requirejs = require( 'gulp-requirejs-bundler' ),
  uglify = require( 'gulp-uglify' ),
  fs = require( 'fs' ),
  vm = require( 'vm' ),
  merge = require( 'deeply' ),
  htmlreplace = require( 'gulp-html-replace' );

// Include build tasks
var paths = require( './build.project' ).paths;




// Build require js runtime configuraiton
// Modules must be recognizeable by the optimizer!
// See https://groups.google.com/forum/#!topic/requirejs/tnUARkbUOD0
var requireJsRuntimeConfig = vm.runInNewContext( fs.readFileSync( 'src/app/require.config.js' ) + '; require;' );
requireJsOptimizerConfig = merge( requireJsRuntimeConfig, {
  out : 'scripts.js',
  baseUrl : './src',
  name : 'app/startup',
  paths : {
    requireLib : '../bower_modules/requirejs/require'
  },
  // Modules listed here will be loaded synchronously by the app at startup
  // --> available immediately
  include : [
    'requireLib',
    'components/notifications/notifications',
    'components/messagebox/messagebox',
    'components/tasks/tasks',
    'components/usermenu/usermenu',
    'components/sidebar/sidebar',
    'text!pages/home.html',
    'text!snippets/disclaimer.html',
    'text!snippets/top-navigation.html'
  ],
  insertRequire : ['app/startup'],
  bundles : {
    'widgets': ['components/userlist/userlist', 'text!components/recently-added/recently-added.html'],
    'editor': ['components/jsoneditor/jsoneditor', 'text!pages/editor.html', ]
    // If you want parts of the site to load on demand, remove them from the 'include' list
    // above, and group them into bundles here.
    // 'bundle-name': [ 'some/module', 'another/module' ],
    // 'another-bundle-name': [ 'yet-another-module' ]
  }
} );

// Discovers all AMD dependencies, concatenates all required .js files, minifies them
gulp.task( 'js', function () {
  return requirejs( requireJsOptimizerConfig )
    // Todo: uglify only for production build
    //.pipe( uglify( { preserveComments : 'some' } ) )
    .pipe( gulp.dest( paths.dist ) );
} );

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task( 'css', function () {
  return gulp.src( [paths.css  + "all.css"] )
    // TODO: minification
    .pipe( gulp.dest( paths.dist ) );
});

// Copies Bootstrap fonts
gulp.task( 'fonts', function () {
  return gulp.src( [paths.css  + "fonts/*" ] )
    .pipe( gulp.dest( paths.dist + "fonts" ) );
});

gulp.task( 'images', function () {
  return gulp.src( [paths.resources  + "img/**/*" ] )
    // TODO: minification
    .pipe( gulp.dest( paths.dist + "resources/img" ) );
});


// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task( 'html', function () {
  return gulp.src( './src/index.html' )
    .pipe( htmlreplace( {
      'css' : 'all.css',
      'js' : 'scripts.js'
    } ) )
    .pipe( gulp.dest( paths.dist ) );
} );

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task( 'dist', ['js', 'html', 'css', 'fonts', 'images'], function () {
});
