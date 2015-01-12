/***********************************************
*   SERVERCONFIG.JS
*   Description: Centralizes the configurations for server
*   Use: Imported throughout the server
*
************************************************/
(function () {
    "use strict";

    //Module for converting XML to JSON
    var parseString = require('xml2js').parseString;

    module.exports = {

        //Config for server host and port
        server: {
            host: "0.0.0.0",
            port: "8080"
        },
     
        //Mapping for query params and camden API
        map: {
            url: {
                nearestApi: "http://maps.camden.gov.uk/nearest/nearestrest.aspx"
            },
            query: {
                service: "find=",
                location: "area=",
                uprn: "uprn="
            }
        },

        //Function for responding JSON to client
        convertToXml: function convertToXml (err, res, req, rep) {
            if (err) {
                return rep(err);
            }
            //Create xml parser

            var xml = ('<Locations Area="nw1 0ne"><AddressSearchResults Area="nw1 0ne" East="183826" North="528951" Longitude="-0.14205" Latitude="51.53861"/><Properties><Property LocationID="529261183348" BuildingName="The Crowndale Centre" StreetNum="218-220" Street="Eversholt Street" PostCode="NW1 1BD" Longitude="-0.13775" Latitude="51.53425" ViewLat="51.53407" ViewLng="-0.13815" View="54" Distance="0.57"><PoI Name="Camden Town Library" Type="Library" Telephone="020 7974 4444" OpeningHours="Mon-Thu 10am-6pm; Fri 11am-5pm; Sat 11am-5pm; Sun closed." URL="http://www.camden.gov.uk/camdentownlibrary" Source="CINDEX"/></Property><Property LocationID="530050183321" StreetNum="5" Street="Pancras Square" PostCode="N1C 4AG" Longitude="-0.1264" Latitude="51.53382" ViewLat="51.53382" ViewLng="-0.1264" View="0" Distance="1.209"><PoI Name="Pancras Square Library" Type="Library" Telephone="020 7974 4444" OpeningHours="Mon-Sat 8am-8pm, Sun 11am-5pm." URL="http://www.camden.gov.uk/ccm/content/council-and-democracy/plans-and-policies/camden-strategies-%26-partnerships/pancras-square-library.en" Source="CINDEX"/></Property><Property LocationID="529029185095" BuildingName="Kentish Town Library " StreetNum="262-266" Street="Kentish Town Road" PostCode="NW5 2AA" Longitude="-0.14046" Latitude="51.55" ViewLat="51.55003" ViewLng="-0.1408" View="95" Distance="1.271"><PoI Name="Kentish Town Library" Type="Library" Telephone="020 7974 4444" OpeningHours="Mon-Thu 10am-7pm, Fri 10am-5pm, Sat 11am-5pm, Sun closed." URL="http://www.camden.gov.uk/kentishtownlibrary" Source="CINDEX"/></Property><Property LocationID="530018182893" BuildingName="The British Library " StreetNum="96" Street="Euston Road" PostCode="NW1 2DB" Longitude="-0.12701" Latitude="51.52999" ViewLat="51.52917" ViewLng="-0.1262" View="327" Distance="1.417"><PoI Name="British Library" Type="Library" Telephone="0870 444 1500 (Switchboard)" OpeningHours="Public areas Mon, Wed-Fri 9.30am-6pm, Tue 9.30am-8pm, Sat 9.30am-5pm, Sun and public holidays 11am-5pm." URL="http://www.bl.uk" Source="CINDEX"/></Property><Property LocationID="528283185130" BuildingName="Queens Crescent Branch Library " StreetNum="165" Street="Queen\'s Crescent" Thumbnail="http://search3.openobjects.com/mediamanager/camden/cd/images/ashdown_crescent.jpg" Image="http://search3.openobjects.com/mediamanager/camden/cd/images/ashdown_crescent.jpg" PostCode="NW5 4HH" Longitude="-0.1512" Latitude="51.55049" ViewLat="51.55031" ViewLng="-0.15092" View="314" Distance="1.465"><PoI Name="Queens Crescent Library" Type="Library" Telephone="020 7974 4444" OpeningHours="Mon 10am-6pm, Tue-Thu 11am-6pm,Fri 11am-5pm, Sat 11am-5pm, Sun closed." URL="http://www.camden.gov.uk/queenscrescentlibrary" Source="CINDEX"/></Property></Properties></Locations>');
            
            parseString(xml, function (err, result) {
                console.dir(result);
            });

            //Pipe downstream response to parser
            // res.pipe(parseString);

        } 
    };

    




}());
