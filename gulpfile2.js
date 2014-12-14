(function(){
    "use strict";

    //import modules
    var gulp = require("gulp"),
        eslint = require("gulp-eslint"),
        karma = require("gulp-karma"),
        watch = require("gulp-watch"),
        lab = require("gulp-lab");

    //file arrays
    var serverFiles = ["./server/*.js", "./server/**/*.js"],
        angularFiles = ["./server/public/angular/*.js", "./server/public/angular/**/*.js"],
        allFiles = serverFiles.concat(angularFiles);
        

    //task for unit test
    gulp.task("unit-test", function () {

    });

    //task for acceptance test
    gulp.task("acceptance-test", function () {

    });

    //task for lab test
    gulp.task("server-test", function () {

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

    });

    //task for sassing production
    gulp.task("sass-production", function () {

    });

    //task for travis
    gulp.task("travis", ["lint", "sass-production", "acceptance-test"], function () {

    });

    //task for watching
    gulp.task("watch", ["lint", "sass-dev", "server-test", "unit-test"], function () {

    });

}());
