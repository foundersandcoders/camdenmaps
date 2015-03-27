// DATA RETURNS: 
// neighbourhood { numAnimationFrames: 427,
//   numFramesSentToScreen: 427,
//   droppedFrameCount: 73,
//   meanFrameTime: 18.810390186929652,
//   framesPerSec_raf: 53.16210828496515,
//   fetchStart: 1426696532734,
//   redirectStart: 0,
//   domComplete: 1426696532904,
//   redirectEnd: 0,
//   loadEventStart: 1426696532904,
//   navigationStart: 1426696532734,
//   requestStart: 1426696532735,
//   responseEnd: 1426696532739,
//   secureConnectionStart: 0,
//   domLoading: 1426696532743,
//   domInteractive: 1426696532896,
//   domainLookupEnd: 1426696532734,
//   domContentLoadedEventStart: 1426696532896,
//   loadEventEnd: 1426696532904,
//   connectEnd: 1426696532734,
//   responseStart: 1426696532738,
//   unloadEventStart: 0,
//   domContentLoadedEventEnd: 1426696532902,
//   connectStart: 1426696532734,
//   unloadEventEnd: 0,
//   domainLookupStart: 1426696532734,
//   firstPaint: 170.780897140503,
//   Layers: 24,
//   PaintedArea_total: 15399566,
//   PaintedArea_avg: 124190.04838709677,
//   NodePerLayout_avg: 223.25,
//   ExpensivePaints: 0,
//   GCInsideAnimation: 0,
//   ExpensiveEventHandlers: 2,
//   Program: 2740.59699973464,
//   Program_avg: 0.44167558416351976,
//   Program_max: 142.90200001001358,
//   Program_count: 6205,
//   TimerFire: 23.481000006198883,
//   TimerFire_avg: 0.4193035715392658,
//   TimerFire_max: 3.810000002384186,
//   TimerFire_count: 56,
//   FunctionCall: 1337.9669991731644,
//   FunctionCall_avg: 1.2646190918460911,
//   FunctionCall_max: 99.82600000500679,
//   FunctionCall_count: 1058,
//   FireAnimationFrame: 143.17599987983704,
//   FireAnimationFrame_avg: 0.2075014491012131,
//   FireAnimationFrame_max: 3.647000014781952,
//   FireAnimationFrame_count: 690,
//   Layout: 207.03199988603592,
//   Layout_avg: 1.7847586197072063,
//   Layout_max: 122.70999997854233,
//   Layout_count: 116,
//   UpdateLayerTree: 130.08200016617775,
//   UpdateLayerTree_avg: 0.1702643981232693,
//   UpdateLayerTree_max: 3.4159999787807465,
//   UpdateLayerTree_count: 764,
//   Paint: 44.06800001859665,
//   Paint_avg: 0.35538709692416653,
//   Paint_max: 3.0270000100135803,
//   Paint_count: 124,
//   CompositeLayers: 76.4879994392395,
//   CompositeLayers_avg: 0.11416119319289478,
//   CompositeLayers_max: 2.5929999947547913,
//   CompositeLayers_count: 670,
//   DecodeImage: 13.388999819755554,
//   DecodeImage_avg: 0.39379411234575157,
//   DecodeImage_max: 1.4210000038146973,
//   DecodeImage_count: 34,
//   EventDispatch: 183.29800009727478,
//   EventDispatch_avg: 1.8329800009727477,
//   EventDispatch_max: 25.198000013828278,
//   EventDispatch_count: 100,
//   RecalculateStyles: 120.76199999451637,
//   RecalculateStyles_avg: 0.4267208480371603,
//   RecalculateStyles_max: 19.840999990701675,
//   RecalculateStyles_count: 283,
//   XHRLoad: 716.966000020504,
//   XHRLoad_avg: 26.554296297055703,
//   XHRLoad_max: 99.891999989748,
//   XHRLoad_count: 27,
//   ParseHTML: 41.90700000524521,
//   ParseHTML_avg: 0.07731918820155942,
//   ParseHTML_max: 1.7319999933242798,
//   ParseHTML_count: 542,
//   GCEvent: 40.452999979257584,
//   GCEvent_avg: 8.090599995851516,
//   GCEvent_max: 14.74499997496605,
//   GCEvent_count: 5 }

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
	baseUrl,
	neighbourhood,
	streetworks;



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
neighbourhood = neighbourhood = element.all(by.repeater('button in buttons')).get(1);
streetworks = streetworks = element.all(by.repeater('button in buttons')).get(2);

function metrics(Program, domContentLoadedEventEnd, domContentLoadedEventStart){
	var program = "The total time for all actions to render the page: " + Program + "ms",
		domContent = "Time for DOMContentLoaded event to complete: " + (domContentLoadedEventEnd - domContentLoadedEventStart) + "ms";

		//add any additional metrics required here
	var information = [program, domContent]; 
	return information;
}
						
(function (){
	"use strict";

	describe("user should use camden maps", function(){

		var perf = new ProtractorPerf(protractor, browser);

		beforeEach(function(){
			browser.get(Config.path.home);
		});

		afterEach(function () {
		    browser.executeScript('window.localStorage.clear();');
		});

		it("to find services ", function() {
			

			perf.start();

			camdenServices.click();
			communityService.click();
			lunchClub.click();
			input.sendKeys("NW1 0NE");
			searchButton.click();
			listResults.get(0).click();			

			perf.stop().then(function(data) {
				console.log("Services", metrics(data.Program, data.domContentLoadedEventEnd, data.domContentLoadedEventStart));
			});

			browser.getCurrentUrl().then(function (url) {
				expect(url).toEqual(baseUrl + "#/home/Lunch%20club/location/NW1%200NE");
            });


		});
				

		it("to find information about their neighbourhood ", function(){

			perf.start();

			neighbourhood.click();
			input.sendKeys("NW1 0NE");
			searchButton.click();

			perf.stop().then(function(data) {
				console.log("Neighbourhood", metrics(data.Program, data.domContentLoadedEventEnd, data.domContentLoadedEventStart));
			});

			browser.getCurrentUrl().then(function (url) {
				expect(url).toEqual(baseUrl + "#/home/neighbourhood-found/5048636");
            });
		});


		it("to find information on streetworks ", function(){

			perf.start();

			streetworks.click();
			input.sendKeys("NW1 0NE");
			searchButton.click();

			perf.stop().then(function(data) {
				console.log("Streetworks", metrics(data.Program, data.domContentLoadedEventEnd, data.domContentLoadedEventStart));
			});

			browser.getCurrentUrl().then(function (url) {
				expect(url).toEqual(baseUrl + "#/home/streetworks/location/NW1%200NE");
            });

		});


	});

}());

