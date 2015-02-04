var Finder = require( "fs-finder" );

var src = "./src/", // the source folder
  test = "./test/", // the test folder
  dist = "../target/frontend/dist/", // the target for the build output (deployable code)
  build = "./build/", // the home of the build files
  gen = "../target/frontend/workdir/",  // the working directory for the build
  site = "../target/frontend/site/";  // the target of the generated website

var paths = {
  src : src,
  modules : src + "modules/",
  components : src + "components/",
  test : test,
  gen : gen,
  build : build,
  reports : gen + "reports/",
  dist : dist,
  jsdoc : gen + "jsdoc/",
  site : site
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