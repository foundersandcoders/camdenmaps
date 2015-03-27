# Known Issues
#### Documentation of known issues of the app

### Streetworks Zoom

For map manipulations, we use: http://tombatossals.github.io/angular-leaflet-directive/#!/

The issue with Street works zoom, when we recenter the map sometimes angular leaflet directive seems to recenter it  incorrectly. To see this go to the `api-response-service.js` and to line 100. Your should see this function: 


```
$timeout(function() {
   scope.update("centre", {
      lat: Number(data.location.Latitude),
      lng: Number(data.location.Longitude),
      zoom: markers.zoomCheck(scope)()
   });
}, 25);
```

Remove/comment out the $timeout function. Do keep the scope.update centre however.


```
// $timeout(function() {
   scope.update("centre", {
      lat: Number(data.location.Latitude),
      lng: Number(data.location.Longitude),
      zoom: markers.zoomCheck(scope)()
   });
// }, 25);
```

Now run task `gulp` and navigate to `http://localhost:8080/#/home/streetworks` Try searching `well road` and press the search button without selecting anything from the typeahead. That should centre fine. Next try ` EC1R 5DQ` and search either with the typeahead results or press the search button. This time the results should appear in the bottom right hand corner. 

While debugging this issue, we realised that the update centre function on line 101 in the `api-response-service.js`  does work as expected. If you console.log the `$scope.centre` it has updated with the correct values. However, visually the map still hasn't centred correctly. 

Based on this issue:tombatossals/angular leaflet directive#569
We have determined that it isn't our code which is the issue, but actually something that needs to be updated in angular-leaflet-directive.

As a temporary "fix" we have added the $timeout that you have seen, but this was intended as a temporary fix until the directive has been updated.

