// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    {lat: 42.359244, lng: -71.093729},
    {lat: 42.360175, lng: -71.094915 },
    {lat: 42.362953, lng: -71.099558 },
    {lat: 42.365248, lng: -71.103476 },
    {lat: 42.366806, lng: -71.103476 },
    {lat: 42.368355, lng: -71.106067 },
    {lat: 42.369192, lng: -71.110799 },
    {lat: 42.370218, lng: -71.113095 },
    {lat: 42.372085, lng: -71.115476 },
    {lat: 42.373016, lng: -71.117585 },
    {lat: 42.374863, lng: -71.118625 }];

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "<YOUR-API-KEY-HERE>",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });

let map;
let marker;
let latlng;
let poly;

  // Initialize and add the map
async function initMap() {
  // The location of MIT
  const position = { lat: 42.365554, lng: -71.093729 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
 
  // The map, centered at MIT
  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: position,
    mapId: "MIT_to_Harvard_bus_stops",
  });

   // The marker, positioned at MIT
 marker = new google.maps.Marker({
    map: map,
    position: position,
    title: "MIT",
  });
  //create a polyline to mark the Bus path
  const busPath = new google.maps.Polyline({
    path: busStops,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  busPath.setMap(map);
}
initMap();
  
// counter here represents the index of the current bus stop
let counter = 0;

/* move the marker on the map every 1000ms. Use the function LatLng() to update the marker coordinates
 Use counter to access bus stops in the array busStops
 call move() after you increment the counter.*/
function move() {
    setTimeout(() => {
      if(counter >= busStops.length) return;
      latlng = new google.maps.LatLng(busStops[counter]);
      marker.setPosition(latlng);
      marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: "Bus stop",
      });
      counter++;
      move();
    }, 1000);
}
