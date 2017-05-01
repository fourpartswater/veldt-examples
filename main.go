package main

import (
	"net/http"
	"runtime"
	"syscall"

	"github.com/unchartedsoftware/plog"
	"github.com/unchartedsoftware/veldt"
	"github.com/unchartedsoftware/veldt/generation/elastic"
	"github.com/unchartedsoftware/veldt/generation/rest"
	"github.com/unchartedsoftware/veldt/store/redis"
	"github.com/zenazn/goji/graceful"

	"github.com/unchartedsoftware/veldt-examples/api"
)

const (
	publicDir = "./build/public"
	port      = "8080"
	esHost    = "http://10.64.16.120"
	esPort    = "9200"
	redisHost = "localhost"
	redisPort = "6379"
)

// NewElasticPipeline instantiates a new elasticsearch pipeline.
func NewElasticPipeline() *veldt.Pipeline {
	// Create pipeline
	pipeline := veldt.NewPipeline()
	// Add boolean expression types
	pipeline.Binary(elastic.NewBinaryExpression)
	pipeline.Unary(elastic.NewUnaryExpression)
	// Add query types to the pipeline
	pipeline.Query("exists", elastic.NewExists)
	pipeline.Query("has", elastic.NewHas)
	pipeline.Query("equals", elastic.NewEquals)
	pipeline.Query("range", elastic.NewRange)
	// Add tiles types to the pipeline
	pipeline.Tile("macro", elastic.NewMacroTile(esHost, esPort))
	pipeline.Tile("micro", elastic.NewMicroTile(esHost, esPort))
	pipeline.Tile("top-term-count", elastic.NewTopTermCountTile(esHost, esPort))
	// Set the maximum concurrent tile requests
	pipeline.SetMaxConcurrent(32)
	// Set the tile requests queue length
	pipeline.SetQueueLength(1024)
	// Add meta types to the pipeline
	pipeline.Meta("default", elastic.NewDefaultMeta(esHost, esPort))
	// Add a store to the pipeline
	pipeline.Store(redis.NewStore(redisHost, redisPort, -1))
	return pipeline
}

// NewRESTPipeline instantiates a new REST pipeline.
func NewRESTPipeline() *veldt.Pipeline {
	// Create pipeline
	pipeline := veldt.NewPipeline()
	// Add tiles types to the pipeline
	pipeline.Tile("rest", rest.NewTile())
	// Set the maximum concurrent tile requests
	pipeline.SetMaxConcurrent(256)
	// Set the tile requests queue length
	pipeline.SetQueueLength(1024)
	// Add a store to the pipeline
	pipeline.Store(redis.NewStore(redisHost, redisPort, -1))
	return pipeline
}

func NewMux() http.Handler {
	// create veldt-api mux
	mux := api.NewMux()
	// add static serving route
	mux.Get("/*", http.FileServer(http.Dir(publicDir)))
	return mux
}

func main() {
	// sets the maximum number of CPUs that can be executing simultaneously
	runtime.GOMAXPROCS(runtime.NumCPU())
	// register the pipelines
	veldt.Register("elastic", NewElasticPipeline())
	veldt.Register("rest", NewRESTPipeline())
	// create server
	mux := NewMux()
	// catch kill signals for graceful shutdown
	graceful.AddSignal(syscall.SIGINT, syscall.SIGTERM)
	// start server
	log.Infof("veldt server listening on port %s", port)
	err := graceful.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Error(err)
	}
	// wait until server gracefully exits
	graceful.Wait()
}
