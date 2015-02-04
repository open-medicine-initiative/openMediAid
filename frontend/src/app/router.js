define(["knockout", "crossroads", "hasher"], function(ko, crossroads, hasher) {

    // This module configures crossroads.js(each route entry
    // specifies a 'page', which is a Knockout component)

    return new Router({
        routes: [
            { url: '',          params: { page: 'home-page' } },
            { url: 'editor',    params: { page: 'jsoneditor' } },
            { url: 'about',     params: { page: 'about-page' } }
        ]
    });

    function Router(config) {
        var currentRoute = this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, function(route) {
            crossroads.addRoute(route.url, function(requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });

        activateCrossroads();
    }

    function activateCrossroads() {
        function parseHash(newHash, oldHash) { crossroads.parse(newHash); }
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();
    }
});