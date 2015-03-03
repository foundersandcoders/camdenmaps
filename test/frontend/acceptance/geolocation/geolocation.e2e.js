/*************************************************
*   GEOLOCATION E2E TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var geolocateUser = element(by.css('[ng-click="geolocateUser()"]'));

(function () {
    "use strict";

	function geolocationTests () { 

//this does not work in tests as we are outside the boundaries set for Camden

 //    	describe("When geolocation button is pressed ", function () {

 //    		beforeEach(function () {
 //    			geolocateUser.click();
	// 	    });

	//         describe("if in Camden", function() {
	        	
	//         	beforeEach(function () {
	//     			this.addMatchers({
	// 		            toBeCorrectText: function () {
	// 		                var actual = this.actual;

	// 		                this.message = function () {
	// 		                    return "Expected " + actual + " to be either either text";
	// 		                };

	// 		                return actual === 'NW1 0NE' || 'Your Location';
	// 		            }
	// 		        });
	// 		    });

	//         	it("marker with appears", function() {
	//         		var positionMarker = element(by.css('[src="../img/icons/location-marker.png"]'));

	//         		expect(positionMarker.isDisplayed()).toBe(true);
	//         	});

	//         	it("with text `your location`", function() {
	//         		var popUp = element(by.css('.leaflet-popup-content'));
	//         		var popUpText = popUp.getText();

	//         		expect(popUpText).toBeCorrectText();
	//         	});
	//         });
 //    	});
	}

	module.exports = geolocationTests;
}());