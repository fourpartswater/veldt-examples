'use strict';

const PUBLIC = './public';

module.exports = {
	public: PUBLIC,
	project: 'veldt-app',
	server: 'main.go',
	webapp: `${PUBLIC}/app.js`,
	scripts: [
		`${PUBLIC}/*.js`,
	],
	styles: [
		`${PUBLIC}/*.css`
	],
	index: [
		`${PUBLIC}/index.html`
	],
	resources: [
		`${PUBLIC}/index.html`,
		`${PUBLIC}/favicons/*`,
		`${PUBLIC}/images/*`
	],
	go: [
		'./main.go',
		'./api/**/*.go'
	],
	output: './build/public'
};
