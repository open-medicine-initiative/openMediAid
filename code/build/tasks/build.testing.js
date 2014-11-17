var paths = require('./build.settings').paths,
    gulp = require('gulp'),
    karma = require('karma').server;


gulp.task('test:karma', function() {
    // Be sure to return the stream
    return karma.start({
            configFile: '../../../karma.conf.js', // relative paths seem a bit broken
            singleRun: true,
            basePath: 'medium/medium/code' // this is a workaround for different base path handling
        });
});


/* Livescript is not used for testing anymore. Remaining tests are
migrated to coffeescript.

gulp.task('ls:gentests',['ls:base', 'ls:data'], function() {
    return gulp.src(TestSuites.livescript())
        .pipe(gulpLiveScript({bare: true}))
        .pipe(gulp.dest(paths.testgen));
});
gulp.task('ls:base', function() {
    return gulp.src(paths.test + "base/*.ls")
        .pipe(gulpLiveScript({bare: true}))
        .pipe(gulp.dest(paths.testgen + "base"));
});
gulp.task('ls:data', function() {
    return gulp.src(paths.test + "data/*.ls")
        .pipe(gulpLiveScript({bare: true}))
        .pipe(gulp.dest(paths.testgen + "data"));
});
 */