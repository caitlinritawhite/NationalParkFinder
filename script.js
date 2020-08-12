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
      displayParks(parks);



    });
  });
};

var map;

function displayParks(parks){
  var parkIndex = 0
  for (var i = 0; i < parks.data.length; i++) {
  var parkLoop = parks.data[i].images
    var coords = parks.data[i].latLong;
    var latLng = new google.maps.LatLng(parks.data[i].latitude, parks.data[i].longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    var imageDiv = $("<div>").attr("id", "state-img" + [i]).addClass("column");
    var stateBtn = $("<button>").text(parks.data[i].fullName).addClass("btn");
    var stateImg = $("<img>").attr("src", parks.data[i].images[i].url).addClass("standard-img")
    $("#state-name").append(finalDiv)
    var finalDiv = $(imageDiv).append(stateImg, stateBtn)

  }

  };


// Initialize and add the map
function initMap(latitude, longitude) {
  // The location of Uluru
  $("#map").empty()
  var uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map,
    title: "Your Location"
  });
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Your location</h1>' 
  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

function renderStates (){
  $("#search-btn").on("click", function () {
  

    var userChoice = $("#state :selected").val();
  
    var parkURL =
        " https://developer.nps.gov/api/v1/parks?stateCode=" +
        userChoice +
        "&api_key=wV47kSkvj2E4EXWlDq3d6TIN4Q8X39nRx1M3d3Qb";
  
      $.ajax({
        url: parkURL,
        method: "GET",
      }).then(function (parkInfo) {
        initMap(parkInfo.data[0].latitude, parkInfo.data[0].longitude);
        console.log(parkInfo)
        displayParks(parkInfo)
    
    
      });
  
  });



}

renderStates()


  