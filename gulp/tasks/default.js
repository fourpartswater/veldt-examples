'use strict';

const gulp = require('gulp');
const run = require('run-sequence');

gulp.task('default', done => {
	run(
		['build'],
		['watch'],
		['serve'],
		done);
});
