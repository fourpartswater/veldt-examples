version=0.1.0

.PHONY: all

all:
	@echo "make <cmd>"
	@echo ""
	@echo "commands:"
	@echo "  clean         - clean the dist dir"
	@echo "  build         - build the source code"
	@echo "  fmt           - format the code with gofmt"
	@echo "  lint          - lint the source code"
	@echo "  install       - install dependencies"
	@echo "  run           - run the executable"

clean:
	@rm -rf ./dist

lint:
	@go vet $(shell glide novendor)
	@go list ./... | grep -v /vendor/ | xargs -L1 golint

fmt:
	@go fmt $(shell glide novendor)

build: clean lint
	@./node_modules/.bin/webpack -p
	@go build -o ./dist/server.bin ./main.go

run: build
	@./dist/server.bin

install:
	@npm install -g yarn
	@yarn install
	@go get -u github.com/golang/lint/golint
	@go get -u github.com/Masterminds/glide
	@glide install
