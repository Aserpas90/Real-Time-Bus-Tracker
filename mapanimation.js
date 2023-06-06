var map;
var markers = [];

function init(){
	var myOptions = {
		zoom      : 14,
		center    : { lat:42.353350,lng:-71.091525},
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var element = document.getElementById('map');
  	map = new google.maps.Map(element, myOptions);
  	addMarkers();
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
};

function addMarker(bus) {
	var icon = getIcon(bus);
	var marker = new google.maps.Marker({
		position: {
			lat: bus.attributes.latitude, 
	    	lng: bus.attributes.longitude
	    },
		map: map,
		icon: icon,
		id: bus.id
		
	});
markers.push(marker);

}

function moveMarker(marker,bus) {
	var icon = getIcon(bus);
	marker.setIcon(icon);
	marker.setPosition({
		lat: bus.attributes.latitude, 
    	lng: bus.attributes.longitude
	});
}
	



function getIcon(bus){
	if ( bus.attributes.direction_id === 0) {
		return './red.png';
	}
	else {
		return './blue.png';
	}
}
async function addMarkers(){
	const locations = await getBusLocations();

	locations.forEach(function(bus) {
		var marker = getMarker(bus.id);
		if (marker) {
			moveMarker(marker, bus);
		}
		else{
			addMarker(bus);
		}
		
	});
	console.log(new Date());
	console.log(locations);
	setTimeout(addMarkers,15000);

}
