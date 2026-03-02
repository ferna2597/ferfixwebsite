import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import HeroSection from "@/components/catalog/HeroSection";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";
import CartDrawer from "@/components/catalog/CartDrawer";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list("-created_date", 100),
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const addToCartMutation = useMutation({
    mutationFn: async (product) => {
      const existing = cartItems.find((i) => i.product_id === product.id);
      if (existing) {
        return base44.entities.CartItem.update(existing.id, {
          quantity: existing.quantity + 1,
        });
      }
      return base44.entities.CartItem.create({
        product_id: product.id,
        product_name: product.name,
        quantity: 1,
        unit_price: product.price,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Producto agregado al carrito");
    },
  });

  const updateQtyMutation = useMutation({
    mutationFn: ({ id, quantity }) => {
      if (quantity <= 0) return base44.entities.CartItem.delete(id);
      return base44.entities.CartItem.update(id, { quantity });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: (id) => base44.entities.CartItem.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const filtered = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.name?.toLowerCase().includes(q) ||
      p.part_number?.toLowerCase().includes(q) ||
      p.manufacturer?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full p-4 shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalCartItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalCartItems}
          </span>
        )}
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="mb-8">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-500 text-sm">
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No se encontraron productos</p>
            <p className="text-slate-600 text-sm mt-1">Intenta con otra búsqueda o categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onAddToCart={(p) => addToCartMutation.mutate(p)}
              />
            ))}
          </div>
        )}
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={setCartOpen}
        items={cartItems}
        onUpdateQty={(id, qty) => updateQtyMutation.mutate({ id, quantity: qty })}
        onRemove={(id) => removeItemMutation.mutate(id)}
      />
    </div>
  );
}