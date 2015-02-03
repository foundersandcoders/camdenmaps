;(function() {
    "use strict";

    module.exports = function aliasServices(service) {
        return  service === "Wood"                                  ? "Christmas Trees"
                : service === "Batteries"                           ? "Household batteries"
                : service === "Cardboard and paper"                 ? "Cardboard"
                : service === "Clothing and textiles"               ? "Textiles and shoes"
                : service === "Nappies"                             ? "Nappies"
                : service === "Funiture"                           ? "Furniture (not reusable)"
                : service === "Garden waste"                        ? "Grass cuttings and leaves"
                : service === "Light bulbs"                         ? "Light bulbs"
                : service === "Glass"                               ? "Glass bottles and jars (all colours)"
                : service === "Clinical waste"                      ? "Sharps" 
                : service === "Paint"                               ? "Paint"
                : service === "Chemical and hazardous waste"        ? "Household chemicals"
                : service === "Household electronics/appliances"    ? "Microwaves"
                : service === "Aluminium cans"                      ? "Aluminium cans"
                : service === "Vehicles"                            ? "Cars and end of life vehicles"
                : service === "Foil"                                ? "Foil"
                : service === "Scrap metal"                         ? "Scrap metal"
                : service === "Spectacles"                          ? "Spectacles"
                : service === "Cooking oil"                         ? "Cooking oil"
                : service === "Plastic"                             ? "Plastic containers"
                : service;
    }
}());
