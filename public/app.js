'use strict';

const veldt = require('veldt');

function cartoDBLayer(requestor, pipeline, uri, args) {
	const layer = new veldt.Layer.Rest();
	layer.setPipeline(pipeline);
	layer.setURI(uri);
	layer.setScheme(args.scheme);
	layer.setEndpoint(args.endpoint);
	layer.setExt(args.ext);
	layer.useXYZ();
	layer.setRequestor(requestor);
	return layer;
}

function microLayer(requestor, pipeline, uri, args) {
	const layer = new veldt.Layer.Micro();
	layer.setPipeline(pipeline);
	layer.setURI(uri);
	layer.setLOD(args.lod);
	layer.setHitsCount(args.hitsCount);
	layer.setXField(args.xField);
	layer.setYField(args.yField);
	layer.setBounds(args.left, args.right, args.bottom, args.top);
	layer.setRequestor(requestor);
	const renderer = new veldt.Renderer.WebGL.Micro({
		maxVertices: args.hitsCount,
		radius: args.radius,
		color: args.color
	});
	layer.setRenderer(renderer);
	return layer;
}

function macroLayer(requestor, pipeline, uri, args) {
	const layer = new veldt.Layer.Macro();
	layer.setPipeline(pipeline);
	layer.setURI(uri);
	layer.setLOD(args.lod);
	layer.setResolution(args.resolution);
	layer.setXField(args.xField);
	layer.setYField(args.yField);
	layer.setBounds(args.left, args.right, args.bottom, args.top);
	layer.setRequestor(requestor);
	const renderer = new veldt.Renderer.WebGL.Macro({
		maxVertices: args.resolution * args.resolution,
		radius: args.radius,
		color: args.color
	});
	layer.setRenderer(renderer);
	return layer;
}

function wordcloudLayer(requestor, pipeline, uri, args) {
	const layer = new veldt.Layer.TopTermCount();
	layer.setPipeline(pipeline);
	layer.setURI(uri);
	layer.setTermsCount(args.count);
	layer.setTermsField(args.field);
	layer.setXField(args.xField);
	layer.setYField(args.yField);
	layer.setBounds(args.left, args.right, args.bottom, args.top);
	layer.setRequestor(requestor);
	const renderer = new veldt.Renderer.HTML.WordCloud();
	layer.setRenderer(renderer);
	return layer;
}

window.startApp = function() {

	const requestor = new veldt.TileRequestor('tile', err => {
		// check error
		if (err) {
			console.error(err);
			return;
		}
		const map = new veldt.Map('#map', {
			zoom: 3,
			dirtyChecking: false
		});
		const carto = cartoDBLayer(requestor, 'rest', 'dark_nolabels', {
			scheme: 'http',
			endpoint: 'a.basemaps.cartocdn.com',
			ext: 'png'
		});
		// const micro = microLayer(requestor, 'elastic', 'trump_twitter', {
		// 	xField: 'pixel.x',
		// 	yField: 'pixel.y',
		// 	left: 0,
		// 	right: Math.pow(2, 32),
		// 	bottom: 0,
		// 	top: Math.pow(2, 32),
		// 	radius: 3,
		// 	lod: 4,
		// 	hitsCount: 4048,
		// 	color: [ 0.2, 0.6, 0.2, 0.8 ]
		// });
		const macro = macroLayer(requestor, 'elastic', 'trump_twitter', {
			xField: 'pixel.x',
			yField: 'pixel.y',
			left: 0,
			right: Math.pow(2, 32),
			bottom: 0,
			top: Math.pow(2, 32),
			radius: 3,
			resolution: 256,
			lod: 4
		});
		// const wordcloud = wordcloudLayer(requestor, 'elastic', 'trump_twitter', {
		// 	xField: 'pixel.x',
		// 	yField: 'pixel.y',
		// 	left: 0,
		// 	right: Math.pow(2, 32),
		// 	bottom: 0,
		// 	top: Math.pow(2, 32),
		// 	count: 20,
		// 	field: 'text'
		// });
		map.add(carto);
		map.add(macro);
		//map.add(micro);
		//map.add(wordcloud);
	});

};
