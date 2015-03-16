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

		var perf = new ProtractorPerf(protractor, browser);

		it("to find services ", function() {
			browser.get(Config.path.home);

			perf.start();

			camdenServices.click();
			communityService.click();
			lunchClub.click();
			input.sendKeys("NW1 0NE");
			searchButton.click();
			listResults.get(0).click();			

			perf.stop().then(function(data) {
				console.log(data);
			});

			browser.getCurrentUrl().then(function (url) {
				expect(url).toEqual(baseUrl + "#/home/Lunch%20club/location/NW1%200NE");
            });


		});
				

		// it("to find information about their neighbourhood ")

		// })		

		// it("to find information on streetworks ")

		// })
	});

}());