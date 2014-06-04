var opts = require('./settings');
var gulp = require('gulp');
var yargs = require('yargs');
var mocha = require('gulp-mocha');
var blanket = require('gulp-blanket-mocha');
var browserify = require('browserify');
var source = require("vinyl-source-stream");

// take all mocha tests in 'test' folder and use browserify to
// make them available in a browser using the 'alltests.html"
gulp.task('test:browserify', function () {
    createBrowserifiedTests();
});

function createBrowserifiedTests() {
    browserify([
        opts.test + "common.catalogues.js",
        opts.test + "common.utils.js"
    ])
        .bundle()
        // transform the stream to be gulp compatible
        .pipe(source('alltests.js'))
        .pipe(gulp.dest(opts.test + "inbrowser/"));
}

function getYargs() {
    return yargs.usage('Run the mocha unit tests in "test" folder.\nUsage: $0 $1')
        .example('$0 $1 -b', 'Run the test and generate in-browser tests')
        .options('b', {
            alias: 'browser',
            default: false
        })
        .describe('b', 'Set this option if you want to generate in-browser tests using browserify');
    //args.showHelp();
}

gulp.task('test', function () {
    // get CLI args
    var args = getYargs();

    if (args.argv.b) {
        createBrowserifiedTests();
    }
    else {
        return  gulp.src(opts.test + '*.js')
            .pipe(mocha({ reporter: 'list' }));
    }
});

/**
 * Run all tests with mocha and generate coverage report for listed
 * modules.
 */
gulp.task('test:coverage', function () {
    gulp.src([opts.test + "*.js"], {read: false})
        .pipe(mocha({
            reporter: 'list'
        }))
        .pipe(blanket({
            // Blanket  needs to be told explicitly which files to instrument.
            instrument: [
               "src/modules/common/catalogues.js",
                "src/modules/common/utils.js"],
            // where to render the reporter output
            captureFile: 'build/reports/test-coverage.html',
            reporter: 'html-cov'
        }));
});