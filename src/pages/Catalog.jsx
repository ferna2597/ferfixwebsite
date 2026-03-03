import React, { useState, useEffect } from "react";
import { ShoppingCart, MessageCircle, X, Trash2, Plus, Minus, CheckCircle } from "lucide-react";
import { productsData } from "@/products";

import HeroSection from "@/components/catalog/HeroSection";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  
  // 1. ESTADO DEL CARRITO (Carga lo guardado en el navegador)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("ferfix_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // 2. EFECTO: Guardar cambios en el carrito automáticamente
  useEffect(() => {
    localStorage.setItem("ferfix_cart", JSON.stringify(cart));
  }, [cart]);

  // 3. EFECTO: Auto-abrir carrito si venimos de ProductDetail
  useEffect(() => {
    const shouldOpen = localStorage.getItem("open_cart_now");
    if (shouldOpen === "true") {
      setIsCartOpen(true);
      localStorage.removeItem("open_cart_now"); // Limpiamos la señal
    }
  }, []);

  // 4. FUNCIÓN: Mostrar notificación temporal
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 5. LÓGICA DEL CARRITO
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
    showToast(`${product.name} agregado!`);
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const sendWhatsApp = () => {
    const phone = "5491100000000"; // <--- CAMBIA ESTO POR TU NÚMERO REAL
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

  // 6. FILTRADO DE PRODUCTOS
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
        <p className="text-slate-500 text-sm mb-6">{filtered.length} productos encontrados</p>

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

      {/* Botón Flotante de Carrito */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
      >
        <ShoppingCart size={28} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950">
            {cartCount}
          </span>
        )}
      </button>

      {/* Notificación (Toast) */}
      {toastMessage && (
        <div className="fixed bottom-24 right-8 z-[100] bg-slate-900 text-cyan-100 border border-cyan-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="text-cyan-400 w-5 h-5" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Sidebar del Carrito */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-85 max-w-[90%] bg-slate-900 shadow-2xl z-[60] p-6 border-l border-slate-800 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-xl text-cyan-400">Tu Pedido</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-slate-800 rounded-lg">
                <X className="text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingCart className="w-12 h-12 text-slate-700 mx-auto mb-4 opacity-20" />
                  <p className="text-slate-500">Tu carrito está vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-white font-medium text-sm leading-tight pr-4">{item.name}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-cyan-400 hover:bg-slate-800 rounded-md transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-white font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-cyan-400 hover:bg-slate-800 rounded-md transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-cyan-400 font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-6 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-white font-bold mb-4 text-lg">
                  <span>Total estimado:</span>
                  <span className="text-cyan-400">${cart.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}</span>
                </div>
                <button 
                  onClick={sendWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]"
                >
                  <MessageCircle size={20} />
                  Pedir por WhatsApp
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-3">Confirmaremos stock y envío por chat</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
