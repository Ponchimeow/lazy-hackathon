const gulp = require('gulp'),
  gulpImagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  plumber = require('gulp-plumber'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  minHTML = require('gulp-htmlmin'),
  responsive = require('gulp-responsive');

gulp.task('image', (done) => {
  gulp.src('./image/**')
    .pipe(plumber())
    .pipe(responsive({
      'bg_header.png': {
        width: '40%',
        quality: 50
      },
      'bg_*.png': {
        width: '40%',
        quality: 50
      },
      'bg_*.jpg': {
        width: '40%',
        quality: 50
      },
      'icon-community.png': {
        width: 80,
        quality: 50
      },
      'icon-member.png': {
        width: 300,
        quality: 50
      },
      'judge_*.jpg': {
        width: '30%',
        quality: 50
      },
      'judge_*_l.jpg': {
        width: '40%',
        quality: 50
      },
      'team_*.jpg': {
        width: 500,
        quality: 50
      },
      'logo_nav.png': {
        quality: 50
      },
      'title.png': {
        width: 120,
        quality: 50
      },
      'add-circular-outlined-button.png': {
        width: 30,
        quality: 50
      }
    }))
    .pipe(gulpImagemin())
    .pipe(webp())
    .pipe(gulp.dest('./dist/image'));
  done();
});

gulp.task('minHTML', () => {
  return gulp.src('./*.html')
    .pipe(minHTML({ 
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('./dist/'));
})

gulp.task('uglify', gulp.series(() => {
  return gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(uglify({
      mangle: true,
      output: { ascii_only: true }
    }))
    .pipe(rename((path) => {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./dist/js/'));
}));

gulp.task('concatCSS', () => {
  return gulp.src('./css/*.css')
    .pipe(plumber())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css/'));
})

gulp.task('minify-css', gulp.series('concatCSS', () => {
  return gulp.src('./dist/css/all.css')
    .pipe(plumber())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename(
      (path) => {
        path.basename += ".min";
        path.extname = ".css";
      }))
    .pipe(gulp.dest('./dist/css/'));
}));

gulp.task('default', gulp.series('minHTML', 'image', 'minify-css', 'uglify'));