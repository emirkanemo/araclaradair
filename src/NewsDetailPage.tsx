import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { OTHER_NEWS } from './data';
import Navbar from './components/Navbar';

export default function NewsDetailPage() {
  const { id } = useParams();
  const news = OTHER_NEWS.find(n => n.id === Number(id));

  if (!news) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Haber Bulunamadı</h1>
          <Link to="/" className="text-white/40 uppercase tracking-widest text-xs hover:text-white transition-colors">Ana Sayfa</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e0e0e0]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black tracking-[0.3em] uppercase mb-12 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Geri Dön
          </Link>
          
          <div className="flex items-center gap-4 mb-8">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <Tag className="w-2.5 h-2.5" /> {news.category}
             </span>
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 flex items-center gap-2">
                <Clock className="w-3 h-3" /> {news.date}
             </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif italic font-black text-white leading-tight tracking-tighter mb-10">
            {news.title}
          </h1>
          
          <p className="text-xl text-white/50 leading-relaxed font-medium mb-12 border-l-2 border-white/10 pl-8">
            {news.excerpt}
          </p>
        </div>

        {news.image && (
          <div className="aspect-[21/9] rounded-sm overflow-hidden mb-16 border border-white/5 shadow-2xl">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-emerald max-w-none 
          prose-headings:font-serif prose-headings:italic prose-headings:tracking-tighter prose-headings:text-white
          prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-white prose-strong:font-bold
          prose-li:text-white/70
          prose-hr:border-white/10
          prose-blockquote:border-white/20 prose-blockquote:text-white/60 prose-blockquote:italic
          prose-table:border prose-table:border-white/10
          prose-th:bg-white/5 prose-th:p-4 prose-th:text-white/40 prose-th:uppercase prose-th:tracking-widest prose-th:text-[10px]
          prose-td:p-4 prose-td:border-t prose-td:border-white/5 prose-td:text-white/80
        ">
          <ReactMarkdown>{news.content || ''}</ReactMarkdown>
        </div>

        <div className="mt-32 p-12 bg-white/[0.02] border border-white/5 rounded-sm flex flex-col items-center text-center">
           <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 mb-6">Paylaş</h4>
           <div className="flex gap-8 text-white/30 text-xs font-bold uppercase tracking-widest">
              <button className="hover:text-white transition-colors cursor-pointer">Twitter</button>
              <button className="hover:text-white transition-colors cursor-pointer">WhatsApp</button>
              <button className="hover:text-white transition-colors cursor-pointer">Link Kopyala</button>
           </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto border-t border-white/5 py-12 text-center text-white/10 text-[9px] font-black uppercase tracking-[0.4em]">
         © 2026 Araçlara Dair Her Şey.
      </footer>
    </div>
  );
}
