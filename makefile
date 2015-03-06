s:
	node server/server.js

tf:
	./node_modules/tape/bin/tape \
	    test/frontend/unit/*.js \
	    | ./node_modules/.bin/tap-spec

tfc:
	./node_modules/.bin/istanbul \
	    cover \
	    ./node_modules/tape/bin/tape \
	    test/frontend/unit/*.js \
	    | ./node_modules/.bin/tap-spec

ta:
	./node_modules/protractor/bin/webdriver-manager update && ./node_modules/protractor/bin/protractor ./test/frontend/config/protractor.conf.js --verbose

ts:
	./node_modules/tape/bin/tape \
	    test/api/*.test.js \
	    | ./node_modules/.bin/tap-spec

tsc:
	./node_modules/.bin/istanbul \
	    cover \
	    ./node_modules/tape/bin/tape \
	    test/api/*.test.js \
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
	    -o server/public/js/1.0.0.camdenmaps.min.js \
	    -v

.PHONY: s t dep tf tfc ts tsc c cw b bw
