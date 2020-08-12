var x = document.getElementById("demo");
var y = document.getElementById("demo1");
const spinner = document.getElementById("spinner");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    spinner.removeAttribute('hidden');
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
      spinner.setAttribute('hidden', '');
      console.log(parks)
      displayParks(parks);
      
     

    });
  });
};

var map;

function displayParks(parks) {
  var InforObj = []
  // var parkIndex = 0
  for (var i = 0; i < parks.data.length; i++) {
   
    var parkLoop = parks.data[i].images
    var coords = parks.data[i].latLong;
    var latLng = new google.maps.LatLng(parks.data[i].latitude, parks.data[i].longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    const contentString =
      '<div id="content text"><h4>' + parks.data[i].description +
      '</h4><p></p></div>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });

    marker.addListener('click', function () {
      var markerContent = latLng;
      
      closeOtherInfo();
      // infowindow.close()
      infowindow.setContent(markerContent);
      infowindow.open(map, this);
      
      
    });
    
    function closeOtherInfo() {
      console.log("closeOtherInfo")
      if (InforObj.length > 0) {
          InforObj[0].set("marker", null);
          /* and close it */
          InforObj[0].close();
          /* blank the array */
          InforObj.length = 0;
          }
  }

    // var parkImage = $("<img>");

    $("#state-img").append('<img class ="standard-img" src="' + parks.data[i].images[i].url + '">');


    // var pic1 = $(<img>).attr("src", parks.data[0].images[0]);
    // var pic2 = $(<img>).attr("src", parks.data[1].images[]);
    // var pic3 = $(<img>).attr("src", );
    // var pic4 = $(<img>).attr("src", );
    // var pic5 = $(<img>).attr("src", );
    // var pic6 = $(<img>).attr("src", );

    // $("#pic1").append(pic1);
    // $("#pic2").append(pic1);
    // $("#pic3").append(pic1);
    // $("#pic4").append(pic1);
    // $("#pic5").append(pic1);
    // $("#pic6").append(pic1);
    
  }

  // spinner.setAttribute('hidden', '');








};


// Initialize and add the map and syles the map

function initMap(latitude, longitude) {
  
  // The location of the map
  $("#map").empty()
  var uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: uluru,
    styles:[
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#bbe600"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#b7f060"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#88ac53"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map,
    title: "Your Location",

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

function renderStates() {
  
  $("#search-btn").on("click", function () {
    spinner.removeAttribute('hidden');

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
      spinner.setAttribute('hidden', '');
    });

  });



}

renderStates()


