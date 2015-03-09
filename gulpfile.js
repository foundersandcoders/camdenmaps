;(function(){
    "use strict";


    //import modules
    var gulp = require("gulp"),
        eslint = require("gulp-eslint"),
        lab = require("gulp-lab"),
        protractor = require("gulp-protractor").protractor,
        webdriver_update = require("gulp-protractor").webdriver_update,
        sass = require("gulp-sass"),
        uglify = require("gulp-uglify"),
        sourcemaps = require("gulp-sourcemaps"),
        source = require("vinyl-source-stream"),
        buffer = require("vinyl-buffer"),
        shell = require ("gulp-shell"),
        nodemon = require("gulp-nodemon"),
        htmlmin = require('gulp-htmlmin'),
        browserify = require("browserify");

    //file arrays
    var serverFiles = ["./server/*.js", "./server/**/*.js"],
        angularFiles = ["./server/public/angular/*.js", "./server/public/angular/**/*.js"],
        serverTestFiles = ["./test/api/*.js"],
        htmlFiles = ["./server/public/partials/*.html", "./server/public/*.html"],
        protractorTestFiles = [
                        // Desktop Tests below
                            './test/frontend/acceptance/desktop/landing.e2e.js',
                            './test/frontend/acceptance/desktop/services/categories.e2e.js',
                            './test/frontend/acceptance/desktop/services/services.e2e.js',
                            './test/frontend/acceptance/desktop/streetworks/streetworks.e2e.js',
                            './test/frontend/acceptance/desktop/neighbourhood/neighbourhood.e2e.js',

                        // Mobile Tests below
                             './test/frontend/acceptance/mobile/landing.e2e.js',
                             './test/frontend/acceptance/mobile/services/categories.e2e.js',
                             './test/frontend/acceptance/mobile/services/services.e2e.js',
                            ],
        sassFiles = ["./server/public/css/*.scss", "./server/public/css/*/*.scss"],
        allFiles = serverFiles.concat(angularFiles);

    //Useful for js compression. Used for task browserify
    var getBundleName = function () {
        var version = require('./package.json').version;
        var name = require('./package.json').name;
        return version + '.' + name + '.' + 'min';
    };

    gulp.task('webdriver_update', webdriver_update);

    //task for angular acceptance test
    gulp.task("acceptance-test", ["webdriver_update"],function () {
        return gulp.src(protractorTestFiles)
            .pipe(protractor({
                configFile: "./test/frontend/config/protractor.conf.js"
            }))
            .on("error", function (err) {
                throw err;
            });
    });

    //task for angular unit test
    gulp.task("unit-test", shell.task([
        "./node_modules/tape/bin/tape ./test/frontend/unit/*.js | ./node_modules/.bin/tap-spec"            
    ]));

    //task for lab test
    gulp.task("server-test", function () {
       return gulp.src(serverTestFiles)
            .pipe(lab());
    });

    //task for coverage lab test
    gulp.task("server-test-coverage", shell.task([
        "lab test/api/test.js -c"
    ]));

    //task for linting
    gulp.task("lint", function () {
        return gulp.src(allFiles)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failOnError());
    });

    //task for sassing development
    gulp.task("sass-dev", function () {
        return gulp.src("./server/public/css/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./server/public/css/"));
    });

    //task for sassing production
    gulp.task("sass-production", function () {
        return gulp.src("./server/public/css/main.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest("./server/public/css/"));
    });


    gulp.task("sass-watch", function () {
        gulp.watch(sassFiles, ["sass-dev"]);
    });

    //task for before pushing to master
    gulp.task("pre-travis", ["webdriver_update","browserify", "convertyaml", "sass-production"], function () {
        nodemon({ script: 'server/server.js'})
        .on('start', function () {
            return gulp.src(protractorTestFiles)
                .pipe(protractor({
                    configFile: "./test/frontend/config/protractor.conf.js"
                }))
                .on("error", function (err) {
                    throw err;
                })
                .on('end', function () {
                    process.exit();
                });
        });
        
    });

    //task for travis
    gulp.task("travis", ["browserify", "convertyaml", "sass-production"], function () {
        // nodemon({ script: 'server/server.js'})
        // .on('start', function () {
        //     return gulp.src(protractorTestFiles)
        //         .pipe(protractor({
        //             configFile: "./test/frontend/config/protractor.conf.js"
        //         }))
        //         .on("error", function (err) {
        //             throw err;
        //         })
        //         .on('end', function () {
        //             process.exit();
        //         });
        // });
        
    });

    //task for converting yaml files to json
    gulp.task("convertyaml", shell.task([
        "node server/lib/yml2swagger.js server/lib/yaml server/public/output"
    ]));

    gulp.task("browserify", function () {

        var bundle = function() {
            return browserify({ entries: ["./server/angular/app.js"], debug: true })
                .bundle()
                .pipe(source(getBundleName() + '.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./server/public/js/'));
        };
        return bundle();
    });

    gulp.task("watchify", shell.task([
        "watchify ./server/angular/app.js -o ./server/public/js/1.0.0.camdenmaps.min.js -v"
    ]));

    gulp.task('html', function() {
      return gulp.src(htmlFiles)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./server/public/templates'));
    });

    gulp.task("dependencies", function() {
        return shell.task([
            "npm install"            
        ])
    });

    gulp.task("build", ["dependencies", "sass-dev", "browserify"] , function() {
        return console.log("done building"); 
    });

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

    gulp.task("csvtojson", function() {
        return shell.task([
            "node ./server/lib/csvtojson.js"    
        ]);
    });

}());
