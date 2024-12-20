import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import {Icon, Style} from 'ol/style.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM} from 'ol/source.js';  // Gunakan OpenStreetMap
import {Vector as VectorSource} from 'ol/source.js';
import {fromLonLat} from 'ol/proj.js';

// Membuat fitur untuk beberapa kota
const rome = new Feature({
  geometry: new Point(fromLonLat([12.5, 41.9])),
});

const london = new Feature({
  geometry: new Point(fromLonLat([-0.12755, 51.507222])),
});

const madrid = new Feature({
  geometry: new Point(fromLonLat([-3.683333, 40.4])),
});

const paris = new Feature({
  geometry: new Point(fromLonLat([2.353, 48.8566])),
});

const berlin = new Feature({
  geometry: new Point(fromLonLat([13.3884, 52.5169])),
});

// Menambahkan gaya untuk ikon setiap kota
rome.setStyle(
  new Style({
    image: new Icon({
      color: '#BADA55',
      crossOrigin: 'anonymous',
      src: 'data/square.svg',  // Pastikan gambar ini ada atau ganti dengan URL yang valid
    }),
  }),
);

london.setStyle(
  new Style({
    image: new Icon({
      color: 'rgba(255, 0, 0, .5)',
      crossOrigin: 'anonymous',
      src: 'data/bigdot.png',  // Pastikan gambar ini ada atau ganti dengan URL yang valid
      scale: 0.2,
    }),
  }),
);

madrid.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      src: 'data/bigdot.png',  // Pastikan gambar ini ada atau ganti dengan URL yang valid
      scale: 0.2,
    }),
  }),
);

paris.setStyle(
  new Style({
    image: new Icon({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      src: 'data/dot.svg',  // Pastikan gambar ini ada atau ganti dengan URL yang valid
    }),
  }),
);

berlin.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      src: 'data/dot.svg',  // Pastikan gambar ini ada atau ganti dengan URL yang valid
    }),
  }),
);

// Menambahkan fitur ke dalam VectorSource
const vectorSource = new VectorSource({
  features: [rome, london, madrid, paris, berlin],
});

// Membuat VectorLayer untuk menampilkan fitur
const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// Menggunakan OpenStreetMap sebagai sumber peta
const rasterLayer = new TileLayer({
  source: new OSM(),  // Menggunakan peta OSM, Anda bisa menggantinya dengan URL lain yang valid
});

// Membuat peta dengan lapisan raster dan vektor
const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: fromLonLat([2.896372, 44.6024]),  // Pusatkan peta pada koordinat yang diinginkan
    zoom: 3,  // Level zoom
  }),
});
