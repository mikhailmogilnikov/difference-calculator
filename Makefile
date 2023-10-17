install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint

link:
	npm link  

gendiff:
	node bin/gendiff.js -h
