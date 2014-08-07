// npm install gulp gulp-less gulp-watch gulp-autoprefixer gulp-plumber gulp-livereload gulp-less path --save-dev
// explanation task breakdown: http://stackoverflow.com/questions/23953779/gulp-watch-and-compile-less-files-with-import
var gulp = require('gulp'),
less = require('gulp-less'),
watch = require('gulp-watch'),
prefix = require('gulp-autoprefixer'),
plumber = require('gulp-plumber'),
livereload = require('gulp-livereload'),
colorguard = require('gulp-colorguard'),
cmq = require('gulp-combine-media-queries'),
minifyCSS = require('gulp-minify-css'),
csscomb = require('gulp-csscomb'),
path = require('path');

gulp.task('less', function() {
    gulp.src('./style.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(less({
          paths: ['./', './partials/', './overrides/']
        } ))
        .pipe(prefix("last 2 version", "> 1%", "ie 9", "ie 8", "ie 7"))
        .pipe(cmq({
          log: true
        }))
        .pipe(colorguard())
        .pipe(csscomb())
        .pipe(minifyCSS({
          // noAdvanced: true,
          keepBreaks: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});
gulp.task('watch', function() {
    gulp.watch('./**/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task
