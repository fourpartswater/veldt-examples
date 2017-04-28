# veldt-examples

## Dependencies

- [Go](https://golang.org/) version 1.6+ with the `GOPATH` environment variable specified and `$GOPATH/bin` in your `PATH`.
- [NodeJS](http://nodejs.org/) version 6.0+ JavaScript runtime.
- [gulp](http://http://gulpjs.com/) build toolkit (npm install gulp -g).

## Development

Clone the repository:

```bash
mkdir -p $GOPATH/src/github.com/unchartedsoftware
cd $GOPATH/src/github.com/unchartedsoftware
git clone git@github.com:unchartedsoftware/veldt-examples.git
```

Install dependencies

```bash
cd veldt-examples
make install
```

## Usage

Build and start server.

```bash
gulp
```
