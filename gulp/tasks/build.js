'use strict';

const gulp = require('gulp');
const run = require('run-sequence');

gulp.task('build', done => {
	run(
		[
			'clean',
			'lint'
		],
		[
			'build-scripts',
			'build-styles',
			'copy-resources'
		],
		done);
});

gulp.task('build-min', done => {
	run(
		[
			'clean',
			'lint'
		],
		[
			'build-scripts-min',
			'build-styles',
			'copy-resources'
		],
		done);
});
