const gulp = require("gulp");
const watch = require("gulp-watch");
const prefiexer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require("gulp-sourcemaps");
const cssMin = require("gulp-minify-css");
const rimRaf = require("rimraf");
const browserSync = require("browser-sync");
const rigger = require("gulp-rigger");
const reload = browserSync.reload;



const path = {
    build: {
        html: './dist',
        js: './dist/js/',
        css: './dist/css/',
        icons: './dist/icons/'
    },
    src: {
        html: './src/*.html',
        js: './src/js/*.js',
        style: './src/sass/style.scss',
        icons: './src/icons/**/*.png'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/*.js',
        style: './src/sass/**/*.scss',
        icons: './src/icons/**/*.png'
    },
    clean: './dist'
};


gulp.task("webserver", function () {
    browserSync({
        server: {
            baseDir: "./dist"
        },
        host: 'localhost',
        port: 3000,
    });
});


gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task("js:build", function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task("style:build", function () {
    return gulp.src(path.src.style)
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(prefiexer())
        .pipe(cssMin())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('icons:build', function () {
    return gulp.src(path.src.icons)
        .pipe(gulp.dest(path.build.icons)); // выгрузка готовых файлов
});

gulp.task("watch", function () {
    gulp.watch(path.watch.html, gulp.parallel("html:build"));
    gulp.watch(path.watch.style, gulp.parallel("style:build"));
    gulp.watch(path.watch.js, gulp.parallel("js:build"));
    gulp.watch(path.watch.icons, gulp.parallel("icons:build"));
});

gulp.task("rimraf", function (callback) {
    rimRaf(path.clean, callback);
});

gulp.task("build", gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'icons:build',
));


gulp.task('default', gulp.parallel('build', 'webserver', 'watch', 'icons:build'));