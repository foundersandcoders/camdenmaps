;(function() {
	"use strict";

	module.exports = function cappedResults(service) {
				//services which cap results at 5
		return 	service === "Community centre" ? true 
				: service === "Hall for hire" ? true 
				: service  === "marriage/civil partnership venues" ? true
				
				//services which cap results at 10
				: service  === "Wifi hotspot" ? true
				: service  === "Residents/tenants association" ? true
				: service  === "Special school" ? true
				: service  === "Library" ? true
				: service  === "Children's library" ? true
				: service  === "Pay and display/meter" ? true
				: service  === "Household electronics/appliances" ? true
				: service  === "Cinema" ? true
				: service  === "Art gallery" ? true
				: service  === "Pay and display/meter" ? true
				: service  === "Green action group" ? true
				: service  === "Green roof" ? true
				: service  === "Low carbon schools pilot" ? true
				: service  === "Camden Climate Change Alliance award winner" ? true
				: service  === "Open space" ? true
				: service  === "Recycling point" ? true
				: service  === "Batteries" ? true
				: service  === "Cardboard and Paper" ? true
				: service  === "Household electronics/appliances" ? true
				: service  === "Aluminium cans" ? true
				: service  === "Foil" ? true
				: service  === "Grit Bin" ? true
				: service  === "Chemist" ? true
				: service  === "Day centre" ? true
				: service  === "Dentist" ? true
				: service  === "Flu Jab" ? true
				: service  === "GP" ? true
				: service  === "Hospital" ? true
				: service  === "NHS Trust" ? true
				: service  === "Optician" ? true
				: service  === "Sexual health clinic" ? true
				: service  === "Athletics" ? true
				: service  === "Badminton" ? true
				: service  === "Basketball" ? true
				: service  === "Bowling" ? true
				: service  === "Cricket" ? true
				: service  === "Dance" ? true
				: service  === "Five-a-side football" ? true
				: service  === "Football" ? true
				: service  === "Gentle exercise" ? true
				: service  === "Gymnastics" ? true
				: service  === "Karate" ? true
				: service  === "Kickboxing" ? true
				: service  === "Kung Fu" ? true
				: service  === "Martial Arts" ? true
				: service  === "Netball" ? true
				: service  === "Pilates" ? true
				: service  === "Squash" ? true
				: service  === "Swimming" ? true
				: service  === "Table Tennis" ? true
				: service  === "Tai Chi" ? true
				: service  === "Tennis" ? true
				: service  === "Yoga" ? true
				: false;




	};
}());

      

   
