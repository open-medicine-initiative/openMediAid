/**
 * This build file assembles all tasks and provides help about build usage.
 *
 */

var opts = require('./build/tasks/settings').paths;
var common = require('./build/tasks/common');
var testing = require('./build/tasks/testing');
var build = require('./build/tasks/build');
var gulp = require('gulp');


// TODO: explain options and build
gulp.task('help', function () {
    console.log("This is the medium build script!")
});

gulp.task('default', ["build"], function () {
    console.log("This is the medium build script!")
});

//https://github.com/rschmukler/gulp-insert








