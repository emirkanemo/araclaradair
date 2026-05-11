import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Newspaper, Gauge, MapPin, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';

const SECTIONS = [
  {
    title: "Mayıs Analizi",
    description: "2026 Otomotiv dünyasına derinlemesine bakış, trendler ve teknik veriler.",
    link: "/analysis",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-500/20"
  },
  {
    title: "Otomobil Haberleri",
    description: "En güncel lansmanlar, teknoloji haberleri ve sektörel gelişmeler.",
    link: "/analysis#news-section",
    icon: Newspaper,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200",
    color: "from-emerald-500/20"
  },
  {
    title: "Yakıt İstasyonları",
    description: "İstanbul genelindeki istasyon ağları, puanlamalar ve lokasyonlar.",
    link: "/gas-stations",
    icon: MapPin,
    image: "https://www.otoraf.com/wp-content/uploads/2020/07/BP.jpg",
    color: "from-amber-500/20"
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <Navbar />
      
      <main className="relative pt-32 pb-20">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-20 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px]" />
           <div className="absolute bottom-20 right-0 w-96 h-96 bg-white/[0.01] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="mb-24 text-center max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase font-black tracking-[0.6em] text-white/30 mb-8 block"
            >
              Automotive 2026 / Platform
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif italic font-black text-white leading-[0.9] tracking-tighter"
            >
              Geleceği<br />Bugün Keşfedin.
            </motion.h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.1) }}
              >
                <Link 
                  to={section.link}
                  className="group relative block aspect-[4/5] bg-white/5 border border-white/10 rounded-sm overflow-hidden"
                >
                  {/* Background Image */}
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${section.color} via-transparent to-transparent`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <section.icon className="w-8 h-8 text-white/40 mb-6 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                    <h3 className="text-3xl font-serif italic text-white mb-4 group-hover:translate-x-2 transition-transform">
                      {section.title}
                    </h3>
                    <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-widest font-medium mb-8">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-3 text-white/20 text-[9px] font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                      İncele <ArrowRight className="w-3 h-3 group-hover:translate-x-3 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="absolute bottom-12 left-12">
         <span className="text-[9px] font-black tracking-[0.4em] text-white/10 uppercase">
            © 2026 Digital Experience
         </span>
      </div>
    </div>
  );
}
