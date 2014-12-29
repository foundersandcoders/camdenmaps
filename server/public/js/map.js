function ajaxCall (url, callback) {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//below not being used at the moment
//get element by class and add action listener that sends requests to API

// document.getElementById("search").addEventListener("click", function (e) {
    
//     var service = document.getElementById("Dropdownlistfind").value;
//     var location = document.getElementById("postcode").value;
//     ajaxCall("https://camdenmaps.herokuapp.com/services/" + service + "/locations/" + location,function (data) {
//         console.log(data);
//         document.getElementById("results").innerHTML = data;
//     })

// });


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
