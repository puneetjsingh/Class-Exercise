// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

//lat and long coordinates for New Delhi were used 
var map = L.map('map').setView([31.3260, 75.5762], 6);

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'singp618'
});

// Initialze source data, which is 1 layer from Carto, villages in Punjab
var source1 = new carto.source.SQL('SELECT * FROM punjab_villages');

//STYLE for villages in Punjab
var style1 = new carto.style.CartoCSS(`
#layer {
  marker-width: 4;
  marker-fill: #EE4D5A;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

var village_layer = new carto.layer.Layer(source1, style1);

//Add data to map as a layer
client.addLayer(village_layer);
client.getLeafletLayer().addTo(map);

//SECOND LAYER

// Initialze source data, which is 1 layer from Carto, province boundaries 
var source2 = new carto.source.SQL('SELECT * FROM provinces_india');

//STYLE for villages in Punjab
var style2 = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #826dba;
  polygon-opacity: 0;
}
#layer::outline {
  line-width: 3;
  line-color: #ffffff;
  line-opacity: 1;
}
#layer::labels {
  text-name: [name_0];
  text-face-name: 'DejaVu Sans Book';
  text-size: 10;
  text-fill: #FFFFFF;
  text-label-position-tolerance: 0;
  text-halo-radius: 1;
  text-halo-fill: #6F808D;
  text-dy: -10;
  text-allow-overlap: true;
  text-placement: point;
  text-placement-type: dummy;
}
`);

var province_layer = new carto.layer.Layer(source2, style2);

//Add data to map as a layer
client.addLayer(province_layer);
client.getLeafletLayer().addTo(map);

//SECOND LAYER

// Initialze source data, which is 1 layer from Carto, province boundaries 
var source3 = new carto.source.SQL('SELECT * FROM india_districts');

//STYLE for villages in Punjab
var style3 = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #826DBA;
  polygon-opacity: 0.4;
}
#layer::outline {
  line-width: 1;
  line-color: #eada00;
  line-opacity: 0.5;
}
`);

var district_layer = new carto.layer.Layer(source3, style3);

//Add data to map as a layer
client.addLayer(district_layer);
client.getLeafletLayer().addTo(map);

//INTERACTIVE SECTION 
var countSql = "SELECT COUNT(*) FROM punjab_villages"

fetch('https://singp618.carto.com/api/v2/sql/?q=' + countSql)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // All of the data returned is in the response variable
    console.log(data); 
  
      var count = data.rows[0].count;
  var sidebarContainer = document.querySelector('.sidebar-feature-content');

    // Add the text including the sum to the sidebar
    sidebarContainer.innerHTML = '<div>There are ' + count + ' villages in Punjab, India.</div>';
  });