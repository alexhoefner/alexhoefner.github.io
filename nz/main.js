//alert("Hallo Welt");

const div = document.getElementById("map")

const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

// console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

//Karte initalisieren
let karte = L.map("map");

// console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
    [breite, laenge],
    13
);

// OSM und weitere Layer hinzufügen
// L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ['a','b','c'],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ['a','b','c'],
        attribution: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a> under <a href="https://www.openstreetmap.org/copyright"ODbL</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ['a','b','c'],
        attribution: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a> under <a href="https://www.openstreetmap.org/copyright"ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ['a','b','c'],
        attribution: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a> under <a href="https://creativecommons.org/licenses/by-sa/3.0/"CC BY SA</a>'
    }),
};

// OSM Basemap einbinden
// L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
//     subdomains: ['a','b','c'],
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
// }).addTo(karte);

kartenLayer.osm.addTo(karte);

//Kartenmenü hinzufügen
L.control.layers({
"Open Street Map": kartenLayer.osm,
"Stamen Toner": kartenLayer.stamen_toner,
"Stamen Terrain": kartenLayer.stamen_terrain,
"Stamen Watercolor": kartenLayer.stamen_watercolor


}).addTo(karte);


//Positionsmarker hinzufügen
let pin = L.marker(
    [breite,laenge]
).addTo(karte);

// Popup zum Pin hängen
pin.bindPopup(titel).openPopup();

// Fullscreen Plugin einbinden (in index.html)
karte.addControl(new L.Control.Fullscreen());

// Coordinates Control intialisieren
var coords = new L.Control.Coordinates(); // you can send options to the constructor if you want to, otherwise default values are used
// Plugin an Karte hängen
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});
