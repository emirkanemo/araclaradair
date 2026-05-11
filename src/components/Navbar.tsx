import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0b]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
        <h1 className="text-xl font-serif italic tracking-tighter text-white font-bold uppercase text-center">Araçlara Dair Her Şey</h1>
      </div>
    </nav>
  );
}
