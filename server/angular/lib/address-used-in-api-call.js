/*************************************
*   ADDRESS-API-CALLS.JS
*
*************************************/
;(function() {
	"use strict";

	module.exports = function addressUsedinAPIcall (scope) {
		if(scope.locationSelected.hasOwnProperty("Latitude")) {
			return true;
		} else {
			return false;
		}
	};
}());