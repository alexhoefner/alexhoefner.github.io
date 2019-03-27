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

// OSM
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

// Popup zum Pin hängen
// pin1.bindPopup(titel1).openPopup();

// Adlerblicke als Const definieren
const adlerblicke = [{
        kunde: "Wilder Kaiser ",
        standort: "Gruttenhütte",
        seehoehe: 1640,
        lat: 47.55564,
        lng: 12.31861
    },
    {
        kunde: "Bergbahn Scheffau",
        standort: "Brandstadl",
        seehoehe: 1640,
        lat: 47.4912,
        lng: 12.248
    },
    {
        kunde: "Lechtal Tourismus",
        standort: "Sonnalm Jöchelspitze",
        seehoehe: 1786,
        lat: 47.27528,
        lng: 10.36505
    }
]

// for-Schleife für adlerblicke
for (let blick of adlerblicke) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(karte);

    blickpin.bindPopup(
        `<h1>Standort: ${blick.standort}</h1>
    <p>Höhe: ${blick.seehoehe}</p>
    <em>Kunde: ${blick.kunde}</em>`);
}