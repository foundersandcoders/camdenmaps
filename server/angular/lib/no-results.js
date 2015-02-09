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