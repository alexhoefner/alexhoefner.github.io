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
    const farbpalette_wind = [

        //TODO: Umrechnen von Beaufort
        [12.9599999999, "rgb(0,185,0)"],
        [20.3699999999, "rgb(16,205,36)"],
        [40.7399999999, "rgb(114,212,117)"],
        [51.8599999999, "rgb(254,214,211)"],
        [62.9699999999, "rgb(255,182,179)"],
        [75.9299999999, "rgb(255,158,154)"],
        [89.8999999999, "rgb(255,130,129)"],
        [103.709999999, "rgb(255,97,96)"],
        [118.529999, "rgb(255,69,60)"],
        [118.53, "rgb(255,32,14)"],
    ]
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = "black";
                for (let i = 0; i < farbpalette_wind.length; i++) {
                    console.log(farbpalette_wind[i], feature.properties.WG);
                    if (feature.properties.WG < farbpalette_wind[i][0]) {
                        color = farbpalette_wind[i][1];
                        break;
                    }
                }
                if (feature.properties.WG < 0) {
                    feature.properties.WG = "noData"
                    color = "white"
                }
                // if (feature.properties.WG > 15) {
                //     color = "orange"
                // }
                // if (feature.properties.WG > 30) {
                //     color = "red"
                // }
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
                for (let i = 0; i < farbpalette_snow.length; i++) {
                    console.log(farbpalette_snow[i], feature.properties.HS);
                    if (feature.properties.HS < farbpalette_snow[i][0]) {
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
    //snowLayer.addTo(karte);

    //Temperaturlayer hinzufügen

    const TempLayer = L.featureGroup();
    const farbpalette_temp = [

        [-30, "rgb(100,102,100)"],
        [-28, "rgb(140,138,140)"],
        [-26, "rgb(180,178,180)"],
        [-24, "rgb(204,206,204)"],
        [-22, "rgb(228,230,228)"],
        [-20, "rgb(119,45,118)"],
        [-18, "rgb(177,35,176)"],
        [-16, "rgb(210,25,209)"],
        [-14, "rgb(255,0,255)"],
        [-12, "rgb(255,148,255)"],
        [-10, "rgb(56,0,209)"],
        [-8, "rgb(50,90,254)"],
        [-6, "rgb(38,149,255)"],
        [-4, "rgb(255,123,0)"],
        [-2, "rgb(0,205,255)"],
        [0, "rgb(0,255,254)"],
        [2, "rgb(0,120,0)"],
        [4, "rgb(0,157,0)"],
        [6, "rgb(0,188,2)"],
        [8, "rgb(0,226,0)"],
        [10, "rgb(0,255,0)"],
        [12, "rgb(252,255,0)"],
        [14, "rgb(253,242,0)"],
        [16, "rgb(253,225,0)"],
        [18, "rgb(255,209,0)"],
        [20, "rgb(255,189,0)"],
        [22, "rgb(255,173,0)"],
        [24, "rgb(255,156,0)"],
        [26, "rgb(255,120,0)"],
        [28, "rgb(255,0,0)"],
        [30, "rgb(243,1,2)"],
        [32, "rgb(210,0,0)"],
        [34, "rgb(193,0,0)"],
        [36, "rgb(177,0,0)"],
        [38, "rgb(161,0,0)"],
        [40, "rgb(144,0,0)"],
        [42, "rgb(119,1,0)"],
        [44, "rgb(95,1,0)"],
        [46, "rgb(70,1,1)"],
        [48, "rgb(46,2,3)"],
    ]
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                let color = "red";
                for (let i = 0; i < farbpalette_temp.length; i++) {
                    console.log(farbpalette_temp[i], feature.properties.LT);
                    if (feature.properties.LT < farbpalette_temp[i][0]) {
                        color = farbpalette_temp[i][1];
                        break;
                    }
                }
                if (feature.properties.LT < -99) {
                    feature.properties.LT = "noData",
                        color = "white"
                }
 
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="tempLabel" style ="background-color: ${color}">${feature.properties.LT}</div>`

                    })

                });

            }
        }
    }).addTo(TempLayer);
    layerControl.addOverlay(TempLayer, "Lufttemperatur");
    //TempLayer.addTo(karte);    

    // Feuchtelayer hinzufügen
    const HumLayer = L.featureGroup();
    const farbpalette_hum = [

        [20, "rgb(238,238,238)"],
        [30, "rgb(221,221,221)"],
        [40, "rgb(198,201,206)"],
        [50, "rgb(187,187,187)"],
        [60, "rgb(170,170,204)"],
        [70, "rgb(153,152,221)"],
        [80, "rgb(135,136,238)"],
        [90, "rgb(118,119,225)"],

    ]
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.RH) {
                let color = "red";
                for (let i = 0; i < farbpalette_hum.length; i++) {
                    console.log(farbpalette_hum[i], feature.properties.RH);
                    if (feature.properties.RH < farbpalette_hum[i][0]) {
                        color = farbpalette_hum[i][1];
                        break;
                    }
                }
                
                
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="humLabel" style ="background-color: ${color}">${feature.properties.RH}</div>`

                    })

                });

            }
        }
    }).addTo(HumLayer);
    layerControl.addOverlay(HumLayer, "Relative Feuchte");
    HumLayer.addTo(karte);    
}

loadStations();



