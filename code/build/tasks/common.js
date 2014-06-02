var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintstylish = require('jshint-stylish');
var clean = require('gulp-clean');
var opts = require('./settings');

gulp.task('clean', function () {
    // return the stream to allow gulp to watch this task for completion
    // otherwise
    return gulp.src([opts.target, opts.jsdoc], { read: false })
        .pipe(clean());
});

gulp.task('lint', function () {
    gulp.src(opts.src + '**/*.js')
        //.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(jshintstylish));
});

module.exports = {};