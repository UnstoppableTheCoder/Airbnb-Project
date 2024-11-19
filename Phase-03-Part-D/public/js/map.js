mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates) // Listing.geometry.coordiantes
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${map_location}</h4><p>Exact Location provided after booking</p>`
    )
  )
  .addTo(map);