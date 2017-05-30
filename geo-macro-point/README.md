# Veldt Geographic Basemap and Macro Point Example

## Dependencies

- [Go](https://golang.org/) version 1.6+ with the `GOPATH` environment variable specified and `$GOPATH/bin` in your `PATH`.
- [NodeJS](http://nodejs.org/) version 6.0+ JavaScript runtime.

## Installation

Install all [Go](https://golang.org/) and [NodeJS](http://nodejs.org/) dependencies and tools:

```bash
make install
```

## Usage

Build the application:

```bash
make build
```

Start redis:

```bash
redis-server /path/to/redis.conf
```

Run the server:

```bash
make run
```
