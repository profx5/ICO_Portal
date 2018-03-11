var mapStyles = [
  {
      "stylers": [
          {
              "hue": "#2c3e50"
          },
          {
              "saturation": 250
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 50
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
]


var mainMarkerOpts = {
    position: {
        lat: 49.283675,
        lng: -123.112228
    },
    icon: {
        url: "img/common/svg/location-filled.svg",
        scaledSize: new google.maps.Size(28, 40),
    },
}