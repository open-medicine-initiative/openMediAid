var paths = require('./build.project').paths,
    gulp = require('gulp'),
    karma = require('karma').server;


gulp.task('test:karma', function() {
    // Be sure to return the stream
    return karma.start({
            configFile: '../../../karma.conf.js', // relative paths seem a bit broken
            singleRun: true,
            basePath: 'medium/medium/frontend' // this is a workaround for different base path handling
        });
});