import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { productsData } from "@/products"; // Importamos la lista local

import HeroSection from "@/components/catalog/HeroSection";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import ProductCard from "@/components/catalog/ProductCard";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = productsData.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950">
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
              onAddToCart={() => alert("Agregado: " + product.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
