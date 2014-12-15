// loads the OSM map centred on Camden Town
var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.transform([-0.139991, 51.535923], "EPSG:4326", "EPSG:3857"),
          zoom: 14
        })
      });



// search button functionality
function fetchJSONFile(path, callback) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function() {
          if (httpRequest.readyState === 4) {
              if (httpRequest.status === 200) {
                  var data = JSON.parse(httpRequest.responseText);
                  if (callback) callback(data);
              }
          }
      };
      httpRequest.open('GET', "http://maps.camden.gov.uk/nearest/nearestrest.aspx/services/");
      httpRequest.send();
  }


  fetchJSONFile("http://maps.camden.gov.uk/nearest/nearestrest.aspx/services/" + "library", function(data){
      // do something with your data
      console.log(data);
  });

