var settings={
    paths: {
        src: "./src/",
        modules: "./src/modules/",
        test: "./test/",
        testgen: "./test-gen/",
        build: "./build/",
        reports: "./dist/reports",
        target: "./dist/",
        jsdoc: "./dist/jsdoc/"
    },
    pkgjson:require("../../package.json")
};

module.exports=settings;