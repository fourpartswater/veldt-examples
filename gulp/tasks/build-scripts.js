'use strict';

const babel = require('babelify');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const paths = require('../paths');

const build = function(dist) {
	const bundler = browserify(paths.webapp, {
		debug: !dist,
		standalone: paths.project
	});
	if (dist) {
		// babelify
		bundler.transform(babel, {
			global: true,
			compact: true,
			presets: [ 'es2015' ]
		});
	}
	return bundler
		.bundle()
		.on('error', function(err) {
			if (err instanceof SyntaxError) {
				console.error('Syntax Error:');
				console.error(err.message);
				console.error(err.codeFrame);
			} else {
				console.error(err.message);
			}
			this.emit('end');
		})
		.pipe(source(`${paths.project}.js`))
		.pipe(gulp.dest(paths.output));
};

gulp.task('build-scripts', function() {
	return build(false);
});

gulp.task('build-scripts-min', function() {
	return build(true);
});
