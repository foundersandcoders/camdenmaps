s:
	./node_modules/nodemon/bin/nodemon server/server.js

t:
	./node_modules/tape/bin/tape test/frontend/unit/*.js | ./node_modules/.bin/tap-spec

dep:
	npm install

.PHONY: s t dep
