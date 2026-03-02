import React from "react";
import { cn } from "@/lib/utils";
import { 
  Cpu, Waves, Zap, ToggleLeft, 
  Timer, Radio, HardDrive, ArrowLeftRight, LayoutGrid 
} from "lucide-react";

const categories = [
  { value: "all", label: "Todos", icon: LayoutGrid },
  { value: "microcontrollers", label: "Microcontroladores", icon: Cpu },
  { value: "amplifiers", label: "Amplificadores", icon: Waves },
  { value: "voltage_regulators", label: "Reguladores", icon: Zap },
  { value: "logic_gates", label: "Compuertas Lógicas", icon: ToggleLeft },
  { value: "timers", label: "Temporizadores", icon: Timer },
  { value: "sensors", label: "Sensores", icon: Radio },
  { value: "memory", label: "Memoria", icon: HardDrive },
  { value: "converters", label: "Conversores", icon: ArrowLeftRight },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = selected === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-700/50"
            )}
          >
            <Icon className="w-4 h-4" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}