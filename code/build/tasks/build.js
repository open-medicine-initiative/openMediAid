var settings = require('./settings');
var paths = settings.paths;
var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsdoc = require("gulp-jsdoc");
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var Finder = require("fs-finder");

function jsDocFiles(){
    var jsModules = Finder.from(paths.modules).findFiles('*.js')
    var jsDocReadme = "./build/jsdoc/README.md";
    jsModules.push(jsDocReadme);
    return jsModules;
}

gulp.task('jsdoc', ["lint", "clean:jsdoc"], function () {
    var infos = {
        name: settings.pkgjson.name,
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

    gulp.src(jsDocFiles())
        .pipe(jsdoc.parser(infos))
        .pipe(jsdoc.generator(paths.jsdoc, template, options));
});

/**
 * The target build structure mirrors the source structure such that relative path
 * work in both
 **/
gulp.task('build', ["prepare", "lint", "test"], function () {
    // process modules with browserify such that they work
    // in environments without knowledge of require
    browserify()
        .require("./src/modules/web-bundle.js", {expose:"medium"})
        .bundle()
        // transform the stream to be node compatible (using vinyl)
        .pipe(source('web-bundle.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.target + "modules/"));

    // copy external libraries
    gulp.src(paths.src + "lib/**/*.js")
        .pipe(gulp.dest(paths.target + "lib/"));

    // copy the user-interface
    gulp.src(paths.src + "ui/**/*.*")
        .pipe(gulp.dest(paths.target + "ui/"));
});