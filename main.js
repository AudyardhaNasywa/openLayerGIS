import Feature from 'https://cdn.skypack.dev/ol/Feature.js';
import Map from 'https://cdn.skypack.dev/ol/Map.js';
import Point from 'https://cdn.skypack.dev/ol/geom/Point.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import { Icon, Style } from 'https://cdn.skypack.dev/ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'https://cdn.skypack.dev/ol/layer.js';
import { OSM } from 'https://cdn.skypack.dev/ol/source.js';
import { Vector as VectorSource } from 'https://cdn.skypack.dev/ol/source.js';
import { fromLonLat } from 'https://cdn.skypack.dev/ol/proj.js';
import GeoTIFF from 'https://cdn.skypack.dev/geotiff';
import ImageStatic from 'https://cdn.skypack.dev/ol/source/ImageStatic.js';  // Import ImageStatic

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
    layers: [rasterLayer, vectorLayer], // Gabungkan layer OpenStreetMap dan vektor
    target: document.getElementById('map'),
    view: new View({
        center: fromLonLat([2.896372, 44.6024]), // Pusatkan peta pada koordinat yang diinginkan
        zoom: 3, // Level zoom
    }),
});

// Fungsi untuk menambahkan layer GeoTIFF
async function loadGeoTIFF() {
    const tiff = await GeoTIFF.fromUrl('https://example.com/your-geotiff-file.tif'); // URL GeoTIFF Anda
    const image = await tiff.getImage();

    // Menambahkan layer GeoTIFF sebagai raster
    const geoTIFFLayer = new TileLayer({
        source: new ImageStatic({
            url: 'https://example.com/your-geotiff-file.tif',  // URL file GeoTIFF
            imageExtent: image.getExtent(), // Mendapatkan extent dari image
        }),
    });

    map.addLayer(geoTIFFLayer); // Menambahkan GeoTIFF ke peta
}

loadGeoTIFF(); // Panggil fungsi untuk memuat GeoTIFF
