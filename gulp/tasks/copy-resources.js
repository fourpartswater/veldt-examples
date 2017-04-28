'use strict';

const gulp = require('gulp');
const paths = require('../paths');

gulp.task('copy-resources', function() {
	return gulp.src(paths.resources, {
			base: paths.public
		})
		.pipe(gulp.dest(paths.output));
});
