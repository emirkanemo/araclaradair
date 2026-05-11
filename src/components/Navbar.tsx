import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNewsClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('news-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we are not on home, let the Link handle it or manually navigate
      navigate('/#news-section');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0b]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex-1">
          <h1 className="text-xl font-serif italic tracking-tighter text-white font-bold uppercase">Araçlara Dair Her Şey</h1>
        </Link>
        <div className="flex items-center gap-12">
          <Link 
            to="/gas-stations"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
          >
            İstasyonlar
          </Link>
          <Link 
            to="/#news-section"
            onClick={handleNewsClick}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
          >
            Haberler
          </Link>
        </div>
        <div className="flex-1" /> {/* Spacer for centering if needed, but justify-between is fine */}
      </div>
    </nav>
  );
}
