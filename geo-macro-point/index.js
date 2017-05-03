'use strict';

import veldt from 'veldt';
import 'veldt/build/veldt.css';
import '../assets/styles/main.css';

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

const requestor = new veldt.Requestor('tile', err => {
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
    map.add(carto);
    map.add(macro);
});
