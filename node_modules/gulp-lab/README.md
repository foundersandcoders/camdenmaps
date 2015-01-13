gulp-lab
========

Gulp test runner for [Lab](https://github.com/spumko/lab).

Gulp-lab supports the same [options as Lab](https://github.com/spumko/lab#command-line).

## Install

```
npm install gulp-lab --save-dev
```

## NOTES

Gulp-lab can be used with String, Array and Object options or without.

Gulp-lab can emit an Error when tests fails.
Simply use options object with property "emitLabError" on true! By default, "emitLabError" is false.


## Example 1 - without options

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('test')
      .pipe(lab());
});

gulp.task('default', ['test']);
```


## Example 2 - options by a String

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('test')
      .pipe(lab('-v -l -C'));
});

gulp.task('default', ['test']);
```

## Example 3 - options by an Array

```js
// gulpfile.js
var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('test', function () {
    return gulp.src('test')
      .pipe(lab(['-v', '-l', '-C']));
});

gulp.task('default', ['test']);
```

## Example 4 - options by an Object in conjunction with JSHint

NOTE: **args** property can be either a **String** or an **Array** and is **OPTIONAL**!

```js
// gulpfile.js
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var lab = require('gulp-lab');

gulp.task('test', function () {
  return gulp.src('./test/**/*.js')
    .pipe(lab({
      args: '-v -C',
      opts: {
        emitLabError: true
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['test']);
```
