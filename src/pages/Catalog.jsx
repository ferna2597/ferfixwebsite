import React, { useState } from "react";
import { ShoppingCart, MessageCircle, X, Trash2 } from "lucide-react";
import { productsData } from "@/products";

import HeroSection from "@/components/catalog/HeroSection";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const sendWhatsApp = () => {
    const phone = "5491100000000"; // <--- CAMBIA ESTO POR TU NÚMERO
    if (cart.length === 0) return;
    const itemText = cart
      .map((item) => `* ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const message = encodeURIComponent(
      `¡Hola FerFix! 👋 Me gustaría realizar el siguiente pedido:\n\n${itemText}\n\n*Total: $${total.toFixed(2)}*\n\n¿Tienen disponibilidad?`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const filtered = productsData.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryFilter selected={category} onSelect={setCategory} />
        
        <p className="text-slate-500 text-sm mb-6">
          {filtered.length} productos encontrados
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div>

      {/* Botón Flotante */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 rounded-full shadow-2xl shadow-cyan-500/20 transition-all hover:scale-110 active:scale-95"
      >
        <ShoppingCart size={28} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950">
            {cartCount}
          </span>
        )}
      </button>

      {/* Sidebar del Carrito */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-80 bg-slate-900 shadow-2xl z-[60] p-6 border-l border-slate-800 flex flex-col transition-transform">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-xl">Tu Pedido</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cart.length === 0 ? (
                <p className="text-slate-500 text-center mt-10">El carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                    <div className="text-sm">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-cyan-400">{item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 ml-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-6 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-white font-bold mb-4 text-lg">
                  <span>Total:</span>
                  <span>${cart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span>
                </div>
                <button 
                  onClick={sendWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20"
                >
                  <MessageCircle size={20} />
                  Pedir por WhatsApp
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
            }
