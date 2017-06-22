'use strict';

import veldt from 'veldt';
import 'veldt/build/veldt.css';
import '../assets/styles/main.css';

// WebSocket endpoint for initiating tiling request
const WS_ENDPOINT = 'ws/tile';

// HTTP endpoint for pulling the finished tile.
const HTTP_ENDPOINT = 'tile';

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
        radius: args.radius,
        color: args.color
    });
    layer.setRenderer(renderer);
    return layer;
}

// Open WebSocket connection for requesting tiles.
const requestor = new veldt.Requestor(WS_ENDPOINT, HTTP_ENDPOINT, err => {
    if (err) {
        console.error(err);
        return;
    }
    // Create map
    const map = new veldt.Map('#map', {
        zoom: 5,
        center: {
            x: 0.23,
            y: 0.62
        }
    });
    // Create CARTO base layer
    const carto = cartoDBLayer(requestor, 'rest', 'dark_nolabels', {
        scheme: 'http',
        endpoint: 'a.basemaps.cartocdn.com',
        ext: 'png'
    });
    // Create macro point layer
    const macro = macroLayer(requestor, 'elastic', 'veldt_example', {
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
