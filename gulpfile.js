var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  browserify = require('gulp-browserify'),
  rename = require('gulp-rename');

gulp.task('scripts', function() {
  gulp.src('script.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
})

gulp.task('watch', function(){
  gulp.watch('./script.js', ['scripts']);
  gulp.watch(['./bundle.js', './*.html']).on('change', browserSync.reload);
})

gulp.task('default', ['scripts', 'serve', 'watch']);
