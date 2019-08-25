install:
	npm install
start: 
	rm -rf dist
	npm publish --dry-run
	npm link
build:
	rm -rf dist
	npm run build
test:
	npm test
lint:
	npx eslint .