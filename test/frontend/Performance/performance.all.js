var ProtractorPerf,
	Config,
	homeUrl,
	buttons,
	camdenServices,
	categoriesRepeater,
	communityService,
	lunchClub,
	input,
	searchButton,
	listResults,
	baseUrl;



ProtractorPerf = require('protractor-perf');
Config = require('../acceptance/config.js');
homeUrl = Config.path.home;
button = element.all(by.repeater('button in buttons')).get(0);
camdenServices = button.element(by.tagName('h4'));
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
communityService = categoriesRepeater.get(0);
lunchClub = element.all(by.repeater('service in services')).get(0);
input = element(by.tagName('input'));
searchButton = element.all(by.tagName('button')).get(0);
listResults = element.all(by.repeater('result in results'));
baseUrl = Config.path.main;

						

(function (){
	"use strict";

	describe("user should use camden maps", function(){

	browser.get(Config.path.home);


		var perf = new ProtractorPerf(protractor, browser);

		it("to find services ", function() {
			perf.start();

			camdenServices.click();
			communityService.click();
			lunchClub.click();
			input.sendKeys("NW1 ONE");
			searchButton.click();
			listResults.get(0).click();

			browser.getCurrentUrl().then(function (url) {
				expect(url).toEqual(baseUrl + "services/lunch club/location/nw1 0ne");
            });

			perf.stop().then(function(data) {
				console.log(data);
			});


		});
				

		// it("to find information about their neighbourhood ")

		// })		

		// it("to find information on streetworks ")

		// })
	});

}());