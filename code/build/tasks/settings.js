var settings={
    paths: {
        src: "./src/",
        modules: "./src/modules/",
        components: "./src/components/",
        test: "./test/",
        gen: "./gen/",
        build: "./build/",
        reports: "./gen/reports",
        target: "./dist/",
        jsdoc: "./gen/jsdoc/"
    },
    pkgjson:require("../../package.json")
};

module.exports=settings;