s:
	node server/server.js

t:
	./node_modules/tape/bin/tape \
	    test/frontend/unit/*.js \
	    | ./node_modules/.bin/tap-spec

tc:
	./node_modules/.bin/istanbul \
	    cover \
	    test/frontend/unit/*.js \
	    | ./node_modules/.bin/tap-spec

c:
	./node_modules/node-sass/bin/node-sass \
	    server/public/css/main.scss \
	    server/public/css/main.css

cw:
	./node_modules/node-sass/bin/node-sass \
	    --watch \
	    server/public/css/main.scss \
	    server/public/css/main.css

dep:
	npm install

.PHONY: s t dep
