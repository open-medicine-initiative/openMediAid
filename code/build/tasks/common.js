var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintstylish = require('jshint-stylish');
var clean = require('gulp-clean');
var paths = require('./settings').paths;
var mkdirp = require('mkdirp');

gulp.task('prepare', ["clean"], function (callback) {
    mkdirp(paths.reports, function (err) {
        callback();
    });
});

gulp.task('clean', function () {
    return gulp.src([paths.target, paths.jsdoc, paths.reports], { read: false })
        .pipe(clean());
});



gulp.task('lint', function () {
    gulp.src(paths.modules + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintstylish))
        .pipe(jshint.reporter('fail'))
    ;
});

module.exports = {};