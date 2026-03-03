import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { productsData } from "@/products"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const navigate = useNavigate(); // Para volver al catálogo automáticamente
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  
  const product = productsData.find(p => p.id === productId);

  // --- NUEVA FUNCIÓN: AGREGAR AL CARRITO ---
  const handleAddToCart = () => {
    // 1. Obtener lo que ya hay en el carrito (o un array vacío si no hay nada)
    const currentCart = JSON.parse(localStorage.getItem("ferfix_cart") || "[]");
    
    // 2. Ver si el producto ya está
    const existingIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    
    // 3. Guardar en la memoria del navegador
    localStorage.setItem("ferfix_cart", JSON.stringify(currentCart));
    
    // 4. Feedback al usuario y volvemos al catálogo para que vea el carrito
    alert(`¡${product.name} agregado!`);
    navigate("/catalog"); 
  };

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
      <Link to="/catalog" className="flex items-center gap-2 text-slate-400 mb-8 hover:text-cyan-400 transition-colors">
        <ArrowLeft size={16} /> Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-10 flex justify-center border border-slate-800 shadow-xl">
          <img src={product.image_url} alt={product.name} className="max-h-80 object-contain" />
        </div>

        <div>
          <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">{product.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate-400 mb-8 text-lg leading-relaxed">{product.description}</p>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="text-3xl font-bold mb-6 text-cyan-400">${product.price.toFixed(2)}</div>
            
            {/* BOTÓN ACTUALIZADO */}
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-6 text-lg font-bold shadow-lg shadow-cyan-500/20 transition-all"
            >
              <ShoppingCart className="mr-2" /> Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
