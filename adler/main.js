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
// karte.setView(
//     [47.2, 11.2],
//     8
// );


// verschiedene basemap.at Kartenlayer einbinden
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

// OSM Basemap einbinden
// L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
//     subdomains: ['a','b','c'],
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
// }).addTo(karte);

kartenLayer.geolandgrey.addTo(karte);

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
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor


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

// Kartenausdehnung
let ausschnitt = (blickeGruppe.getBounds());
ausschnitt.extend(pin1.getLatLng());
ausschnitt.extend(pin2.getLatLng());

// console.log(blickeGruppe).getBounds();
karte.fitBounds(ausschnitt);

// Fullscreen Plugin einbinden (in index.html)
karte.addControl(new L.Control.Fullscreen());


// Leaflet hash Plugin einbinden (Koordinaten in URL)
// var hash = new L.Hash(karte);


// Coordinates Control intialisieren
var coords = new L.Control.Coordinates(); // you can send options to the constructor if you want to, otherwise default values are used
// Plugin an Karte hängen
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});


// GPX einfügen
new L.GPX("AdlerwegEtappeO3.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {

    karte.fitBounds(e.target.getBounds());
    const statsDiv = document.getElementById('stats');
    const minHeight = e.target.get_elevation_min().toFixed(1);
    const maxHeight = e.target.get_elevation_max().toFixed(1);
    const verticalMeeters = Math.round(e.target.get_elevation_gain());
    statsDiv.innerHTML = `Routen Statistik: niedrigster Punkt: ${minHeight} m,
    höchster Punkt: ${maxHeight} m, Höhenunterschied: ${verticalMeeters} m` // Höhenprofil
}).on("addline", function (e) {
    // console.log("linie geladen")
    const controlElevation = L.control.elevation({
        
        detachedView: true,
        elevationDiv: "#elevation-div",
    });
    controlElevation.addTo(karte);
    controlElevation.addData(e.line);
    const gpxLinie = e.line.getLatLngs();
    // console.log(gpxLinie);

    // Steigung einfärben
    for (let i = 1; i < gpxLinie.length; i +=1){
        // console.log(gpxLinie[i]);
        let p1 = gpxLinie[i-1];
        let p2 = gpxLinie[i];
        let dist = karte.distance(
            [p1.lat, p1.lng],
            [p2.lat,p2.lng]
        );
        let delta = (p2.meta.ele - p1.meta.ele)
        // verkürzte if Schreibweise: wenn distanz nichtgleich 0, dann delta/dist * 100, sonst 0
        // to.Fixed: Runden auf 1 Nachkommastelle
        let proz = (dist != 0 ? delta / dist * 100.00 : 0).toFixed(1);
        // console.log("Distanz: ", dist, "Höhenunterschied: ", delta, "Steigung: ", proz)
        
        // colorbrewer
        
        let farbe = 
            proz >= 10 ? "#d73027":
            proz >= 6 ? "#fc8d59":
            proz >= 2 ? "#fee08b":
            proz >= 0 ? "#ffffbf":
            proz >= -6 ? "#d9ef8b":
            proz >= -10 ? "#91cf60":
                        "#1a9850";
            L.polyline(
                [
                    [p1.lat, p1.lng],
                    [p2.lat, p2.lng],
                ], {
                    color: farbe,
                }
            ).addTo(karte);

    }

})//.addTo(karte);




