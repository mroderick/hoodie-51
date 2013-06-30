var config = module.exports;

config["hoodiejs browser"] = {
    env: "browser",        // or "node"
    rootPath: "../",
    sources: [
        "src/**/*.js"      // Glob patterns supported
    ],
    tests: [
        "test/*-test.js"
    ]
};