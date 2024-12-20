// Menggunakan Skypack untuk mengimpor modul-modul OpenLayers
import ImageTile from 'https://cdn.skypack.dev/ol@10.3.1/source/ImageTile.js';
import Map from 'https://cdn.skypack.dev/ol@10.3.1/Map.js';
import View from 'https://cdn.skypack.dev/ol@10.3.1/View.js';
import {
  DragAndDrop,
  defaults as defaultInteractions,
} from 'https://cdn.skypack.dev/ol@10.3.1/interaction.js';
import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'https://cdn.skypack.dev/ol@10.3.1/format.js';
import {
  Tile as TileLayer,
  VectorImage as VectorImageLayer,
} from 'https://cdn.skypack.dev/ol@10.3.1/layer.js';
import {Vector as VectorSource} from 'https://cdn.skypack.dev/ol@10.3.1/source.js';

const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON],
});

const key = 'Get your own API key at https://www.maptiler.com/cloud/';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const map = new Map({
  interactions: defaultInteractions().extend([dragAndDropInteraction]),
  layers: [
    new TileLayer({
      source: new ImageTile({
        attributions: attributions,
        url:
          'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
        tileSize: 512,
        maxZoom: 20,
      }),
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

dragAndDropInteraction.on('addfeatures', function (event) {
  const vectorSource = new VectorSource({
    features: event.features,
  });
  map.addLayer(
    new VectorImageLayer({
      source: vectorSource,
    }),
  );
  map.getView().fit(vectorSource.getExtent());
});

const displayFeatureInfo = function (pixel) {
  const features = [];
  map.forEachFeatureAtPixel(pixel, function (feature) {
    features.push(feature);
  });
  if (features.length > 0) {
    const info = [];
    let i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
  }
};

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  displayFeatureInfo(evt.pixel);
});

map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
});
