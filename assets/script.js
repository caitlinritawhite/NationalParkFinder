var x = document.getElementById("demo");
var y = document.getElementById("demo1");
const spinner = document.getElementById("spinner");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    spinner.removeAttribute("hidden");
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
      spinner.setAttribute("hidden", "");
      // console.log(parks)

      parksList = parks.data;
      console.log(parks);

      displayParks(parks);
    });
  });
}

var map;
var parksList;

function displayParks(parks) {
  var InforObj = [];

  // var parkIndex = 0

  for (var i = 0; i < parks.data.length; i++) {
    console.log(parks.data.length);
    var coords = parks.data[i].latLong;
    var latLng = new google.maps.LatLng(
      parks.data[i].latitude,
      parks.data[i].longitude
    );
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });

    // console.log(latLng)
    var imageDiv = $("<div>")
      .attr("id", "state-img" + [i])
      .addClass("column");
    var stateBtn = $("<button>")
      .text(parks.data[i].fullName)
      .addClass("state-btn")
      .attr("park", i);
    var stateImg = $("<img>")
      .attr("src", parks.data[i].images[i].url)
      .addClass("standard-img");

    $("#state-name").append(finalDiv);
    var finalDiv = $(imageDiv).append(stateImg, stateBtn);

    const contentString =
      '<div id="content text"><h4>' +
      parks.data[i].description +
      "</h4><p></p></div>";
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200,
    });

    marker.addListener("click", function () {
      var markerContent = latLng;

      closeOtherInfo();
      // infowindow.close()
      infowindow.setContent(markerContent);
      infowindow.open(map, this);
    });

    function closeOtherInfo() {
      if (InforObj.length > 0) {
        InforObj[0].set("marker", null);
        /* and close it */
        InforObj[0].close();
        /* blank the array */
        InforObj.length = 0;
      }
    }
  }
}
// Initialize and add the map and syles the map

function initMap(latitude, longitude) {
  // The location of the map
  $("#map").empty();
  var uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: uluru,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#ebe3cd",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#523735",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f1e6",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c9b2a6",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#dcd2be",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ae9e90",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#93817c",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#bbe600",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#b7f060",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#88ac53",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f1e6",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#fdfcf8",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#f8c967",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#e9bc62",
          },
        ],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#e98d58",
          },
        ],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#db8555",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#806b63",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8f7d77",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ebe3cd",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#b9d3c2",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#92998d",
          },
        ],
      },
    ],
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
    '<h1 id="firstHeading" class="firstHeading">Your location</h1>';
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

function renderStates() {
  $("#search-btn").on("click", function () {
    spinner.removeAttribute("hidden");

    var userChoice = $("#state :selected").val();

    var parkURL =
      " https://developer.nps.gov/api/v1/parks?stateCode=" +
      userChoice +
      "&api_key=wV47kSkvj2E4EXWlDq3d6TIN4Q8X39nRx1M3d3Qb";

    $.ajax({
      url: parkURL,
      method: "GET",
    }).then(function (parkInfo) {
      parksList = parkInfo.data;
      initMap(parkInfo.data[0].latitude, parkInfo.data[0].longitude);
      console.log(parkInfo);
      displayParks(parkInfo);
      spinner.setAttribute("hidden", "");
    });
  });
}
//Button of the Park Name - when clicked displays --//
$(document).on("click", ".state-btn", function () {
  var i = $(this).attr("park");
  $(".ui").show()

  //Calling Park Name and Description from response //
  var parkName = parksList[i].fullName;
  var parkInfo = parksList[i].description;

  //Adding the Park Name and info to the respective Divs //
  var infoHeader = $("#info-header").text(parkName).addClass("header");
  var infoParagraph = $("#description").text(parkInfo);

  //Appendiing this info to the page //
  $("#info-div").append(infoHeader, infoParagraph);

  //Calling the Park Directions from response //
  var directions = parksList[i].directionsInfo;

  //Adding a title and the info to the respective Divs //
  var directionsDiv = $("#directions").text("Directions");
  var directionsInfo = $("#directions-info").text(directions);

  //Appending this info to the page //
  $("#directions-div").append(directionsDiv, directionsInfo);

  //Calling phone number and email from response //
  var phoneNumber = parksList[i].contacts.phoneNumbers[0].phoneNumber;
  var emailAddress = parksList[i].contacts.emailAddresses[0].emailAddress;

  //Adding a title phone number and email info to respective Divs //
  var contactDiv = $("#contact-title").text("Contact Info");
  var phoneInfo = $("#phone-info").text("Phone Number: " + phoneNumber);
  var emailInfo = $("#email-info").text("Email Address: " + emailAddress);

  //Appending this info to the page //
  $("#contact-div").append(contactDiv, phoneInfo, emailInfo);

  //Calling the address line, city, state and postal code from the response //
  var address = parksList[i].addresses[0].line1;
  var city = parksList[i].addresses[0].city;
  var state = parksList[i].addresses[0].stateCode;
  var zipCode = parksList[i].addresses[0].postalCode;

  //Adding a title and this information to respective Divs //
  var addressTitle = $("#address").text("Address");
  var addressInfo = $("#address-info").text(
    address + " " + city + ", " + state + " " + zipCode
  );

  //Appending this info to the page //
  $("#address-div").append(addressTitle, addressInfo);

  // Calling Entrance Fee info from the response //

  var entranceTitle = parksList[i].entranceFees[0].title;
  var entranceCost = parksList[i].entranceFees[0].cost;
  var entranceFee = parksList[i].entranceFees[0].description;

  //Adding this information to respective Divs //
  var feeTitle = $("#fee-title").text(entranceTitle);
  var feeCost = $("#entrance-fee-cost").text(
    "$" + parseFloat(entranceCost).toFixed(2)
  );
  var feeInfo = $("#entrance-fee-info").text(entranceFee);

  $("#fee-div").append(feeTitle, feeCost, feeInfo);

  //Calling Hours of operation from response //
  var hourInfo = parksList[i].operatingHours[0].description;

  //Adding a title and this information to respective Divs //
  var hourTitle = $("#hours-title").text("Hours of Operation");
  var hours = $("#hours-description").text(hourInfo);

  //Appending this information to the page //
  $("#hours-div").append(hourTitle, hours);
  console.log(hourInfo);
});
renderStates();
