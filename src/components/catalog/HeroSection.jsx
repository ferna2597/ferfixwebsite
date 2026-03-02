import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // Quitamos Cpu de aquí
import { Input } from "@/components/ui/input";

export default function HeroSection({ searchQuery, onSearchChange }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 py-16 md:py-24">
      {/* Fondo con circuitos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border border-cyan-400 rounded-full" />
        {/* ... (el resto de tus adornos de fondo) ... */}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* AQUÍ ESTÁ TU LOGO GRANDE */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              {/* Efecto de resplandor atrás del logo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <img 
                src="/favicon.png" 
                alt="Logo FerFix" 
                className="relative w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            FerFix <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Soluciones</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Expertos en la mejor selección de componentes electrónicos para tus proyectos.
          </p>
        </motion.div>

        {/* Buscador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Buscar componentes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-6 text-base bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 backdrop-blur-sm"
          />
        </motion.div>
      </div>
    </div>
  );
}
    </div>
  );
}

