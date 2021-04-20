var gulp = require('gulp');
var sass = require('gulp-sass');
var image = require('gulp-image');

function taskSass() {
    return gulp.src(__dirname + '/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(__dirname + '/public/css'));
}

function taskImage() {
    return gulp.src(__dirname + '/assets/images/*.*')
        .pipe(image())
        .pipe(gulp.dest(__dirname + '/public/img'));
}

gulp.task('default', gulp.parallel(taskSass, taskImage));
