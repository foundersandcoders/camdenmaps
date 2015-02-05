;(function() {
	"use strict";

	module.exports = function cappedResults(service) {
		return 	service === "Community centre" ? true 
				: service === "Hall for hire" ? true 
				: false;





	};
}());