/*************************************************
*   E2E TEST CONFIGS 
*   Use: Put test variables here to import in
* 		 your tests for less repeatition
**************************************************/

;(function() {
    "use strict";
    module.exports = {
    	path: {
    		main: 'http://localhost:8080/',
    		home: '#/home'
    	},
    	landing: {
    		buttons: {
    			title: ["Camden Services", "About Your Neighbourhood", "Live Streetworks"],
    			imgSrc: ["img/icons/find-your-nearest.png", "img/icons/your-neighbourhood.png", "img/icons/streetworks.png"]
    		}
    	}
    }

}());

