;(function(){
    "use strict";

    var gulp = require("gulp"),
        protractor = require("gulp-protractor").protractor,
        webdriver_update = require("gulp-protractor").webdriver_update,
        sass = require("gulp-sass"),
        uglify = require("gulp-uglify"),
        sourcemaps = require("gulp-sourcemaps"),
        source = require("vinyl-source-stream"),
        buffer = require("vinyl-buffer"),
        shell = require ("gulp-shell"),
        nodemon = require("gulp-nodemon"),
        htmlmin = require("gulp-htmlmin"),
        browserify = require("browserify"),
        creds = require("./test/frontend/config/sauce.conf.json"),
        sauceConnectLauncher = require("sauce-connect-launcher");

    var serverFiles = ["./server/server.js", "./server/handlers/*.js", "./server/lib/*.js", "./server/config/*.js"],
        angularFiles = ["./server/angular/*.js", "./server/angular/**/*.js"],
        serverTestFiles = ["./test/api/*.js"],
        htmlFiles = ["./server/angular/partials/*.html"],
        protractorTestFiles = [
            "./test/frontend/acceptance/desktop/landing.e2e.js",
            "./test/frontend/acceptance/desktop/services/categories.e2e.js",
            "./test/frontend/acceptance/desktop/services/services.e2e.js",
            "./test/frontend/acceptance/desktop/streetworks/streetworks.e2e.js",
            "./test/frontend/acceptance/desktop/neighbourhood/neighbourhood.e2e.js"
        ],
        performanceFile = ["./test/frontend/performance/performance.all.js"],
        sassFiles = ["./server/public/css/*.scss", "./server/public/css/*/*.scss"],
        allFiles = serverFiles.concat(angularFiles, htmlFiles, sassFiles);

    //Used for task browserify
    var getBundleName = function () {
        var version = require("./package.json").version;
        var name = require("./package.json").name;
        return version + "." + name + "." + "min";
    };

/*******************************
*       TEST TASKS
********************************/

    gulp.task("wd-start", shell.task([
        "./node_modules/.bin/webdriver-manager start"
    ]));

    gulp.task("webdriver_update", webdriver_update);

    gulp.task("e2e-local", ["webdriver_update"],function () {
        nodemon({
            script: "server/server.js",
            ext: "html js",
            ignore: ["node_modules"]
        })
        .on("start", function () {
            return gulp.src(protractorTestFiles)
            .pipe(protractor({
                configFile: "./test/frontend/config/local.conf.js"
            }))
            .on("error", function (err) {
                throw err;
            })
            .on("end", function () {
                process.exit();
            });
        });
    });

    //Runs on SauceLabs
    gulp.task("e2e", function() {
        sauceConnectLauncher({
            username: creds.uname,
            accessKey: creds.aKey
        }, function (err, sauceConnectProcess) {
            if (err) {
              console.error(err.message);
              return;
            }
            gulp.src(protractorTestFiles)
                .pipe(protractor({
                    configFile: "./test/frontend/config/protractor.conf.js"
                }))
                .on("error", function(e) {
                    sauceConnectProcess.close(function () {
                    console.log("Closed Sauce Connect process");
                });
                throw e;
            })
            .on("end", function(e) {
                sauceConnectProcess.close(function () {
                    console.log("Closed Sauce Connect process");
                });
            });
        });
    });

    gulp.task("load-test", shell.task([
        "node ./scripts/loadtest.js"
    ]));

    gulp.task("server-integration", shell.task([
        "./node_modules/tape/bin/tape ./test/api/integration/*.test.js | ./node_modules/.bin/tap-spec"
    ]));

    gulp.task("server-unit", shell.task([
        "./node_modules/tape/bin/tape ./test/api/*.test.js | ./node_modules/.bin/tap-spec"
    ]));

    gulp.task("performance", shell.task([
        "node_modules/.bin/protractor-perf ./test/frontend/config/performance.conf.js"
    ]));

    gulp.task("test", ["load-test", "server-integration", "server-unit"], function() {
        return console.log("done testing");
    });


/*******************************
*       COMPILING TASKS
********************************/

    gulp.task("html", function() {
      return gulp.src(htmlFiles)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./server/public/partials"));
    });

    gulp.task("sass-dev", function () {
        return gulp.src("./server/public/css/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./server/public/css/"));
    });

    //task for minifying css. Travis uses this
    gulp.task("sass-production", function () {
        return gulp.src("./server/public/css/main.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest("./server/public/css/"));
    });

    //Task for watching, and compiling sass for development
    gulp.task("sass-watch", function () {
        gulp.watch(sassFiles, ["sass-dev"]);
    });

    //Travis uses this command to minify angular before deploying
    gulp.task("browserify", function () {

        var bundle = function() {
            return browserify({ entries: ["./server/angular/app.js"], debug: true })
                .bundle()
                .pipe(source(getBundleName() + ".js"))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write("./"))
                .pipe(gulp.dest("./server/public/js/"));
        };
        return bundle();
    });

    // Watching angular files, and compiling on change for development
    gulp.task("watchify", shell.task([
        "watchify ./server/angular/app.js -o ./server/public/js/1.0.0.camdenmaps.min.js -v"
    ]));


/*******************************
*       BUILD TASKS
********************************/

    gulp.task("dependencies", function() {
        return shell.task([
            "npm install"
        ]);
    });

    gulp.task("build", ["dependencies", "html", "sass-dev", "browserify"] , function() {
        return console.log("done building");
    });

    //task for travis
    gulp.task("travis", function () {
        console.log("Ready to Deploy");
    });

    //Use this task but simply running `gulp` on your command line.
    gulp.task("default",["build"],  function() {
        nodemon({
            script: "server/server.js",
            ext: "html js",
            ignore: ["node_modules"]
        })
        .on("restart", function(){
            console.log("restarted");
        });
    });
}());
