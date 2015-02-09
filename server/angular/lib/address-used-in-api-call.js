;(function() {
	"use strict";

	module.exports = function addressUsedinAPIcall (scope) {
		if(scope.locationSelected.hasOwnProperty("Area")) {
			return true;
		} else {
			return false;
		}
	};
}());