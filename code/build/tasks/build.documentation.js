var settings = require('./build.settings'),
    paths = settings.paths,
    gulp = require('gulp'),
    jsdoc = require("gulp-jsdoc"),
    Finder = require("fs-finder"),
    clean = require('gulp-clean'),
    deploy = require('gulp-gh-pages');

function jsDocFiles(){
    var jsModules = Finder.from(paths.modules).findFiles('*.js');
    var jsDocReadme = "../README.md";
    jsModules.push(jsDocReadme);
    return jsModules;
}

gulp.task('jsdoc', ["jsdoc:clean"], function () {
    var infos = {
        name: settings.pkgjson.name,
        plugins: ['plugins/markdown']
    };
    var template = {
        path: 'ink-docstrap',
        systemName: 'OpenMed',
        copyright: "OpenMed",
        navType: "vertical",
        theme: "superhero",
        linenums: true,
        collapseSymbols: true,
        inverseNav: false
    }
    var options =   {
        'private': false,
        monospaceLinks: false,
        cleverLinks: false,
        outputSourceFiles: true
    };

    return gulp.src(jsDocFiles())
        .pipe(jsdoc.parser(infos))
        .pipe(jsdoc.generator(paths.jsdoc, template, options));
});

gulp.task('jsdoc:clean', function () {
    return gulp.src([paths.jsdoc], { read: false })
        .pipe(clean());
});
