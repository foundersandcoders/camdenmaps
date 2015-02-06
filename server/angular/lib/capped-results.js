;(function() {
	"use strict";

	module.exports = function cappedResults(service) {
		
		//will only check for small results lists		
		// if(Object.size(markers) < 12) {
			var fiveortenmarkers = [ "Community centre",
				"Hall for hire",
				"Place of worship",
				"CCTV camera",
				"Training for organisations",
				"Holiday play scheme",
				"Beavers group",
				"Children's club",
				"After school club",
				"Theatre",
				"Art gallery",
				"Wifi hotspot",
				"Residents/tenants association",
				"Special school",
				"Library",
				"Children's library",
				"Pay and display/meter",
				"Household electronics/appliances",
				"Cinema",
				"Art gallery",
				"Pay and display/meter",
				"Green action group",
				"Green roof",
				"Low carbon schools pilot",
				"Camden Climate Change Alliance award winner",
				"Open space",
				"Recycling point",
				"Batteries",
				"Cardboard and Paper",
				"Household electronics/appliances",
				"Aluminium cans",
				"Foil",
				"Grit Bin",
				"Chemist",
				"Day centre",
				"Dentist",
				"Flu Jab",
				"GP",
				"Hospital",
				"NHS Trust",
				"Optician",
				"Sexual health clinic",
				"Athletics",
				"Badminton",
				"Basketball",
				"Bowling",
				"Cricket",
				"Dance",
				"Five-a-side football",
				"Football",
				"Gentle exercise",
				"Gymnastics",
				"Karate",
				"Kickboxing",
				"Kung Fu",
				"Martial Arts",
				"Netball",
				"Pilates",
				"Squash",
				"Swimming",
				"Table Tennis",
				"Tai Chi",
				"Tennis",
				"Yoga" ];	
			
			if(fiveortenmarkers.indexOf(service) > -1) {
				return true;
			}
		// }


	};
}());

      

   
