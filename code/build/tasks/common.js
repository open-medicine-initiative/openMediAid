var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintstylish = require('jshint-stylish');
var clean = require('gulp-clean');
var opts = require('./settings');
var mkdirp = require('mkdirp');




gulp.task('prepare', ["clean"], function (callback) {
    mkdirp(opts.reports, function (err) {
        callback();
    });
});

gulp.task('clean', function () {
    // return the stream to allow gulp to watch this task for completion
    // otherwise
    return gulp.src([opts.target, opts.jsdoc, opts.reports], { read: false })
        .pipe(clean());
});

gulp.task('lint', function () {
    gulp.src(opts.modules + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintstylish))
        .pipe(jshint.reporter('fail'));
});

module.exports = {};