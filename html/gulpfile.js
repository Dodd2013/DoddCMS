var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// Load plugins
var $ = require('gulp-load-plugins')();
/* es6 */
gulp.task('es6', function() {

	return gulp.src('jssrc/**/*.js')
		.pipe($.plumber())
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('js/'))
		.pipe(uglify())
		.pipe(gulp.dest('jsmin/'));
});
// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch', ['es6'], function() {
	browserSync.reload();
});
// 监视文件改动并重新载入
gulp.task('serve', ['es6'], function() {
	browserSync.init({
		browser: "chrome",
		port: 80,
		server: {
			baseDir: './'
		}
	});
	 gulp.watch('jssrc/**/*.js', ['js-watch']);
	 gulp.watch(['**/*.html','**/*.css','assets/**/*.*']).on("change",function() {
	 	browserSync.reload();
	 });
});
gulp.task('default', ['serve']);