s:
	node server/server.js

t:
	./node_modules/tape/bin/tape test/frontend/unit/*.js | ./node_modules/.bin/tap-spec

ts:
	./node_modules/.bin/istanbul cover ./node_modules/tape/bin/tape test/api/*.test.js | ./node_modules/.bin/tap-spec

tc:
	./node_modules/.bin/istanbul cover test/frontend/unit/*.js | ./node_modules/.bin/tap-spec

dep:
	npm install

.PHONY: s t dep
