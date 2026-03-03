import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Menu, X, Chip, Cpu, PenTool, 
  BatteryCharging, Zap, Filter 
} from "lucide-react";

// Estas categorías coinciden EXACTAMENTE con tu products.js
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
      {/* --- VISTA PARA MÓVIL (Botón Hamburguesa de Filtros) --- */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        <span className="text-slate-400 text-sm font-medium">
          Categoría: <span className="text-cyan-400">{categories.find(c => c.id === selected)?.name}</span>
        </span>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-bold text-sm"
        >
          <Menu size={18} /> Filtros
        </button>
      </div>

      {/* --- OVERLAY Y MENÚ LATERAL (MÓVIL) --- */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-slate-950 z-[80] p-6 border-r border-slate-800 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white font-bold text-xl">Categorías</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400"><X /></button>
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(cat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    selected === cat.id
                      ? "bg-cyan-500/10 border border-cyan-500/50 text-cyan-400"
                      : "text-slate-400 hover:bg-slate-900"
                  )}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- VISTA PARA PC (Botones Horizontales Elegantes) --- */}
      <div className="hidden lg:flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 font-medium",
              selected === cat.id
                ? "bg-cyan-500 border-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-cyan-500/50 hover:text-white"
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
