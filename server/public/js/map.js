function ajaxCall (url, callback) {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


//get element by class and add action listener that sends requests to API
document.getElementById("search").addEventListener("click", function (e) {
    
    var service = document.getElementById("Dropdownlistfind").value;
    var location = document.getElementById("postcode").value;
    ajaxCall("https://camdenmaps.herokuapp.com/services/" + service + "/locations/" + location,function (data) {
        console.log(data);
        document.getElementById("results").innerHTML = data;
        addMarkers();
    });

});

