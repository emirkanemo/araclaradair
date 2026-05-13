import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import { OTHER_NEWS } from './data';
import { Clock, ArrowRight, Share2, Bookmark } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase font-black tracking-[0.6em] text-white/30 mb-8 block"
            >
              Journal / Newsroom
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-9xl font-serif italic font-black text-white leading-[0.85] tracking-tighter"
            >
              Otomobil<br />Haberleri.
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block pb-4"
          >
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] vertical-text">
              Updated Daily • 2026
            </p>
          </motion.div>
        </header>

        {/* Featured News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          {OTHER_NEWS.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${i === 0 ? 'lg:col-span-12 group' : 'lg:col-span-6 group'}`}
            >
              <Link to={`/news/${news.id}`} className="block relative">
                <div className={`relative overflow-hidden bg-white/5 border border-white/10 rounded-sm mb-8 transition-all duration-700 group-hover:border-white/20 ${i === 0 ? 'aspect-[21/9]' : 'aspect-video'}`}>
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <span className="text-[9px] uppercase font-black tracking-[0.4em] text-white py-1 px-4 border border-white/20 rounded-full">
                    {news.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/30 text-[9px] font-mono">
                    <Clock className="w-3 h-3" /> {news.date}
                  </div>
                </div>

                <h3 className={`${i === 0 ? 'text-4xl md:text-6xl' : 'text-3xl'} font-serif italic font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500`}>
                  {news.title}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-8 line-clamp-2">
                  {news.excerpt}
                </p>

                <div className="flex items-center gap-4 text-white/20 text-[9px] font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                  DEVAMINI OKU <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <section className="bg-white text-black p-12 md:p-24 rounded-sm flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-serif italic font-bold tracking-tighter mb-6">Haberleri Kaçırmayın.</h2>
            <p className="text-black/60 text-sm uppercase tracking-widest font-bold">Özel dosyalar ve haftalık özetler için bültene abone olun.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
             <input 
              type="email" 
              placeholder="E-POSTA ADRESİ"
              className="bg-black/5 border-b-2 border-black/10 px-6 py-4 text-[10px] font-black tracking-widest outline-none focus:border-black transition-all w-full md:w-80"
             />
             <button className="bg-black text-white px-10 py-4 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-black/90 transition-all">KATIL</button>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
         <span className="text-[9px] font-black tracking-[0.4em] text-white/10 uppercase">
            © 2026 Automotive Archive
         </span>
      </footer>
    </div>
  );
}
