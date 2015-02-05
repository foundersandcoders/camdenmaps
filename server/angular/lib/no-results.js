;(function() {
	"use strict";

	module.exports = function noResults(scope) {
		console.log("here I am");

		if(scope.results.length === 0 ) {
			return true;
		} else {
			return false;
		}

	};
}());