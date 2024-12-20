import Feature from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/Feature.js';
import Map from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/Map.js';
import Point from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/geom/Point.js';
import View from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/View.js';
import { Icon, Style } from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/layer.js';
import { OSM } from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/source.js';
import { Vector as VectorSource } from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/source.js';
import { fromLonLat } from 'https://cdn.jsdelivr.net/npm/ol@6.14.1/esm/proj.js';

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
  
  // Menambahkan gaya untuk ikon setiap kota (gunakan URL ikon yang valid)
  rome.setStyle(
    new Style({
      image: new Icon({
        color: '#BADA55',
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blue_dot.svg',  // Ikon biru
      }),
    }),
  );
  
  london.setStyle(
    new Style({
      image: new Icon({
        color: 'rgba(255, 0, 0, .5)',
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blue_dot.svg',  // Ikon biru
        scale: 0.2,
      }),
    }),
  );
  
  madrid.setStyle(
    new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blue_dot.svg',  // Ikon biru
        scale: 0.2,
      }),
    }),
  );
  
  paris.setStyle(
    new Style({
      image: new Icon({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blue_dot.svg',  // Ikon biru
      }),
    }),
  );
  
  berlin.setStyle(
    new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blue_dot.svg',  // Ikon biru
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
    source: new OSM(),  // Menggunakan peta OSM
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
  
