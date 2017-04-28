package api

import (
	"github.com/unchartedsoftware/plog"
	"github.com/unchartedsoftware/veldt-api/http"
	"github.com/unchartedsoftware/veldt-api/middleware"
	"github.com/unchartedsoftware/veldt-api/ws"
	"github.com/zenazn/goji/web"
)

// New returns a new Goji Mux handler to process HTTP requests.
func NewMux() *web.Mux {
	mux := web.New()
	// mount logger middleware
	mux.Use(middleware.Log)
	// mount gzip middleware
	mux.Use(middleware.Gzip)
	// meta websocket handler
	log.Infof("Meta WebSocket route: '%s'", ws.MetaRoute)
	mux.Get(ws.MetaRoute, ws.MetaHandler)
	// tile websocket handler
	log.Infof("Tile WebSocket route: '%s'", ws.TileRoute)
	mux.Get(ws.TileRoute, ws.TileHandler)
	// metadata request handler
	log.Infof("Meta HTTP route: '%s'", http.MetaRoute)
	mux.Post(http.MetaRoute, http.MetaHandler)
	// tile request handler
	log.Infof("Tile HTTP route: '%s'", http.TileRoute)
	mux.Post(http.TileRoute, http.TileHandler)
	return mux
}
