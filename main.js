// Mengimpor modul OpenLayers dengan benar dari Skypack
import Map from 'https://cdn.skypack.dev/ol@10.3.1/Map.js';
import View from 'https://cdn.skypack.dev/ol@10.3.1/View.js';
import ImageTile from 'https://cdn.skypack.dev/ol@10.3.1/source/ImageTile.js';
import {
  DragAndDrop,
  defaults as defaultInteractions,
} from 'https://cdn.skypack.dev/ol@10.3.1/interaction.js';
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'https://cdn.skypack.dev/ol@10.3.1/format.js';
import {
  Tile as TileLayer,
  VectorImage as VectorImageLayer,
} from 'https://cdn.skypack.dev/ol@10.3.1/layer.js';
import { Vector as VectorSource } from 'https://cdn.skypack.dev/ol@10.3.1/source.js';

// Mengimpor GeoTIFF.js dari Skypack
import * as GeoTIFF from 'https://cdn.skypack.dev/geotiff@2.1.3';

// Menyiapkan interaksi drag-and-drop
const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON],
});

// Kunci dan atribusi untuk peta
const key = 'AD1kEbMLVtQ725FfH4xp';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

// Membuat peta OpenLayers
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

// Fungsi untuk membuka dan memuat file GeoTIFF
async function loadGeoTIFF(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    console.log(image); // Tampilkan informasi gambar TIFF di konsol
    // Kamu bisa menambahkan pemrosesan gambar lebih lanjut di sini
  } catch (error) {
    console.error("Gagal memuat GeoTIFF:", error);
  }
}

// Panggil fungsi loadGeoTIFF dengan URL file GeoTIFF yang sesuai
loadGeoTIFF('path/to/your/geotiff/file.tif');

// Menambahkan fitur ketika gambar di-drag-and-drop
dragAndDropInteraction.on('addfeatures', function (event) {
  const vectorSource = new VectorSource({
    features: event.features,
  });
  map.addLayer(
    new VectorImageLayer({
      source: vectorSource,
    })
  );
  map.getView().fit(vectorSource.getExtent());
});

// Menampilkan informasi fitur yang di-klik atau di-hover
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

// Event untuk pointermove dan klik untuk menampilkan info fitur
map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  displayFeatureInfo(evt.pixel);
});

map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
});
