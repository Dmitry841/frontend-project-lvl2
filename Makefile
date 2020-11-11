install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
nodeV:
	node -v
test:
	npx -n --experimental-vm-modules jest --watch
test-coverage:
	npm test -- --coverage --coverageProvider=v8