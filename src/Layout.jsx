import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Cpu } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to={createPageUrl("Catalog")} className="flex items-center gap-2.5 group">
            <img 
              src="/favicon.png" 
              alt="Logo FerFix" 
              className="w-9 h-9 object-contain" // Ajusté el tamaño para que luzca bien
            />
            <span className="text-white font-bold text-lg tracking-tight">
              FerFix<span className="text-cyan-400"> Soluciones</span>
            </span>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );

}


