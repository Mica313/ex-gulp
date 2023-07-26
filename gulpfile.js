const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gul-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

function compJS(){
    return gulp.src('./source/scripts')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}
function compSASS(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}
function compIMG(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}
exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compJS));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(compSASS));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(compIMG));
}