var opts = require('./settings');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require("gulp-jsdoc");
var browserify = require('browserify');
var source = require("vinyl-source-stream");

gulp.task('jsdoc', ["lint", "clean"], function () {
    var infos = {
        name: opts.pkgjson.name,
        plugins: ['plugins/markdown']
    };
    var template = {
        path: 'ink-docstrap',
        systemName: 'Medsys',
        footer: "This footer text needs to be replaced...",
        copyright: "Medium",
        navType: "vertical",
        theme: "superhero",
        linenums: true,
        collapseSymbols: false,
        inverseNav: false
    }
    var options =   {
        'private': false,
        monospaceLinks: false,
        cleverLinks: false,
        outputSourceFiles: true
    };

    gulp.src([opts.modules + "**/*.js", "README.md"])
        .pipe(jsdoc.parser(infos))
        .pipe(jsdoc.generator(opts.jsdoc, template, options));
});

/**
 * The target build structure mirrors the source structure such that relative path
 * work in both
 **/
gulp.task('build', ["prepare", "lint", "test"], function () {
    // process modules with browserify such that they work
    browserify()
        .require("./src/modules/web-bundle.js", {expose:"medium"})
        .bundle()
        // transform the stream to be node compatible (using vinyl)
        .pipe(source('web-bundle.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(opts.target + "modules/"));

    // copy external libraries
    gulp.src(opts.src + "lib/**/*.js")
        .pipe(gulp.dest(opts.target + "lib/"));

    // copy the user-interface
    gulp.src(opts.src + "ui/**/*.*")
        .pipe(gulp.dest(opts.target + "ui/"));
});