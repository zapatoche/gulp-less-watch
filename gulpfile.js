// npm install gulp gulp-less gulp-watch gulp-autoprefixer gulp-plumber gulp-livereload gulp-less path --save-dev
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var path = require('path');

gulp.task('default', function() {
    return gulp.src('./style.less')
        .pipe(watch())
        .pipe(plumber())
        .pipe(less({
          paths: ['./', './overrides/']
        } ))
        .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});
