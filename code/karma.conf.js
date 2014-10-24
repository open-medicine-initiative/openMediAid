module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'requirejs',
            'mocha', // https://www.npmjs.org/package/karma-mocha
            // register sinon and chai asserts
            // such that no require() calls are necessary in test files
            'sinon-chai'
        ],


        // list of files / patterns to load [in the browser?]
        files: [
            // config files
            'src/app/require.config.js',
            'test/require.config.js',
            'test/SpecRunner.karma.js',
            // test files
            { pattern: 'test/**/*.coffee', included: false },
            { pattern: 'test/**/*.js', included: false },
            // source files to watch for changes
            { pattern: 'src/**/*.js', included: false },
            { pattern: 'src/**/*.html', included: false }
        ],


        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/require.config.js': ['requireglobal'],
            '**/*.coffee': ['coffee']
        },

        // configure the coffeescript preprocessor
        coffeePreprocessor: {
            // options passed to the coffee compiler
            options: {
                bare: true,
                sourceMap: true
            },
            // transforming the filenames
            transformPath: function(path) {
                return path.replace(/\.coffee$/, '.js');
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // https://github.com/karma-runner/karma-coverage
        reporters: ['progress'],


        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'Chrome' // export CHROME_BIN=/usr/bin/chromium-browser
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false

    });
};
