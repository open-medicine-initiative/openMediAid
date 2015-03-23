// require.js looks for the following global when initializing
var require = {
  baseUrl : ".",
  paths : {
    "bootstrap" : "../bower_modules/bootstrap/dist/js/bootstrap.min",
    "crossroads" : "../bower_modules/crossroads/dist/crossroads.min",
    "hasher" : "../bower_modules/hasher/dist/js/hasher.min",
    "jquery" : "../bower_modules/jquery/dist/jquery",
    "knockout" : "../bower_modules/knockout/dist/knockout",
    "knockout-projections" : "../bower_modules/knockout-projections/dist/knockout-projections",
    "knockout-dict" : "../bower_modules/knockout-dict/ko.observableDictionary",
    // http://mbest.github.io/knockout.punches/
    "knockout-punches" : "resources/js/knockout.punches",
    "signals" : "../bower_modules/js-signals/dist/signals.min",
    "text" : "../bower_modules/requirejs-text/text",
    "lodash" : "../bower_modules/lodash/dist/lodash",
    "underscore" : "../bower_modules/underscore/underscore",
    "cocktail" : "../bower_modules/cocktails/cocktail",
    "taffy" : "../bower_modules/taffy/taffy",
    "module" : "modules",
    "data" : "data",
    "tagprocessor" : "modules/tagprocessor",
    "typo" : "modules/types/typo",
    "pipeline" : "modules/pipes",
    "mbassy" : "modules/mbassy",
    "utils" : "modules/common/utils",
    "assembly" : "modules/stages",
    "editor.Node" : "components/jsoneditor/json.editor.Node",
    "fastclick" : "plugins/fastclick/fastclick",
    "sparkline" : "plugins/sparkline/jquery.sparkline.min",
    "jvectormap" : "plugins/jvectormap/jquery-jvectormap-1.2.2.min",
    "jvectormap-world" : "plugins/jvectormap/jquery-jvectormap-world-mill-en",
    "daterangepicker" : "plugins/daterangepicker/daterangepicker",
    "datepicker" : "plugins/datepicker/bootstrap-datepicker",
    "icheck" : "plugins/iCheck/icheck.min",
    "slimscroll" : "plugins/slimScroll/jquery.slimscroll.min",
    "chartjs" : "plugins/chartjs/Chart.min",
    "adminLTE" : "resources/js/app"
  },
  shim : {
    // load jQuery before bootstrap
    "bootstrap" : { deps : ["jquery"] },
    "adminLTE" : { deps : ["bootstrap"] },
    "sparkline" : { deps : ["jquery"] },
    "jvectormap" : { deps : ["jquery"] },
    "jvectormap-world" : { deps : ["jvectormap"] },
    "slimscroll" : { deps : ["jquery"] },
    "knockout-projections" : { deps : ["knockout"] },
    "knockout-punches" : { deps : ["knockout"] }

  }
};
