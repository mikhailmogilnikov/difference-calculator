install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint

test:
	npx jest

test-coverage:
	npx jest --coverage

link:
	npm link  

gendiff-help:
	node bin/gendiff.js -h
