// see https://www.npmjs.org/package/karma-requirejs for more details
// this strange code is necessary to make karma work with requirejs
// tests are a subset of the set of registered files (see karma.conf.js)
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/test\/components\/.*\.js$/.test(file)) {
            tests.push(file);
        }
        if (/test\/modules\/.*\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    baseUrl: '/base/src',
    deps: tests,
    callback: window.__karma__.start
});

/* see http://blogs.lessthandot.com/index.php/webdev/uidevelopment/javascript/continuous-javascript-testing-with-karma/
 require(tests, function(){
 window.__karma__.start();
 });
 */
