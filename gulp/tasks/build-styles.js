'use strict';

const _ = require('lodash');
const concat = require('gulp-concat');
const csso = require('gulp-csso'); // CSS minification
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');

const readPackageJSON = function(dir) {
	return JSON.parse(fs.readFileSync(path.join(dir, 'package.json')));
};

const parseStyleTree = function(dir = '.', styles = {}, depth = 0) {
	// load package.json, if it exists
	let json;
	try {
		json = readPackageJSON(dir);
	} catch(e) {
		return styles;
	}
	if (dir === '.' || json.style) {
		// if root, or has a style tag
		const id = `${json.name}:${json.version}`;
		const node = {
			id: id,
			depth: depth,
			style: null
		};
		if (json.style) {
			// add style
			node.style = path.join(dir, json.style);
		}
		// add to styles
		styles[id] = node;
		// for each dependency
		_.forIn(json.dependencies, (version, dependency) => {
			// check if the dependency is nested, this occurs due to version
			// collisions
			const nestedDir = path.join(dir, 'node_modules', dependency);
			let dependencyDir = null;
			if (fs.existsSync(nestedDir)) {
				// search nested node_modules
				dependencyDir = path.join(dir, 'node_modules', dependency);
			} else {
				// search root node_modules
				dependencyDir = path.join('node_modules', dependency);
			}
			// recurse
			styles = parseStyleTree(dependencyDir, styles, depth + 1);
		});
	}
	return styles;
};

const getPackageStyles = function() {
	const tree = parseStyleTree();
	return _.map(tree, node => {
		return {
			style: node.style,
			depth: node.depth
		};
	}).sort((a, b) => {
		return b.depth - a.depth;
	}).filter(node => {
		return !!node.style;
	}).map(node => {
		return node.style;
	});
};

gulp.task('build-styles', () => {
	// get all style files inside our package.json
	let styles = getPackageStyles();
	// append project scope styles last to override
	styles = styles.concat(paths.styles);
	// bundle them
	return gulp.src(styles)
		.pipe(csso())
		.pipe(concat(`${paths.project}.css`))
		.pipe(gulp.dest(paths.output));
});
