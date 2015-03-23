var Finder = require( "fs-finder" );

var paths = {
  src : "./src/", // the source folder
  modules : "./src/modules/", // javascript modules used in web-client
  components : "./src/components/", // knockout components
  snippets : "./src/snippets/", // knockout html-template snippets
  pages : "./src/pages/", // knockout html-template pages
  resources :  "./src/resources/",
  less : "./src/resources/less/", // css is built from less
  css : "./src/resources/css/", // the generated css
  bootstrap: "./bower_modules/bootstrap/dist/", // the location of the twitter bootstrap distribution
  test : "./test/", // the test folder,
  lib : "../bower_modules/",
  gen : "../target/frontend/workdir/", // the working directory for the build
  build : "./build/", // the home of the build files
  reports : "../target/frontend/workdir/reports/",
  dist : "../target/frontend/dist/", // the target for the build output (deployable code)
  jsdoc : "../target/frontend/workdir/jsdoc/",
  site : "../target/frontend/site/"  // the target of the generated website

};

var codebase = {
  modules : function () {return Finder.from( paths.modules ).findFiles( '*.js' )}
};

var project = {
  paths : paths,
  pkgjson : require( "../../package.json" ),   // load the package.json file
  codebase : codebase
}

module.exports = project;