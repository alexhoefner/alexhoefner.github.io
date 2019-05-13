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

kartenLayer.geolandbasemap.addTo(karte);

const layerControl = L.control.layers({
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
    10
);

// console.log(AWS);

// Daten vom Server holen
async function loadStations() {
    // await: warte auf Aufruf, Daten von Homepage lesen
    const response = await fetch("https://aws.openweb.cc/stations");
    // Umwandeln in GeoJson
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            // console.log("Layer ",layer);
            // Datum neu formatieren
            const date = new Date(layer.feature.properties.date)
            console.log("Datum", date)
            return `<h4>${layer.feature.properties.name}</h4>
        Stationshöhe (m): ${layer.feature.geometry.coordinates[2]} <br>
        Temperatur: ${layer.feature.properties.LT} °C<br>
        Schneehöhe: ${layer.feature.properties.HS} cm<br>
        
        Datum: ${date.toLocaleDateString("de-AT")}
        | Uhrzeit: ${date.toLocaleTimeString("de-AT")}<br>
        Windgeschwindigkeit (km/h):
        
        ${layer.feature.properties.WG ? layer.feature.properties.WG : "keine Daten"}
        <hr>
        <footer> Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>`;
            // ? if Abfrage: ?if :else
        })
        .addTo(awsTirol);
    //awsTirol.addTo(karte);
    // Ausschnitt
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");
    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = "black";
                if (feature.properties.WG > 15){
                    color = "orange" 
                }
                if (feature.properties.WG > 30){   
                    color = "red"
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color};transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-up fa-3x"></i>`
                    
                    })

                });

            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    //windLayer.addTo(karte)

    //Schneelayer hinzufügen

const snowLayer = L.featureGroup();
const farbpalette_snow = [
    
    [0, "rgb(173,189,99)"],
    [10, "rgb(255,123,0)"],
    [20, "rgb(66,239,66)"],
    [30, "rgb(99,255,198)"],
    [50, "rgb(33,189,255)"],
    [75, "rgb(57,107,189)"],
    [100, "rgb(255,99,255)"],
    [150, "rgb(255,255,0)"],
    [200, "rgb(255,189,0)"],
    [250, "rgb(255,0,132)"],
    [300, "rgb(123,0,132)"],
    [400, "rgb(0,0,0)"],
  
   
]
L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.HS) {
            let color = "red";
            for (let i=0; i<farbpalette_snow.length;i++){
                console.log(farbpalette_snow[i],feature.properties.HS);
                if (feature.properties.HS <farbpalette_snow[i][0]){
                    color = farbpalette_snow[i][1];
                    break;
                }
            }
            if (feature.properties.HS < 0) {
                feature.properties.HS = "noData",
                color = "white"
             }
            // if (feature.properties.HS > 100){
            //     color = "orange" 
            // }
            // if (feature.properties.HS > 200){   
            //     color = "red"
            // }
            
            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="schneeLabel" style ="background-color: ${color}">${feature.properties.HS}</div>`
                
                })

            });

        }
    }
}).addTo(snowLayer);
layerControl.addOverlay(snowLayer, "Schneehöhe");
snowLayer.addTo(karte);
}

loadStations();