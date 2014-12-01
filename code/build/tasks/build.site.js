var gulp = require( 'gulp' ),
    paths = require( './build.settings' ).paths,
    clean = require( 'gulp-clean' ),
    deploy = require( 'gulp-gh-pages' );

/**
 * Assemble all generated reports and documentation to static site
 */
gulp.task( 'site:prepare', ['jsdoc', 'qa:plato', 'test:karma'], function ( done ) {
    done();
} );

gulp.task( 'site:clean', function () {
    return gulp.src( [ paths.site ],
        { read : false } )
        .pipe( clean() );
} );

/**
 * Assemble all generated reports and documentation to static site
 */
gulp.task( 'site:assemble', function () {
    return gulp.src( [
        paths.gen + "**/*",
        './docs/index.html'] )
        .pipe( gulp.dest( paths.site ) );
} );


gulp.task( 'site:deploy', function () {
    return gulp.src( paths.site + '**/*' )
        .pipe( deploy( {remoteUrl : "https://github.com/mediumorg/medium"} ) )
} );