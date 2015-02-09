// /*************************************************
// *   LANDING TESTS
// *   Description: Acceptance tests are written here
// *   Use: run tests by npm test
// **************************************************/


(function () {
    "use strict";

    describe("As a user, I want to have clear call to actions when I arrive on the landing page", function () {

        it("title to be Camden Council: Find Your Nearest", function() {

            browser.get('#/home');

            var title = browser.getTitle();

            expect(title).toEqual('Camden Council: Find Your Nearest');

        });
        describe("There are three call to actions with icons, ", function() {

            it("Find your nearest, ", function () {
                
                var nearestText = element(by.id('findYourNearest')).getText();
                
                expect(nearestText).toEqual('Find Your Nearest');
            });
            it("About Your Neighbourhood, ", function () {

                var neighbourhoodText = element(by.id('aboutYourNeighbourhood')).getText();
                
                expect(neighbourhoodText).toEqual('About Your Neighbourhood');
            });
            it("and Live Streetworks", function () {

                var streetworksText = element(by.id('liveStreetworks')).getText();
                
                expect(streetworksText).toEqual('Live Streetworks');
            });

        });
        it("The header includes Camden Logo and correct alternate text", function() {

            var logo = element(by.id('camden-logo'));
            var alt = logo.getAttribute("alt");

            expect(logo.isDisplayed()).toBe(true);
            expect(alt).toBe('Camden');
        });
    });
}());