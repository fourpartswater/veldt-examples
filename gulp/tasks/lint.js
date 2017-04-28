'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const paths = require('../paths');

gulp.task('lint', () => {
	return gulp.src(paths.scripts)
		.pipe(eslint())
		.pipe(eslint.format());
});
