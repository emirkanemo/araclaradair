import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { MapPin, Star, Search, Filter, Map as MapIcon, List as ListIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not appearing correctly in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const fuelIconSvg = `
<svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 44C18 44 34 29 34 18C34 9.16344 26.8366 2 18 2C9.16344 2 2 9.16344 2 18C2 29 18 44 18 44Z" fill="#0a0a0b" stroke="white" stroke-width="2"/>
  <path d="M13 28H21" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M14 14H20" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M21 28V12C21 10.8954 20.1046 10 19 10H15C13.8954 10 13 10.8954 13 12V28" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M21 19H23C24.1046 19 25 19.8954 25 21V24" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const fuelIconUrl = `data:image/svg+xml;base64,${btoa(fuelIconSvg)}`;

const customFuelIcon = L.icon({
    iconUrl: fuelIconUrl,
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -46],
});

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface GasStation {
  İstasyonAdı: string;
  Marka: string;
  Adres: string;
  İlçe: string;
  Enlem: string;
  Boylam: string;
  Puan: string;
}

const BRAND_LOGOS: Record<string, string> = {
  'Shell': 'https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg',
  'Petrol Ofisi': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Petrol_Ofisi_logo.svg',
  'Opet': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Opet_logo.svg',
  'TotalEnergies': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/TotalEnergies_logo.svg',
  'BP': 'https://upload.wikimedia.org/wikipedia/en/d/d2/BP_Logo.svg'
};

const getBrandLogo = (brand: string) => {
  return BRAND_LOGOS[brand] || 'https://lucide.dev/api/icons/fuel';
};

export default function GasStationsPage() {
  const [stations, setStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Hepsi');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRs7P7MP3EVBQaZ34JI8xZ7qqg6sMd9SJsl56M4QpRcCDRYK10aC0veKaqtzpuTtaeD61dzfRUeKp2P/pub?output=csv';

  useEffect(() => {
    fetch(CSV_URL)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.replace(/\s/g, ''), // Remove spaces from headers
          complete: (results) => {
            setStations(results.data as GasStation[]);
            setLoading(false);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
        setLoading(false);
      });
  }, []);

  const brands = ['Hepsi', ...Array.from(new Set(stations.map(s => s.Marka)))];

  const filteredStations = stations.filter(s => {
    const matchesSearch = s.İstasyonAdı.toLowerCase().includes(search.toLowerCase()) || 
                         s.İlçe.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand === 'Hepsi' || s.Marka === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const parseCoord = (coord: string) => {
    if (!coord) return 0;
    return parseFloat(coord.replace(',', '.'));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-serif italic font-black text-white leading-tight tracking-tighter mb-8">
              Akaryakıt<br />İstasyonları.
            </h1>
            <p className="text-white/40 max-w-2xl text-lg leading-relaxed uppercase tracking-[0.2em] font-bold">
              İstanbul genelindeki güncel istasyon verileri, konumlar ve kullanıcı puanlamaları.
            </p>
          </div>

          <div className="flex gap-2 bg-white/5 p-1 rounded-sm border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" /> Liste
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              <MapIcon className="w-4 h-4" /> Harita
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 p-8 bg-white/5 border border-white/10 rounded-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text"
              placeholder="İstasyon veya ilçe ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-white/30" />
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedBrand === brand 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStations.map((station, i) => (
                  <div 
                    key={i}
                    className="group bg-white/5 border border-white/10 p-8 rounded-sm hover:-translate-y-2 transition-all duration-500 hover:bg-white/[0.08]"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm p-2 flex items-center justify-center shrink-0">
                          <img 
                            src={getBrandLogo(station.Marka)} 
                            alt={station.Marka} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/fuel.svg';
                            }}
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-2">
                            {station.Marka}
                          </span>
                          <h3 className="text-xl font-serif italic text-white group-hover:text-white/80 transition-colors">
                            {station.İstasyonAdı}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white/60">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {station.Puan}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-8 text-white/40 text-xs leading-relaxed">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>{station.Adres}</p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        {station.İlçe}
                      </span>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${station.Enlem},${station.Boylam}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2 group/link"
                      >
                        YOL TARİFİ <div className="w-4 h-[1px] bg-current group-hover/link:w-8 transition-all" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[600px] w-full rounded-sm overflow-hidden border border-white/10 relative z-10 bg-white">
                <MapContainer 
                  center={[41.0082, 28.9784]} 
                  zoom={11} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  {filteredStations.map((station, i) => {
                    const lat = parseCoord(station.Enlem);
                    const lon = parseCoord(station.Boylam);
                    if (!isNaN(lat) && !isNaN(lon)) {
                      return (
                        <Marker key={i} position={[lat, lon]} icon={customFuelIcon}>
                          <Popup>
                            <div className="p-2 min-w-[200px]">
                              <div className="mb-3">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">{station.Marka}</p>
                                <h4 className="text-sm font-bold text-gray-900 leading-tight">{station.İstasyonAdı}</h4>
                              </div>
                              <p className="text-xs text-gray-500 mb-3">{station.Adres}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-700">
                                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                  {station.Puan}
                                </div>
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${station.Enlem},${station.Boylam}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] font-bold text-black hover:underline uppercase tracking-tighter"
                                >
                                  YOL TARİFİ
                                </a>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    }
                    return null;
                  })}
                </MapContainer>
              </div>
            )}
          </>
        )}

        {!loading && filteredStations.length === 0 && (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-sm">
            <p className="text-white/20 uppercase tracking-[0.5em] font-black italic">Arama sonucu bulunamadı</p>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto border-t border-white/5 py-12 text-center text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
         © 2026 Araçlara Dair Her Şey.
      </footer>

      <style>{`
        .leaflet-container {
          background: #f8f9fa;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          background: white;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}
