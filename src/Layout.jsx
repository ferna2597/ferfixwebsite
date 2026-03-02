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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Fer<span className="text-cyan-400">Fix-Soluciones</span>
            </span>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );

}
