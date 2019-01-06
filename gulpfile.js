var closureCompiler = require('google-closure-compiler').gulp();
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var gutil = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var addsrc = require('gulp-add-src');
var babel = require('gulp-babel');

const jsSources = [
    'src/js/admob.js',
    'src/js/browser.js',
    'src/js/util.js',
    'src/js/trend.js',
    'src/js/bar.js',
    'src/js/donut.js',
    'src/js/splitter.js',
    'src/js/trend-options.js',
    'src/js/localization.js',
    'src/js/pwa-history.js',
    'src/js/data.js',
    'src/js/main.js',
];

const jsLibs = [
    'src/js/lib/onsenui.min.js',
    'src/js/lib/timeago.min.js',
    'src/js/lib/timeago.locales.min.js',
    'src/js/lib/chartist.min.js',
    'src/js/lib/chartist-plugin-tooltip.min.js',
    'src/js/lib/chartist-plugin-accessibility.min.js',
    'src/js/lib/chartist-plugin-fill-donut.min.js'
];

const cssSources = [
    'src/css/style.css',
];

const cssLibs = [
    'src/css/lib/onsen/css/onsenui.min.css',
    'src/css/lib/onsen/css/onsen-css-components.min.css',
    'src/css/lib/chartist.min.css',
    'src/css/lib/chartist-plugin-tooltip.css'
];

gulp.task('default', ['js', 'css']);

gulp.task('js', () => {
    return gulp.src(jsSources, { base: './' })
        .on('error', gutil.log)
        .pipe(addsrc.prepend(jsLibs))
        .on('error', gutil.log)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/js'));
});

gulp.task('css', () => {
    return gulp.src(cssSources, { base: './' })
        .pipe(sourcemaps.init())
        .pipe(postcss([require('autoprefixer'), require('cssnano')({
            normalizeUrl: false
        })]))
        .pipe(addsrc.prepend(cssLibs))
        .on('error', gutil.log)
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/css'));
});

gulp.task('js-prod', () => {
    return gulp.src(jsSources, { base: './' })
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(addsrc.prepend(jsLibs))
        .on('error', gutil.log)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/js'));
});

gulp.task('css-prod', () => {
    return gulp.src(cssSources, { base: './' })
        .pipe(concat('style.min.css'))
        .pipe(postcss([require('autoprefixer'), require('cssnano')]))
        .pipe(addsrc.prepend(cssLibs))
        .on('error', gutil.log)
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('www/css'));
});

gulp.task('transpile', ['js-prod', 'css-prod']);

gulp.task('watch', () => {
    return gulp.watch('./src/**/*', ['js', 'css']);
});

