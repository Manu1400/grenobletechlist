TechList.Map = TechList.Map || {};
      
TechList.Map.init = function(centerCoord, mapId, zoomLevel, mapType) {
  TechList.Map.canvas = new google.maps.Map(document.getElementById(mapId),
  {
    center: new google.maps.LatLng(centerCoord.lat, centerCoord.lng),
    zoom: zoomLevel,
    mapTypeId: mapType,
    disableDefaultUI: true
  });
};
      
TechList.Map.addMarker = function(organization, pinColor) {
  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
  var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
    new google.maps.Size(40, 37),
    new google.maps.Point(0, 0),
    new google.maps.Point(12, 35));
  
  var marker = new google.maps.LatLng(organization.lat, organization.lng);
  return new google.maps.Marker({
    position: marker,
    map: TechList.Map.canvas,
    icon: pinImage,
    shadow: pinShadow
  });
};

TechList.Map.addInfoWindow = function(organizationMarker, organization, organizationType) {
  var infowindow = new google.maps.InfoWindow({
    content: _.template($('#info-window-template').html(), { 
      organizationName: organization.name, 
      organizationType: organizationType
    })
  });
  google.maps.event.addListener(organizationMarker, 'click', function() {
    infowindow.open(TechList.Map.canvas,organizationMarker);
  });
};
