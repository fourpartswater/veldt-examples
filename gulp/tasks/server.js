'use strict';

const gulp = require('gulp');
const gulpgo = require('gulp-go');
const paths = require('../paths');

let go;
gulp.task('serve', () => {
	go = gulpgo.run(paths.server, [], {
		stdio: 'inherit'
	});
});

module.exports = {
	restart: function() {
		if (go) {
			go.restart();
		}
	}
};
