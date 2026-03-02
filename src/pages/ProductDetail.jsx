import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "@/products"; // Importamos la lista local
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Cpu, Package, CheckCircle2, XCircle } from "lucide-react";

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  
  // Buscamos el producto en nuestro archivo local
  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <p>Producto no encontrado</p>
        <Link to="/catalog"><Button className="mt-4">Volver al catálogo</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <Link to="/catalog" className="flex items-center gap-2 text-slate-400 mb-8 hover:text-cyan-400">
        <ArrowLeft size={16} /> Volver
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-10 flex justify-center border border-slate-800">
          <img src={product.image_url} alt={product.name} className="max-h-80 object-contain" />
        </div>

        <div>
          <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">{product.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate-400 mb-8 text-lg">{product.description}</p>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</div>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-6 text-lg font-bold">
              <ShoppingCart className="mr-2" /> Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
