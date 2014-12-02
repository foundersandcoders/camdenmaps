var gulp = require("gulp");

//arrays of files to watch for testing and linting
var serverFiles = [];
var angularFiles = [];
var allFiles = serverFiles.concat(angularFiles);

gulp.task("default", function () {
  
  //task for test
  //test: lab for server, protractor for e2e angular, karma for unit angular

  //task for linting
  //lint: gulp-jshint

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
