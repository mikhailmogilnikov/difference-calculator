install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test --coverage --coverageProvider=v8

link:
	npm link  

gendiff-help:
	node bin/gendiff.js -h
