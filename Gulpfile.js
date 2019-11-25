const del = require("del");
const gulp = require("gulp");
const mocha = require("gulp-mocha");
const jshint = require("gulp-jshint");

function cleanJsDoc() {
    return del(["./documentation/out"]);
};

function justTest(){
    return gulp.src('./test/**/*_tests.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: "dot"}));
}

function runJshint() {
    return gulp.src("./lib/**")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
};

exports.cleanJsDoc = cleanJsDoc;
exports.unittest = justTest;
exports.runJshint = runJshint;
exports.build = runJshint;
exports.default = exports.build;
exports.test = exports.unittest;
exports.dev = gulp.series(exports.build, justTest);
