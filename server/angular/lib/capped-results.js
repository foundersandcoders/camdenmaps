;(function() {
	"use strict";

	module.exports = function cappedResults(service) {
		
		//will only check for small results lists		
		// if(Object.size(markers) < 12) {
			var fiveortenmarkers = [ 
					"After school club",
					"Aluminium cans",
					"Art gallery",
					"Athletics",
					"Badminton",
					"Basketball",
					"Batteries",
					"Beavers group",
					"Bowling",
					"Camden Climate Change Alliance award winner",
					"Car club",
					"Cardboard and Paper",
					"Car park",
					"CCTV camera",
					"Chemist",
					"Children's club",
					"Children's library",
					"Cinema",
					"Coach parking",
					"Community centre",
					"Connexions personal adviser",
					"Cricket",
					"Dance",
					"Day centre",
					"Dentist",
					"Disabled blue badge",
					"Disabled green badge",
					"Five-a-side football",
					"Flu Jab",
					"Foil",
					"Football",
					"Gentle exercise",
					"GP",
					"Green action group",
					"Green roof",
					"Grit Bin",
					"Gymnastics",
					"Hall for hire",
					"Holiday play scheme",
					"Hospital",
					"Household electronics and appliances",
					"Karate",
					"Kickboxing",
					"Kung Fu",
					"Loading bay",
					"Low carbon schools pilot",
					"Martial Arts",
					"Netball",
					"NHS Trust",
					"Open space",
					"Optician",
					"Parking space",
					"Pay and display",
					"Permit holders",
					"Pilates",
					"Place of worship",
					"Recycling point",
					"Residents and tenants association",
					"Sexual health clinic",
					"Solo motorcycle",
					"Special school",
					"Squash",
					"Swimming",
					"Table Tennis",
					"Tai Chi",
					"Tennis",
					"Theatre",
					"Training for organisations",
					"Wifi hotspot",
					"Yoga" ];	

			
			if(fiveortenmarkers.indexOf(service) > -1) {
				return true;
			}
		// }


	};
}());

      

   
