var opts = require('./settings');
var gulp = require('gulp');
var yargs   = require('yargs');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var browserify = require('gulp-browserify');

// take all mocha tests in 'test' folder and use browserify to
// make them available in a browser using the 'alltests.html"
gulp.task('inbrowser-tests', function () {
    createInBrowserTests();
});

function createInBrowserTests(){
    console.log("Creating in browser tests...");
    gulp.src(opts.test + "*.js")
        .pipe(browserify({
            insertGlobals : true
            //debug : !gulp.env.production
        }))
        .pipe(rename('alltests.js'))
        .pipe(gulp.dest(opts.test + "inbrowser/"))
}


gulp.task('test', function () {
    // get CLI args
    var args = yargs.usage('Run the mocha unit tests in "test" folder.\nUsage: $0 $1')
        .example('$0 $1 -b', 'Run the test and generate in-browser tests')
        .options('b', {
            alias : 'browser',
            default : false
        })
        .describe('b', 'Set this option if you want to generate in-browser tests using browserify');
    args.showHelp();

    if(args.argv.b){
        createInBrowserTests();
    }
    else{
       return  gulp.src(opts.test + '*.js')
            .pipe(mocha({ reporter: 'list' }));
    }
});