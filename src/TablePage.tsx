import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CAR_DATA } from './data';
import Navbar from './components/Navbar';

export default function TablePage() {
  const { brand } = useParams();
  const car = CAR_DATA.find(c => c.brand.toLowerCase() === brand?.toLowerCase());

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Veri Bulunamadı</h1>
          <Link to="/" className="text-white/40 uppercase tracking-widest text-xs hover:text-white transition-colors">Ana Sayfa</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e0e0e0]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black tracking-[0.3em] uppercase mb-8 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Geri Dön
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div>
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/30 mb-4 block">
                Fiyat Tablosu / 2026
              </span>
              <h1 className="text-6xl font-serif italic font-black text-white tracking-tighter">
                {car.brand} <span className="text-white/20">Index</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Son Güncelleme</p>
              <p className="font-mono text-sm">11 Mayıs 2026</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Model</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Donanım-Şanzıman</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Tavsiye Edilen Satış Fiyatı (TL)</th>
                <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/30 text-right">Kampanyalı Fiyat (TL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {car.models.map((model: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">{model.name}</td>
                  <td className="p-6 text-white/50 text-sm">{model.hardware}</td>
                  <td className="p-6 font-mono text-white/40 text-sm">{model.listPrice}</td>
                  <td className="p-6 font-mono text-white text-right font-bold text-lg">{model.campaignPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-20 p-10 border border-white/5 bg-white/[0.02]">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-6">Editör Notu</h3>
           <p className="text-white/40 text-sm leading-relaxed italic max-w-3xl">
              "Bu fiyat listesi {car.brand} markasının Mayıs 2026 itibariyle Türkiye pazarındaki konumlandırmasını yansıtmaktadır. Veriler webtekno.com ve resmi kaynaklardan derlenmiştir. Kampanyalı fiyatlar stoklarla sınırlıdır."
           </p>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto border-t border-white/5 py-12 text-center text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
         © 2026 Araçlara Dair Her Şey.
      </footer>
    </div>
  );
}
