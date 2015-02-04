define(["knockout", "text!./tag.html", "tagprocessor", "data/catalogue.tags"], function (ko, template, TagProcessor, tagdefs) {

    function TagHierarchyViewModel(route) {
        var tagprocessor = new TagProcessor();
        var _tags = tagprocessor.pipeline().consumeAll(tagdefs);
        tagprocessor.buildHierarchy();
        this.tags = ko.observableArray(_tags);
    }

    return { viewModel: TagHierarchyViewModel, template: template };

});
