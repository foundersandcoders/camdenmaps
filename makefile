INPUT = ./server/public/css/main.scss
OUTPUT = ./server/public/css/main.css

sass-watch:
	sass --watch \
	$(INPUT):$(OUTPUT) \
	--style expanded \

sass-production:
	sass --update \
	$(INPUT):$(OUTPUT) \
	--style compressed \

.PHONY-sass: sass-watch sass-production

lab-test:
	@node node_modules/lab/bin/lab test/api/test.js

lab-test-cov:
	@node node_modules/lab/bin/lab -t 100 test/api/test.js

lab-test-cov-html:
	@node node_modules/lab/bin/lab -r html -o coverage.html test/api/test.js

.PHONY-lab: test test-cov test-cov-html test/api/test.js

protractor-test:
	@node node_modules/protractor/bin/protractor test/frontend/acceptance/test.js