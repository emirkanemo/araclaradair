import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { MapPin, Star, Search, Filter } from 'lucide-react';
import Navbar from './components/Navbar';

interface GasStation {
  İstasyonAdı: string;
  Marka: string;
  Adres: string;
  İlçe: string;
  Enlem: string;
  Boylam: string;
  Puan: string;
}

export default function GasStationsPage() {
  const [stations, setStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Hepsi');

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

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic font-black text-white leading-tight tracking-tighter mb-8">
            Akaryakıt<br />İstasyonları.
          </h1>
          <p className="text-white/40 max-w-2xl text-lg leading-relaxed uppercase tracking-[0.2em] font-bold">
            İstanbul genelindeki güncel istasyon verileri, konumlar ve kullanıcı puanlamaları.
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStations.map((station, i) => (
              <div 
                key={i}
                className="group bg-white/5 border border-white/10 p-8 rounded-sm hover:-translate-y-2 transition-all duration-500 hover:bg-white/[0.08]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-2">
                      {station.Marka}
                    </span>
                    <h3 className="text-xl font-serif italic text-white group-hover:text-white/80 transition-colors">
                      {station.İstasyonAdı}
                    </h3>
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
    </div>
  );
}
