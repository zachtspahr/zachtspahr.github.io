var apiKey = "pk.eyJ1IjoiZGFydGFuaW9uIiwiYSI6ImNqbThjbHFqczNrcjkzcG10cHpoaWF4aWUifQ.GwBz1hO0sY2QE8bXq9pSRg";

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: apiKey
});

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: apiKey
});

var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: apiKey
});

// We then create the map object with options. Adding the tile layers we just
// created to an array of layers.
var map = L.map("map", {
  center: [
    40.7, -94.5
  ],
  zoom: 3,
  layers: [graymap, satellite, outdoors]
});

// Adding our 'graymap' tile layer to the map.
graymap.addTo(map);

var earthquakes = new L.LayerGroup();
var plates = new L.LayerGroup();
var baseMaps = {
  Satellite: satellite,
  Graymap: graymap,
  Outdoors: outdoors
};
var overlays = {
  Earthquakes: earthquakes,
  "Tectonic Plates" : plates
};

L
  .control
  .layers(baseMaps, overlays)
  .addTo(map);


function markerSize(magnitude) {
    return magnitude * 20000;
  }

  var query_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

  d3.json(query_url, function(data) {
      quake_data = data
      console.log(quake_data.features.length)
      var quakeMarkers = [];
      for (var i = 0; i < quake_data.features.length; i++) {
        var color = "";
        if (quake_data.features[i].properties.mag > 5) {
          color = "red";
        }
        else if (quake_data.features[i].properties.mag > 6) {
            color = "orange";
          }
        else if (quake_data.features[i].properties.mag > 4) {
          color = "purple";
        }
        else if (quake_data.features[i].properties.mag > 3) {
          color = "blue";
        }
        else {
          color = "yellow";
        }
    
        quakeMarkers.push(
        L.circle([quake_data.features[i].geometry.coordinates[1], quake_data.features[i].geometry.coordinates[0]],{
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            
            radius: markerSize(quake_data.features[i].properties.mag)
            }).bindPopup("<h1>" + quake_data.features[i].properties.place + "</h1> <hr> <h3>" + new Date(quake_data.features[i].properties.time) + "</h3><hr> Magnitude: <h3>"+ quake_data.features[i].properties.mag + "</h3>").addTo(earthquakes));
      
    
      earthquakes.addTo(map);
      function getColor(d) {
        return d > 6 ? 'orange' :
                d > 5  ? 'red' :
                d > 4  ? 'purple' :
                d > 3  ? 'blue' :
                        'yellow';
    }
    var legend = L.control({
    position: 'bottomright'
    });
    
    legend.onAdd = function (map) {
    
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [2, 3, 4, 5 , 6],
      labels = [],
      from, to;
      for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
    
        labels.push(
        '<i style="background:' + getColor(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
        }
    
    div.innerHTML = "<h3> Quake Magnitude</h3>" + labels.join('<br>');
    return div;
    };
    
    


    
  
}

legend.addTo(map);

    
  });

var plates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
d3.json(plates_url, function(platedata) {
  L.geoJson(platedata, {
    color: "silver",
    weight: 2
  })
  .addTo(plates);

  // Then add the tectonicplates layer to the map.
  plates.addTo(map);

});

