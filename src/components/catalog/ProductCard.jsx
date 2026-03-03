import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Cpu, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Mapeo de categorías para que se vean bien en la tarjeta
const categoryLabels = {
  "Circuitos Integrados": "Integrado / FPC",
  "Herramientas e Insumos": "Herramientas",
  "Capacitores SMD": "Capacitor SMD",
  "Resistencias SMD": "Resistencia SMD",
};

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  // Asumimos que hay stock si no está definido el campo
  const inStock = product.stock !== undefined ? product.stock > 0 : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col h-full">
        
        {/* Imagen o Icono */}
        <Link to={`/product/${product.id}`}>
          <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
            {product.image_url && !product.image_url.includes("generic") ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                {/* Icono dinámico según categoría */}
                {product.category === "Circuitos Integrados" ? (
                   <Cpu className="w-16 h-16 text-slate-700 group-hover:text-cyan-500/40 transition-colors" />
                ) : (
                   <Zap className="w-16 h-16 text-slate-700 group-hover:text-cyan-400/40 transition-colors" />
                )}
                <span className="text-[10px] text-slate-600 font-mono uppercase">FerFix Parts</span>
              </div>
            )}
            
            {!inStock && (
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                <span className="text-slate-300 font-medium text-sm bg-slate-800/80 px-3 py-1 rounded-full">Sin Stock</span>
              </div>
            )}
          </div>
        </Link>

        {/* Contenido */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-[10px] uppercase text-cyan-400 border-cyan-500/30 bg-cyan-500/5 shrink-0 px-2 py-0">
              {categoryLabels[product.category] || product.category}
            </Badge>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-white font-semibold text-base mb-1 group-hover:text-cyan-300 transition-colors leading-tight min-h-[2.5rem] line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-1 leading-relaxed">
            {product.description || "Componente de alta calidad para micro-electrónica."}
          </p>

          {/* Precio en ARS */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/50">
            <div>
              <span className="text-xl font-bold text-white">
                ${product.price?.toLocaleString('es-AR')}
              </span>
              <span className="text-slate-500 text-[10px] ml-1 uppercase">ARS</span>
            </div>
            
            <Button
              size="sm"
              disabled={!inStock}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg px-3 h-9 transition-all active:scale-90"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Añadir
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
