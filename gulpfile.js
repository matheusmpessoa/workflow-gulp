var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var files = [
	'./assets/dev/sass/**/*.scss',
	'./assets/dev/js/*.js',
	'./*.php'
];

gulp.task('browser-sync', function () {
	//watch files
	
	//initialize browsersync
	browserSync.init(files, {
		//browsersync with a php server
		proxy: "192.168.1.66/matheus/workflow-gulp",
		notify: false
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('images', function () {
	gulp.src('./assets/dev/images/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('./assets/dist/images/'));
});

gulp.task('styles', function () {
	gulp.src(['./assets/dev/sass/main.scss'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('./assets/dist/css/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
	gulp.src('./assets/dev/js/app.js')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/dist/js/'))
		

	gulp.src('./assets/dev/js/plugins.min.js')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/dist/js/'))
});

gulp.task('default',['browser-sync'], function () {
	gulp.watch("./assets/dev/sass/**/*.scss", ['styles']);
	gulp.watch('./assets/dev/js/*.js', ['scripts']);
	gulp.watch(files, ['bs-reload', 'images']);
});