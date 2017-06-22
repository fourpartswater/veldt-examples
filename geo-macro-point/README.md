# Veldt Geographic Basemap and Macro Point Example

<img width="600" align="middle" src="https://rawgit.com/unchartedsoftware/veldt-examples/master/geo-macro-point/screenshot.png" alt="screenshot" />

## Dependencies

- [Go](https://golang.org/) version 1.6+ with the `GOPATH` environment variable specified and `$GOPATH/bin` in your `PATH`.
- [NodeJS](http://nodejs.org/) version 6.0+ JavaScript runtime.
- [Docker](https://www.docker.com/)

## Installation

Install all [Go](https://golang.org/) and [NodeJS](http://nodejs.org/) dependencies and tools:

```bash
make install
```

## Usage

Pull the docker image containing the redis and elasticsearch instances:

```bash
docker pull docker.uncharted.software/veldt_example:0.1
```

Run the docker container:

```bash
docker run \
    --user elasticsearch \
    --rm \
    --name veldt_example \
    -p 9200:9200 \
    -p 6379:6379 \
    docker.uncharted.software/veldt_example:0.1
```

Build the application and run the server:

```bash
make run
```
