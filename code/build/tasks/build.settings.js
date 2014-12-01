var src = "./src/",
    test = "./test/",
    dist = "./_dist/",
    build = "./build/",
    gen = "./_gen/",
    site = "./_site/";

var settings={
    paths: {
        src: src,
        modules: src + "modules/",
        components: src + "components/",
        test: test,
        gen: gen,
        build: build,
        reports: gen + "reports/",
        dist: dist,
        jsdoc: gen + "jsdoc/",
        site:site
    },
    pkgjson:require("../../package.json")
};

module.exports=settings;