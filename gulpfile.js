// npm install gulp gulp-less gulp-watch gulp-autoprefixer gulp-plumber gulp-livereload gulp-less path --save-dev
// explanation task breakdown: http://stackoverflow.com/questions/23953779/gulp-watch-and-compile-less-files-with-import
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var path = require('path');

gulp.task('less', function() {
    gulp.src('./style.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(less({
          paths: ['./', './overrides/']
        } ))
        .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
        .pipe(plumber.stop())
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});
gulp.task('watch', function() {
    gulp.watch('./**/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('default', ['watch']); // Default will run the 'entry' watch task
