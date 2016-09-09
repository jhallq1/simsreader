/* jslint node: true */
/* jshint esversion: 6 */
const gulp = require('gulp'),
      paths = require('./paths.json'),
      templateCache = require('gulp-angular-templatecache'),
      eslint = require('gulp-eslint'),
      del = require('del'),
      rs = require('run-sequence'),
      concat = require('gulp-concat');

gulp.task('clean', function() {
  Object.keys(paths.clean).forEach(function(key) {
    return del(paths.clean[key], {force: true});
  });
});

gulp.task('build-index', function() {
  gulp.src(paths.index)
  .pipe(gulp.dest(paths.dest.dev));
});

gulp.task('build-js', function() {
  return gulp.src(paths.nodeModules.js.concat(paths.js))
  .pipe(eslint())
  .pipe(concat('main.js'))
  .pipe(gulp.dest(paths.dest.dev + "/js"));
});

gulp.task('build-templates', function() {
  return gulp.src(paths.templates.concat(["!./src/index.html"]))
  .pipe(templateCache({module: 'templateCache', standalone: true}))
  .pipe(gulp.dest(paths.dest.dev + "/templates"));
});

gulp.task('build-css', function() {
  return gulp.src(paths.nodeModules.css.concat(paths.css))
  .pipe(concat('main.css'))
  .pipe(gulp.dest(paths.dest.dev + "/css"));
});

gulp.task('build-fonts', function() {
  return gulp.src(paths.fonts)
  .pipe(gulp.dest(paths.dest.dev + "/fonts"));
});

gulp.task('build', function() {
  return rs('clean', 'build-index', 'build-templates', 'build-css', 'build-js', 'build-fonts');
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.*', function() {
    return rs('build', function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
});
