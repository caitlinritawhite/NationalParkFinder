var x = document.getElementById("demo");
var y = document.getElementById("demo1");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  initMap(latitude, longitude);

  var queryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    latitude +
    "," +
    longitude +
    "&key=AIzaSyCZpN1LVa4mDWLaJe-QHtXPPOfXjeg6Ap0";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    y.innerHTML = response.results[0].address_components[5].short_name;

    var z = response.results[0].address_components[5].short_name;
    var queryURL2 =
      " https://developer.nps.gov/api/v1/parks?stateCode=" +
      z +
      "&api_key=wV47kSkvj2E4EXWlDq3d6TIN4Q8X39nRx1M3d3Qb";

    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (parks) {

    console.log(parks)


        for (var i=0; i < parks.data.length; i++){
            var coords = parks.data[i].latLong;
            var latLng = new google.maps.LatLng(parks.data[i].latitude,parks.data[i].longitude);
            var marker = new google.maps.Marker({
         position: latLng,
         map: map
         
        });
        
      };

    });
  });
}
var map;

// Initialize and add the map
function initMap(latitude, longitude) {
  // The location of Uluru
  var uluru = { lat: latitude, lng: longitude };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: uluru,
  });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: uluru, map: map });
}
