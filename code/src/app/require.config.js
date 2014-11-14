// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "lib/components-bootstrap/js/bootstrap.min",
        "crossroads":           "lib/crossroads/dist/crossroads.min",
        "hasher":               "lib/hasher/dist/js/hasher.min",
        "jquery":               "lib/jquery/dist/jquery",
        "knockout":             "lib/knockout/dist/knockout",
        "knockout-projections": "lib/knockout-projections/dist/knockout-projections",
        "knockout-dict":        "lib/knockout-dict/ko.observableDictionary",
        "signals":              "lib/js-signals/dist/signals.min",
        "text":                 "lib/requirejs-text/text",
        "lodash":               "lib/lodash/dist/lodash",
        "underscore":           "lib/underscore/underscore",
        "cocktail":             "lib/cocktails/cocktail",
        "taffy":                "lib/taffy/taffy",
        "module":               "modules",
        "data":                 "data",
        "tagprocessor":         "modules/tagprocessor",
        "typo":                 "modules/types/typo",
        "pipeline":             "modules/pipes",
        "assembly":             "modules/stages",
        "editor.Node":          "components/jsoneditor/json.editor.Node"
    },
    shim: {
        // load jQuery before bootstrap
        "bootstrap": { deps: ["jquery"] },
        "knockout-projections": { deps: ["knockout"] }
    }
};
