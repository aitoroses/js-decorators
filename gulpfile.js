var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("lib/compiler.js")
    .pipe(gulp.dest("build/es6"))
    .pipe(babel())
    .pipe(gulp.dest("build/es5"));
});
