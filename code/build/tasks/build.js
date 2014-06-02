var opts = require('./settings');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require("gulp-jsdoc");

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

    gulp.src(["./src/common/*.js", "README.md"])
        .pipe(jsdoc.parser(infos))
        .pipe(jsdoc.generator(opts.jsdoc, template, options));
});

gulp.task('build', ["lint", "clean", "test"], function () {
    gulp.src(opts.src + '/common/*.js')
        .pipe(gulp.dest(opts.target))
        .pipe(rename(opts.pkgjson.name + '.min.js'))
        //.pipe(gulpif(isProduction, uglify())) // only minify if production
        .pipe(uglify())
        .pipe(gulp.dest(opts.target));
});