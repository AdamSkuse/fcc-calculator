var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();
	
gulp.task('default', function() {
  		console.log("default task");
	});

gulp.task('styles', function() {
  return gulp.src('app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('app/temp/styles'));
});

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/scripts/App.js', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('app/temp/styles/**/*.css')
    .pipe(browserSync.stream());
});

