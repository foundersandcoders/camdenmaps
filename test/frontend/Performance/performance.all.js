var PerfRunner,
	Config,
	homeUrl,
	camdenServices,
	communityService,
	lunchClub,
	input,
	searchButton,
	listResults,
	baseUrl;



PerfRunner = require("./index.js");
Config = require('../config.js');
homeUrl = Config.path.home;
camdenServices = button.element(by.tagName('h4'));
communityService = categoriesRepeater.get(0);
lunchClub = element.all(by.repeater('service in services')).get(0);
input = element(by.tagName('input'));
searchButton = element.all(by.tagName('button')).get(0);
listResults = element.all(by.repeater('result in results'));
baseUrl = Config.path.main;

						

(function (){
	"use strict";

	function performanceTest (){
		afterEach(function(){
			browser.executeScript('window.localStorage.clear();');
		});

		describe("user should use camden maps", function(){

			var perfRunner = PerfRunner(browser.params.perf);

			it("to find services ", function() {
				perfRunner.start();

				browser.get(homeUrl);
				camdenServices.click();
				communityService.click();
				lunchClub.click();
				input.sendKeys("NW1 ONE");
				searchButton.click();
				listResults.get(0).click();

				browser.getCurrentUrl().then(function (url) {
					expect(url).toEqual(baseUrl + "services/lunch club/location/nw1 0ne");
	            });

				perfRunner.stop().then(function(data) {
					console.log(data);
				});


			});
					

			// it("to find information about their neighbourhood ")

			// })		

			// it("to find information on streetworks ")

			// })
		});
	}

}());