(function(){
    "use strict";

    //import modules
    var gulp = require("gulp"),
        eslint = require("gulp-eslint"),
        karma = require("gulp-karma"),
        lab = require("gulp-lab"),
        protractor = require("gulp-protractor"),
        sass = require("gulp-sass"),
        uglify = require("gulp-uglify");

    //file arrays
    var serverFiles = ["./server/*.js", "./server/**/*.js"],
        angularFiles = ["./server/public/angular/*.js", "./server/public/angular/**/*.js"],
        serverTestFiles = ["./test/api/*.js"],
        karmaTestFiles = ["./test/frontend/unit/*.js"],
        protractorTestFiles = ["./test/frontend/acceptance/*.js"],
        allFiles = serverFiles.concat(angularFiles);

    //task for angular acceptance test
    gulp.task("acceptance-test", function () {
        return gulp.src(protractorTestFiles)
            .pipe(protractor({
                configFile: "./test/frontend/config/protractor.conf.js"
            }))
            .on("error", function (err) {
                throw err;
            })
    });

    //task for angular unit test
    gulp.task("unit-test", function () {
        return gulp.src(karmaTestFiles)
            .pipe(karma({
                configFile: "./test/frontend/config/karma.config.js",
                action: "watch"
            }))
            .on("error", function (err) {
                throw err;
            });
    });

    //task for lab test
    gulp.task("server-test", function () {
       return gulp.src(serverTestFiles)
            .pipe(lab());
    });

    //task for linting
    gulp.task("lint", function () {
        return gulp.src(allFiles)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failOnError());
    });

    //task for sassing development
    gulp.task("sass-dev", function () {
        gulp.src("./server/public/css/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./server/public/css/stylesheet.css"));
    });

    //task for sassing production
    gulp.task("sass-production", function () {
        gulp.src("./server/public/css/main.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest("./server/public/css/stylesheet"));
    });

    //task for minifying
    gulp.task("uglify", function () {
        
    });

    //task for travis
    gulp.task("travis", ["lint", "sass-production", "acceptance-test", "uglify"], function () {
        console.log("lint, sass, uglify and tests passed");
    });

    //task for when developing
    gulp.task("watch", ["lint", "sass-dev", "unit-test", "server-test"], function () {
        gulp.watch(allFiles, ["lint"]);
        gulp.watch("./server/public/css/main.scss", ["sass-dev"]);
        gulp.watch(karmaTestFiles, angularFiles, ["unit-test"]);
        gulp.watch(serverFiles.concat(serverTestFiles), ["server-test"]);
        console.log("gulp is watching for changes...");
    });

}());
