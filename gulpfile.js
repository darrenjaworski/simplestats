var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('scripts', function() {

  return browserify('./script.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'));

});

gulp.task('serve', function(){

  return browserSync.init({
    server: {
      baseDir: './'
    }
  });

})

gulp.task('watch', function(){
  gulp.watch(['./script.js', './extra_modules/*.js'], ['scripts']);
  gulp.watch(['./bundle.js', './*.html', './*.css']).on('change', browserSync.reload);
})

gulp.task('default', ['scripts', 'serve', 'watch']);
