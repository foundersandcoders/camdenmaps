/*************************************
*   NO RESULTS.JS
*	Use: To check if there are any 
*	results on the map.
*************************************/

;(function() {
	"use strict";

	module.exports = function noResults(scope) {

		if(scope.results.length === 0 ) {
			return true;
		} else {
			return false;
		}

	};
}());