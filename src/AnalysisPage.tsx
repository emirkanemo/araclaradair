import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Scrollytelling from './components/Scrollytelling';
import { OTHER_NEWS } from './data';
import { ArrowRight, Clock } from 'lucide-react';

export default function AnalysisPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#news-section') {
      const element = document.getElementById('news-section');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e0e0e0]">
      <Navbar />
      
      {/* Hero Section */}
      <header className="pt-32 pb-24 px-6 max-w-7xl mx-auto border-x border-white/5">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20 px-8">
          <div className="md:w-2/3">
            <h1 className="text-7xl md:text-[10rem] font-serif font-black text-white leading-[0.85] tracking-tighter italic">
              Mayıs<br />Analizi.
            </h1>
          </div>
          <div className="md:w-1/3 pb-4">
             <p className="text-sm text-white/50 leading-relaxed uppercase tracking-widest font-medium border-l border-white/20 pl-8">
              Türkiye otomobil pazarındaki değişimleri markaların güncel fiyat stratejileri üzerinden derinlemesine bir bakış ile sunuyoruz.
            </p>
          </div>
        </div>
      </header>

      {/* Scrollytelling Section */}
      <section id="price-lists" className="relative">
        <div className="px-6 max-w-7xl mx-auto py-12 flex justify-between items-end border-x border-white/5 border-t border-white/5">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-3">Interactive Index</h2>
            <p className="text-3xl font-serif text-white italic">Fiyat İndeksi</p>
          </div>
          <div className="flex items-center gap-3 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <div className="w-8 h-[1px] bg-white/10" />
            Aşağıya kaydırın
          </div>
        </div>
        <Scrollytelling />
      </section>

      {/* Other News Section */}
      <section id="news-section" className="max-w-7xl mx-auto px-6 py-40 border-x border-white/5">
        <div className="flex items-center justify-between border-b border-white/10 pb-12 mb-20 px-8">
          <h2 className="text-5xl font-serif italic font-bold text-white tracking-tight">Manşetler</h2>
          <button className="flex items-center gap-3 text-white/30 hover:text-white transition-all uppercase text-[10px] font-black tracking-[0.3em]">
            Arşiv <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-8">
          {OTHER_NEWS.map((news, i) => (
            <Link key={news.id} to={`/news/${news.id}`} className="block group cursor-pointer relative">
              <article>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/80 bg-white/5 px-4 py-1.5 rounded-sm border border-white/5">
                    {news.category}
                  </span>
                  <span className="h-[1px] w-6 bg-white/10" />
                  <span className="flex items-center gap-2 text-white/30 text-[9px] font-mono tracking-tighter">
                    <Clock className="w-3 h-3 opacity-50" /> {news.date}
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-white group-hover:text-white/60 transition-all mb-6 leading-tight italic">
                  {news.title}
                </h3>
                <p className="text-white/40 leading-relaxed mb-10 text-sm font-medium tracking-wide prose prose-invert overflow-hidden line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex items-center gap-3 text-white/30 font-black text-[9px] uppercase tracking-[0.4em] w-fit group-hover:text-white group-hover:gap-6 transition-all duration-500">
                  Read More <div className="w-8 h-[1px] bg-current" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 text-white py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-serif italic font-black mb-10 tracking-tighter uppercase">Araçlara Dair Her Şey</h2>
            <p className="text-white/30 max-w-sm leading-relaxed text-xs uppercase tracking-[0.2em] font-bold">
              Bütik içerik platformu. En güncel veriler ve scrollytelling ile anlatılan mobilitenin hikayesi.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-10 text-white/20 italic">Bölümler</h4>
            <ul className="space-y-6 text-white/40 text-[10px] font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">Elektrikli Araçlar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sürdürülebilirlik</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tasarım</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Klasikler</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black mb-10 text-white/20 italic">Abonelik</h4>
            <p className="text-white/30 text-[10px] font-bold mb-8 uppercase tracking-widest leading-relaxed">Özel dosyalar için bültene katılın.</p>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="E-POSTA" 
                className="bg-white/5 border border-white/10 px-6 py-4 rounded-sm text-[10px] font-bold tracking-widest focus:border-white transition-all text-white placeholder:text-white/20 outline-none"
              />
              <button className="bg-white text-black px-6 py-4 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white/90 transition-submit">GÖNDER</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
           <span>© 2026 Araçlara Dair Her Şey.</span>
           <div className="flex gap-12">
             <a href="#" className="hover:text-white/30 transition-colors">Gizlilik</a>
             <a href="#" className="hover:text-white/30 transition-colors">Künye</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
