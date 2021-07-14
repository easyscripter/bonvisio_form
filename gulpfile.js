const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

gulp.task("server", () => {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });
});

// Static server
// gulp.task('server', function() {
//     browserSync.init({
//         server: {
//             baseDir: "src"
//         }
//     });
// });

gulp.task("styles", function () {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(
            rename({
                prefix: "",
                suffix: ".min",
            })
        )
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
    return gulp.src("src/js/**/*.+(js)").pipe(gulp.dest("dist/js"));
});

gulp.task("html", function () {
    return gulp.src("src/*.html").pipe(gulp.dest("dist/"));
});

gulp.task("icons", function () {
    return gulp.src("src/icons/**/*.+(png|svg)").pipe(gulp.dest("dist/icons"));
});

gulp.task("watch", function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("dist/*.html").on("change", browserSync.reload);
    gulp.watch("dist/js/script.js").on("change", browserSync.reload);
});

gulp.task("build", gulp.parallel("styles", "scripts", "html", "icons"));
gulp.task("dev", gulp.parallel("scripts", "styles", "html", "icons", "watch", "server"));
