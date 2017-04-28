'use strict';

const gulp = require('gulp');
const server = require('./server');
const paths = require('../paths');

const watchGo = function() {
	gulp.watch(paths.go).on('change', () => {
		server.restart();
	});
};

const watchScripts = function() {
	gulp.watch(paths.scripts, ['build-scripts']);
};

const watchStyles = function() {
	gulp.watch(paths.styles, ['build-styles']);
};

const watchResources = function() {
	gulp.watch(paths.resources, ['copy-resources']);
};

gulp.task('watch', () => {
	// go
	watchGo();
	// js
	watchScripts();
	// css
	watchStyles();
	// resources
	watchResources();
});
