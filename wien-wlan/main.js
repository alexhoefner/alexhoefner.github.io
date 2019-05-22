/* Wien OGD Beispiele */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

const wikiGruppe = L.featureGroup().addTo(karte);
layerControl.addOverlay(wikiGruppe, "Wikipedia Artikel");


// Wikipedia Artikel laden
async function wikiArtikelLaden(url) {
    console.log("lade", url);

    const antwort = await fetch(url);
    const jsonDaten = await antwort.json();

    console.log(jsonDaten);
    for (let artikel of jsonDaten.geonames) {
        // Icon erstellen
        const wikiIcon = L.icon({
            iconUrl: "icons/wiki.png",
            iconSize: [30, 30]
        })
        const wikipediaMarker = L.marker([artikel.lat, artikel.lng], {
            icon: wikiIcon
        }).addTo(wikiGruppe);
        // Marker Popup
        wikipediaMarker.bindPopup(`
        <h3>${artikel.title}</h3>
        <p>${artikel.summary}</p>
        <hr>
        <footer><a href="https://${artikel.wikipediaUrl}" target="_blank">Wikipedia</a></footer>
        `);

    }
}

// Wikipedia Artikel laden
karte.on("load zoomend moveend", function () {
    // console.log("karte geladen", karte.getBounds());

    let ausschnitt = {
        n: karte.getBounds().getNorth(),
        o: karte.getBounds().getEast(),
        s: karte.getBounds().getSouth(),
        w: karte.getBounds().getWest()
    }
    // console.log(ausschnitt)
    const geonamesUrl = `http://api.geonames.org/wikipediaBoundingBoxJSON?formatted=true&north=${ausschnitt.n}&south=${ausschnitt.s}&east=${ausschnitt.o}&west=${ausschnitt.w}&username=webmapping&style=full&maxRows=5&lang=de`;
    // console.log(geonamesUrl);

    // Json Artikel laden
    wikiArtikelLaden(geonamesUrl);
});

karte.setView([48.208333, 16.373056], 12);

// https://github.com/Norkart/Leaflet-MiniMap
new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true
    }
).addTo(karte);


// die Implementierung der Karte startet hier
const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WLANWIENATOGD&srsName=EPSG:4326&outputFormat=json";

// ausgelagerte Funktion
function makeMarker(feature, latlng) {
    const fotoIcon = L.icon({
        iconUrl: "http://www.data.wien.gv.at/icons/wlanwienatogd.png",
        iconSize: [13, 13]
    })

    const sightMarker = L.marker(latlng, {
        icon: fotoIcon
    })
    sightMarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.ADRESSE}</p>   
        <hr>
        <footer><a href="${feature.properties.WEITERE_INF}" target="_blank">Weblink</a></footer>
        `);
    return sightMarker
}



async function loadWlan(url) {

    // add Cluster Group
    const clusterGruppe = L.markerClusterGroup();
    const response = await fetch(url);
    const sightsData = await response.json();
    const geoJson = L.geoJson(sightsData, {
        // wie wird Punkt dargestellt
        pointToLayer: makeMarker
    });
    // GeoJson zu Marker Cluster Gruppe hinzufügen
    clusterGruppe.addLayer(geoJson);
    karte.addLayer(clusterGruppe);
    layerControl.addOverlay(clusterGruppe, "Public WLAN Standorte");

    // Suchfeld hinzufügen
    const suchFeld = new L.control.search({
        layer: clusterGruppe,
        propertyName: "NAME",
        zoom: 18,
        initial: false
    })
    karte.addControl(suchFeld)

}
loadWlan(url);