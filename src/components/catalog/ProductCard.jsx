import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Cpu, Package, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const categoryLabels = {
  microcontrollers: "Microcontrolador",
  amplifiers: "Amplificador",
  voltage_regulators: "Regulador",
  logic_gates: "Compuerta Lógica",
  timers: "Temporizador",
  sensors: "Sensor",
  memory: "Memoria",
  converters: "Conversor",
};

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const inStock = product.stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="group relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col h-full">
        {/* Image / Placeholder */}
        <Link to={createPageUrl("ProductDetail") + `?id=${product.id}`}>
          <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Cpu className="w-16 h-16 text-slate-600 group-hover:text-cyan-500/40 transition-colors duration-300" />
                <span className="text-xs text-slate-600 font-mono">{product.part_number || "IC"}</span>
              </div>
            )}
            {product.featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                  Destacado
                </Badge>
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                <span className="text-slate-300 font-medium text-sm bg-slate-800/80 px-3 py-1 rounded-full">Agotado</span>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-500/30 bg-cyan-500/5 shrink-0">
              {categoryLabels[product.category] || product.category}
            </Badge>
            {product.manufacturer && (
              <span className="text-xs text-slate-500 font-medium truncate">{product.manufacturer}</span>
            )}
          </div>

          <Link to={createPageUrl("ProductDetail") + `?id=${product.id}`}>
            <h3 className="text-white font-semibold text-base mb-1 group-hover:text-cyan-300 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          {product.part_number && (
            <p className="text-slate-500 text-xs font-mono mb-2 flex items-center gap-1">
              <Hash className="w-3 h-3" />
              {product.part_number}
            </p>
          )}

          <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
            {product.description}
          </p>

          {/* Details chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.package_type && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-700/50 rounded-md px-2 py-1">
                <Package className="w-3 h-3" />
                {product.package_type}
              </span>
            )}
            {product.pins && (
              <span className="text-xs text-slate-400 bg-slate-700/50 rounded-md px-2 py-1">
                {product.pins} pines
              </span>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-700/50">
            <div>
              <span className="text-2xl font-bold text-white">${product.price?.toFixed(2)}</span>
              <span className="text-slate-500 text-xs ml-1">USD</span>
            </div>
            <Button
              size="sm"
              disabled={!inStock}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl px-4 disabled:opacity-40"
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}