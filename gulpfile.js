(function () {
    "use strict";

    //load gulp and plugins
    var gulp = require("gulp"),
        eslint = require("gulp-eslint"),
        karma = require("gulp-karma"),
        watch = require("gulp-watch"),
        lab = require("gulp-lab");

    //arrays of files to watch for testing and linting
    var serverFiles = [];
    var angularFiles = [];
    var allFiles = serverFiles.concat(angularFiles);
    var testFiles = [];

    //task for installing dependencies
    gulp.task("get-dep", function () {
        //install dependencies
    });

    //task for linting
    gulp.task("lint", function () {
        return gulp.src(["js/**/*.js"])
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failOnError());
    });

    gulp.task("test-unit", function () {
        console.log(lab);
        return gulp.src("./test/unit")
            .pipe(lab());
    });

    gulp.task("test-acc", function () {
        return gulp.src(testFiles)
            .pipe(karma({
                configFile: "test/frontend/config/karma.conf.js",
                action: "watch"
            }))
            .on("error", function(err) {
                throw err;
            })
    });

    //only run if lint passes
    gulp.task("default", ["lint", "test-acc"], function () {
      
      //task for test
      //test: lab for server, protractor for e2e angular, karma for unit angular

      //task for watching
      //watch: lint, test, uglify, build

      //task for minifying
      //minify: gulp-uglify
     
      //task to compress image
      //compress: gulp-imagemin
     
      //task for building

      //task for compiling sass
      //compiling: gulp-sass

    });

    gulp.task("save", ["default"]);

    gulp.task("ci", ["default"]);

}());
