//alert("Hallo Welt");

const div = document.getElementById("map")

const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");


// console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

//Karte initalisieren
let karte = L.map("map");

// console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);


// verschiedene basemap.at Kartenlayer einbinden
const kartenLayer = {
        osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                 subdomains: ['a','b','c'],
                 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }),
        geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
        }),
        geolandbasemapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
        }),
        geolandgrey: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
        }),
        basemaphighdpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
        }),
        basemaportho: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
        }),
        basemapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
        }),
        basemapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps','maps1','maps2','maps3','maps4'],
            attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
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
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Overlay": kartenLayer.geolandbasemapoverlay,
    "Geoland Basemap Grau": kartenLayer.geolandgrey,
    "Geoland Basemap High DPI": kartenLayer.basemaphighdpi,
    "Geoland Basemap Orthophoto": kartenLayer.basemaportho,
    "Geoland Basemap Gelände": kartenLayer.basemapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.basemapoberflaeche,
    "Geoland Open Street Map": kartenLayer.osm,
    

}).addTo(karte);


//kartenLayer.osm.addTo(karte);
//kartenLayer.basemaportho.addTo(karte);

//Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

// Popup zum Pin hängen
// pin1.bindPopup(titel1).openPopup();

// for-Schleife für adlerblicke
let blickeGruppe = L.featureGroup().addTo(karte);
// Adlerblicke groß schreiben, weil Const extern liegt
for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);

    blickpin.bindPopup(
        `<h1>Standort: ${blick.standort}</h1>
    <p>Höhe: ${blick.seehoehe}</p>
    <em>Kunde: ${blick.kunde}</em>`);
}

// console.log(blickeGruppe).getBounds();
karte.fitBounds(blickeGruppe.getBounds());