INPUT = ./server/public/css/main.scss
OUTPUT = ./server/public/css/stylesheet.css

sass-watch:
	sass --watch \
	$(INPUT):$(OUTPUT) \
	--style expanded \

sass-production:
	sass --update \
	$(INPUT):$(OUTPUT) \
	--style compressed \

.PHONY: sass-watch sass-production
