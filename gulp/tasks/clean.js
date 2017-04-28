'use strict';

const del = require('del');
const gulp = require('gulp');
const paths = require('../paths');

gulp.task('clean', function () {
	del.sync(paths.output);
});
