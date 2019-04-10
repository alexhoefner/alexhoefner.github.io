const div = document.getElementById("map")

const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

let karte = L.map("map");


const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    geolandgrey: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    basemaphighdpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    basemaportho: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    basemapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    basemapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a> under <a href="https://www.openstreetmap.org/copyright"ODbL</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a> under <a href="https://www.openstreetmap.org/copyright"ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a> under <a href="https://creativecommons.org/licenses/by-sa/3.0/"CC BY SA</a>'
    }),
};

kartenLayer.osm.addTo(karte);

L.control.layers({
    "Open Street Map": kartenLayer.osm,
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Overlay": kartenLayer.geolandbasemapoverlay,
    "Geoland Basemap Grau": kartenLayer.geolandgrey,
    "Geoland Basemap High DPI": kartenLayer.basemaphighdpi,
    "Geoland Basemap Orthophoto": kartenLayer.basemaportho,
    "Geoland Basemap Gelände": kartenLayer.basemapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.basemapoberflaeche,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor


}).addTo(karte);


karte.setView(
    [47.267222, 11.392778],
    15
);

// console.log(SPORTSTAETTEN);



var myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});



// alle Punkte einlesen
for (let staette of SPORTSTAETTEN) {
    // console.log(staette)
    // Icons einbinden
    let piktogram = L.icon({
        iconUrl: `icons/icon_${staette.icon}_schwarz_auf_weiss_250px.png`,
        iconSize: [15,15]
    });
    let staettepin = L.marker([staette.lat, staette.lng], {
        icon: piktogram
    }).addTo(karte);
    staettepin.bindPopup(
    `<h3>Name: ${staette.name}</h3>
    <p>Adresse: ${staette.adresse}</p>
    <em>Typ: ${staette.typ}</em>
    <em>Gruppe: ${staette.gruppe}</em>`);
    
};