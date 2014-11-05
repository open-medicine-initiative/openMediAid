define([
    'jquery',
    'knockout',
    './router',
    'bootstrap',
    'knockout-projections'
], function ($, ko, router) {
    var root = (typeof window === "object" && window) || this;
    root.ko = ko;
    $(document).ready(function () {
        // Components can be packaged as AMD modules, such as the following:
        ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
        ko.components.register('home-page', { require: 'components/home-page/home' });


        // ... or for template-only components, you can just point to a .html file directly:
        ko.components.register('about-page', {
            template: { require: 'text!components/about-page/about.html' }
        });

//    ko.components.register('tags', { require: 'components/tags/taghierarchy' });
//    ko.components.register('tag', {
//        template: {require: "text!components/tags/tag.html"}
//    });

        ko.components.register('jsoneditor', { require: 'components/jsoneditor/jsoneditor' });
        ko.components.register('node', {
            template: {require: "text!components/jsoneditor/jsoneditor.html"}
        });

        // Start the application
        ko.applyBindings({ route: router.currentRoute });
    });



});
