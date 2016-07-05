var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserify = require("gulp-browserify");
var plumber = require('gulp-plumber');


var path = {
    src: {
        html: './src/**/*.html',
        images: './src/img/**',
        scripts: './src/**/*.js',
        styles: './src/**/*.scss'
    },
    output: {
        basedir: './build',
        images: './build/img/',
    },
    lib: './bower_components'
};

// ------------------------------------------------------------------------------
// Clean
// ------------------------------------------------------------------------------
gulp.task('clean', function () {
    del.sync(path.output.basedir);
});

// ------------------------------------------------------------------------------
// Build
// ------------------------------------------------------------------------------
gulp.task('build', ['clean', 'scripts', 'styles', 'html', 'images'], function () {
});


// ------------------------------------------------------------------------------
// Watch
// ------------------------------------------------------------------------------
gulp.task('watch', function () {
    gulp.watch(path.src.scripts, ['scripts'], browserSync.reload);
    gulp.watch(path.src.styles, ['styles'], browserSync.reload);
    gulp.watch(path.src.html, ['html'], browserSync.reload);
    gulp.watch(path.src.images, ['images'], browserSync.reload);
});


// ------------------------------------------------------------------------------
// Static Server + watching
// ------------------------------------------------------------------------------
gulp.task('serve', ['build', 'watch'], function () {

    browserSync.init({
        server: {
            baseDir: path.output.basedir,
            routes: {
                '/lib': path.lib
            }
        }
    });
});


// ------------------------------------------------------------------------------
// Error Handler
// ------------------------------------------------------------------------------
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

// ------------------------------------------------------------------------------
// Html
// ------------------------------------------------------------------------------
gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(gulp.dest(path.output.basedir))
        .pipe(browserSync.stream());
});

// ------------------------------------------------------------------------------
// Images
// ------------------------------------------------------------------------------
gulp.task('images', function () {
    gulp.src(path.src.images)
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(gulp.dest(path.output.images))
        .pipe(browserSync.stream());
});


// ------------------------------------------------------------------------------
// Scripts
// ------------------------------------------------------------------------------
gulp.task('scripts', function () {
    return gulp.src(path.src.scripts)
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(browserify({
            transform: ['babelify']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write("/map"))
        .pipe(gulp.dest(path.output.basedir))
        .pipe(browserSync.stream());
});


// ------------------------------------------------------------------------------
// Styles
// ------------------------------------------------------------------------------
gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('/map'))
        .pipe(gulp.dest(path.output.basedir))
        .pipe(browserSync.stream());
});

gulp.task('default', ['build']);