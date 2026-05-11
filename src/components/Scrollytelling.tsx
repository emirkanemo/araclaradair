import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import scrollama from 'scrollama';
import { motion, AnimatePresence } from 'motion/react';
import { CAR_DATA } from '../data';
import { cn } from '../lib/utils';
import { ArrowDown } from 'lucide-react';

export default function Scrollytelling() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollama();

    scroller
      .setup({
        step: '.step',
        offset: 0.5,
        debug: false,
      })
      .onStepEnter((response) => {
        setIndex(response.index);
      });

    const handleResize = () => {
      window.requestAnimationFrame(() => {
        if (scroller) scroller.resize();
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scroller.destroy();
    };
  }, []);

  const currentCar = CAR_DATA[index];

  return (
    <div className="relative" ref={containerRef}>
      {/* Sticky Graphic */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0a0a0b]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCar.brand}
            initial={{ opacity: 0, scale: 1.1, x: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1.05, 
              x: 0,
              transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            exit={{ opacity: 0, scale: 1.2, x: -20, transition: { duration: 0.8 } }}
            className="absolute inset-0"
          >
            <img 
              src={currentCar.image} 
              alt={currentCar.brand}
              className="w-full h-full object-cover opacity-30 grayscale saturate-50 mix-blend-luminosity transform-gpu"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0b] via-transparent to-[#0a0a0b]/80" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentCar.brand}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ 
                duration: 1,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="text-center"
            >
              <span className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block">
                Editorial Price Index / 2026
              </span>
              <h2 className="text-8xl md:text-[14rem] font-serif italic font-black text-white leading-none tracking-tighter">
                {currentCar.brand}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Price Modal Overlay */}
        <div className="absolute bottom-16 right-16 max-w-sm w-full pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`prices-${currentCar.brand}`}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.9, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-white font-serif italic text-xl">
                  {currentCar.brand}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Katalog</span>
              </div>
              <div className="space-y-6">
                {currentCar.models.map((model, idx) => (
                  <motion.div 
                    key={model.name} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + (idx * 0.1), 
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-white/40 text-[10px] uppercase tracking-wider font-bold">{model.name}</span>
                    <span className="text-white font-mono text-sm tracking-tight">{(model as any).campaignPrice}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Steps */}
      <div className="relative px-6 flex flex-col gap-[70vh] pb-[40vh]">
        {CAR_DATA.map((car, i) => (
          <div 
            key={car.brand} 
            className="step min-h-screen flex items-center"
          >
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, margin: "-20%" }}
               className="max-w-lg bg-[#111113]/80 backdrop-blur-xl p-12 border border-white/5 relative group overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-6 text-[10px] font-mono text-white/20">
                  REF / 0{i + 1}
                </div>
                <h3 className="text-4xl font-serif text-white mb-6 leading-[1.1] italic">
                  {car.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm uppercase tracking-wide font-medium mb-8">
                  {car.description}
                </p>
                
                {(car as any).specs && (
                  <div className="mb-10 space-y-3">
                    <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 mb-4">Öne Çıkanlar</h4>
                    {(car as any).specs.map((spec: string) => (
                      <div key={spec} className="flex items-center gap-3 text-xs text-white/60">
                        <div className="w-1.5 h-[1px] bg-white/30" />
                        {spec}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <Link 
                    to={`/table/${car.brand.toLowerCase()}`}
                    className="text-white text-[10px] font-black tracking-[0.3em] uppercase border-b border-white/20 pb-2 hover:border-white transition-all hover:tracking-[0.4em] inline-block cursor-pointer"
                  >
                    Tabloyu Görüntüle
                  </Link>
                </div>
             </motion.div>
          </div>
        ))}
      </div>
      
      <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col gap-6 z-20">
        {CAR_DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const steps = document.querySelectorAll('.step');
              if (steps[i]) {
                steps[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="group py-2 px-1 focus:outline-none"
            aria-label={`Scroll to section ${i + 1}`}
          >
            <div 
              className={cn(
                "w-[1px] transition-all duration-700",
                index === i ? "h-12 bg-white" : "h-6 bg-white/10 group-hover:bg-white/40"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
