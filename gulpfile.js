const gulp = require('gulp'),
  gulpImagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  plumber = require('gulp-plumber'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  minHTML = require('gulp-htmlmin');

gulp.task('image', (done) => {
  gulp.src('./image/**')
    .pipe(plumber())
    .pipe(gulpImagemin())
    .pipe(webp())
    .pipe(gulp.dest('./build/image'));
  done();
});

gulp.task('minHTML', () => {
  return gulp.src('./*.html')
    .pipe(minHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build/'));
})

gulp.task('concatJS', () => {
  return gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build/js/'));
})

gulp.task('uglify', gulp.series('concatJS', () => {
  return gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(uglify({
      mangle: true,
      output: { ascii_only: true }
    }))
    .pipe(rename(function (path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./build/js/'));
}));

gulp.task('concatCSS', () => {
  return gulp.src('./css/*.css')
    .pipe(plumber())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css/'));
})

gulp.task('minify-css', gulp.series('concatCSS', () => {
  return gulp.src('./build/css/all.css')
    .pipe(plumber())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename(
      (path) => {
        path.basename += ".min";
        path.extname = ".css";
      }))
    .pipe(gulp.dest('./build/css/'));
}));

gulp.task('default', gulp.series('minHTML', 'image', 'minify-css', 'uglify'));