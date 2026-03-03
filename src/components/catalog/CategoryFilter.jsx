import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Menu, X, Cpu, PenTool, 
  BatteryCharging, Zap, Filter 
} from "lucide-react";

// ESTAS SON TUS CATEGORÍAS REALES (Copiadas de tu products.js)
const categories = [
  { id: "all", name: "Todos los productos", icon: <Filter size={18} /> },
  { id: "Circuitos Integrados", name: "Integrados y FPC", icon: <Cpu size={18} /> },
  { id: "Herramientas e Insumos", name: "Herramientas e Insumos", icon: <PenTool size={18} /> },
  { id: "Capacitores SMD", name: "Capacitores SMD", icon: <BatteryCharging size={18} /> },
  { id: "Resistencias SMD", name: "Resistencias SMD", icon: <Zap size={18} /> },
];

export default function CategoryFilter({ selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id) => {
    onSelect(id);
    setIsOpen(false); // Cierra el menú al elegir uno en móvil
  };

  return (
    <div className="mb-8">
      {/* --- DISEÑO PARA CELULARES (Botón de Filtros) --- */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg">
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">Categoría</span>
          <span className="text-cyan-400 font-medium">
            {categories.find(c => c.id === selected)?.name}
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95"
        >
          <Menu size={18} /> Filtros
        </button>
      </div>

      {/* --- MENÚ LATERAL DESPLEGABLE (MÓVIL) --- */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-slate-950 z-[80] p-6 border-r border-slate-800 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white font-bold text-xl text-cyan-400">Categorías</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(cat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all font-medium border",
                    selected === cat.id
                      ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
                  )}
                >
                  <span className={selected === cat.id ? "text-cyan-400" : "text-slate-500"}>
                    {cat.icon}
                  </span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- DISEÑO PARA COMPUTADORA (Botones Horizontales) --- */}
      <div className="hidden lg:flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 font-semibold",
              selected === cat.id
                ? "bg-cyan-500 border-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-white"
            )}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
