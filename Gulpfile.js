var gulp = require("gulp");
var jshint = require("gulp-jshint");

function justTest(){
    return gulp.src('./test/**/*_tests.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: "dot"}));
}

var mocha = require('gulp-mocha');
gulp.task('unittest', justTest);

gulp.task("clean-jsdoc",function(){
    return del(["./documentation/out"]);
});

gulp.task('jshint', function() {
    return gulp.src("./lib/**")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task("build",["jshint"]);

gulp.task("default", ["build"]);

gulp.task("test", ["unittest"]);
gulp.task("dev", ["build"], justTest);