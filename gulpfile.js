var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('javascript', function () {
    browserify('./src/js/app.js', {debug: true})
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest('./static'));
});

gulp.task('stylesheets', function () {
    return gulp.src('./src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./static'));
});

gulp.task('fonts', function() {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./static/fonts'));
});

gulp.task('watch', function() {
    gulp.watch('./src/js/**/*.js', ['javascript']);
    gulp.watch('./src/scss/**/*.scss', ['stylesheets'])
});

gulp.task('build', ['javascript', 'stylesheets', 'fonts']);