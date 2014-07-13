var opts = require('./settings');
var gulp = require('gulp');
var yargs = require('yargs');
var _mocha = require('gulp-mocha');
var mocha = function(params){
    return _mocha(params).on("error", function (error) {
        error.showstack = true; // make mocha print stack traces for errors coming from application code
        throw error;
    })
};
var blanket = require('gulp-blanket-mocha');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var Finder = require("fs-finder");

var Tests = {
    all: Finder.in(opts.test).findFiles('test.*.js'),
    perf: Finder.in(opts.test).findFiles('perf.*.js')
};

// take all mocha tests in 'test' folder and use browserify to
// make them available in a browser using the 'alltests.html"
gulp.task('test:browserify', function () {
    createBrowserifiedTests(determineTestSet(getYargs()));
});

function determineTestSet(yargs) {
    var sets = yargs.argv.tests.split(',');
    var selected = [];
    for (var i = 0; i < sets.length; i++) {
        if (!Tests[sets[i]])throw new Error("Unknown test set:" + sets[i]);
        selected = selected.concat(Tests[sets[i]]);
    }
    return selected;
}

function createBrowserifiedTests(files) {
    browserify(files)
        .bundle()
        // transform the stream to be gulp compatible
        .pipe(source('alltests.js'))
        .pipe(gulp.dest(opts.test + "inbrowser/"));
}

function getYargs() {
    var args = yargs
        .usage('Run the mocha unit tests in "test" folder.\nUsage: $0 $1')
        .example('$0 $1 -b', 'Run the test and generate in-browser tests')
        .options('b', {
            alias: 'browserify',
            default: false
        })
        .options('s', {
            alias: 'tests',
            default: 'all'
        })
        .describe('b', 'Set this option if you want to generate in-browser tests using browserify');
    //args.showHelp();
    return args;
}

gulp.task('test', function () {
    var yargs = getYargs();

    if (yargs.argv.b) {
        createBrowserifiedTests(determineTestSet(yargs));
    }
    return  gulp.src(determineTestSet(yargs))
        .pipe(mocha({ reporter: 'list' }));
});

/**
 * Run all tests with mocha and generate coverage report for listed
 * modules.
 */
gulp.task('test:coverage', function () {
    gulp.src(determineTestSet(), {read: false})
        .pipe(mocha({reporter: 'list'}))
        .pipe(blanket({
            instrument: Finder.Finder.in(opts.modules).findFiles('*.js'),
            // where to render the reporter output
            captureFile: 'build/reports/test-coverage.html',
            // the report format
            reporter: 'html-cov'
        }));
});