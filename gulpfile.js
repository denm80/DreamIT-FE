var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserify = require("gulp-browserify");


var path = {
    src: {
        html: './src/**/*.html',
        scripts: './src/**/*.js',
        styles: './src/**/*.scss'
    },
    build: './build',
    lib: './bower_components'
};

// ------------------------------------------------------------------------------
// Clean
// ------------------------------------------------------------------------------
gulp.task('clean', function () {
    del.sync(path.build);
});

// ------------------------------------------------------------------------------
// Build
// ------------------------------------------------------------------------------
gulp.task('build', ['clean', 'scripts', 'styles', 'html'], function () {
});


// ------------------------------------------------------------------------------
// Watch
// ------------------------------------------------------------------------------
gulp.task('watch', function () {
    gulp.watch(path.src.scripts, ['scripts'], browserSync.reload);
    gulp.watch(path.src.styles, ['styles'], browserSync.reload);
    gulp.watch(path.src.html, ['html'], browserSync.reload);
});


// ------------------------------------------------------------------------------
// Static Server + watching
// ------------------------------------------------------------------------------
gulp.task('serve', ['build', 'watch'], function () {

    browserSync.init({
        server: {
            baseDir: path.build,
            routes: {
                '/lib': path.lib
            }
        }
    });
});


// ------------------------------------------------------------------------------
// Html
// ------------------------------------------------------------------------------
gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream());
});


// ------------------------------------------------------------------------------
// Scripts
// ------------------------------------------------------------------------------
gulp.task('scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(browserify({
            transform: ['babelify']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write("/map"))
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream());
});


// ------------------------------------------------------------------------------
// Styles
// ------------------------------------------------------------------------------
gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('/map'))
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream());
});

gulp.task('default', ['build']);