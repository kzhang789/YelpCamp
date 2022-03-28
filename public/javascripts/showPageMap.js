mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: camp.geometry.coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
  });

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
       .setLngLat(camp.geometry.coordinates)
       .setPopup(
           new mapboxgl.Popup({offset: 28})
           .setHTML(
               `<h6>${camp.title}</h6><p>${camp.location}</p>`
           )
       )
       .addTo(map)