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

b:
	./node_modules/.bin/browserify \
	    server/angular/app.js \
	    -o server/public/js/1.0.0.camdenmaps.min.js

bw:
	./node_modules/.bin/watchify \
	    server/angular/app.js \
	    -o server/public/js/1.0.0.camdenmaps.min.js

.PHONY: s t dep
