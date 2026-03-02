import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ShoppingCart, Cpu, Package, Hash,
  CheckCircle2, XCircle, ExternalLink, Loader2
} from "lucide-react";

const categoryLabels = {
  microcontrollers: "Microcontrolador",
  amplifiers: "Amplificador",
  voltage_regulators: "Regulador de Voltaje",
  logic_gates: "Compuerta Lógica",
  timers: "Temporizador",
  sensors: "Sensor",
  memory: "Memoria",
  converters: "Conversor",
};

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => base44.entities.Product.filter({ id: productId }),
    select: (data) => data?.[0],
    enabled: !!productId,
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const existing = cartItems.find((i) => i.product_id === product.id);
      if (existing) {
        return base44.entities.CartItem.update(existing.id, { quantity: existing.quantity + 1 });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
        <p>Producto no encontrado</p>
        <Link to={createPageUrl("Catalog")}>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <Link to={createPageUrl("Catalog")} className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 flex items-center justify-center aspect-square">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-12" />
            ) : (
              <Cpu className="w-32 h-32 text-slate-600" />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 bg-cyan-500/5">
                {categoryLabels[product.category] || product.category}
              </Badge>
              {product.featured && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  Destacado
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{product.name}</h1>

            {product.manufacturer && (
              <p className="text-slate-400 text-sm mb-1">Fabricante: <span className="text-slate-300">{product.manufacturer}</span></p>
            )}
            {product.part_number && (
              <p className="text-slate-500 text-sm font-mono flex items-center gap-1 mb-6">
                <Hash className="w-3.5 h-3.5" /> {product.part_number}
              </p>
            )}

            <p className="text-slate-400 text-base leading-relaxed mb-8">{product.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {product.package_type && (
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Package className="w-3.5 h-3.5" /> Encapsulado
                  </div>
                  <p className="text-white font-medium">{product.package_type}</p>
                </div>
              )}
              {product.pins && (
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                  <div className="text-slate-500 text-xs mb-1">Pines</div>
                  <p className="text-white font-medium">{product.pins}</p>
                </div>
              )}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
                <div className="text-slate-500 text-xs mb-1">Disponibilidad</div>
                <p className={`font-medium flex items-center gap-1.5 ${inStock ? "text-green-400" : "text-red-400"}`}>
                  {inStock ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {inStock ? `${product.stock} en stock` : "Agotado"}
                </p>
              </div>
            </div>

            {/* Price + Add to cart */}
            <div className="mt-auto bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-slate-500 text-sm">Precio unitario</span>
                  <div className="text-4xl font-bold text-white">${product.price?.toFixed(2)} <span className="text-sm text-slate-500 font-normal">USD</span></div>
                </div>
              </div>
              <Button
                onClick={() => addToCartMutation.mutate()}
                disabled={!inStock || addToCartMutation.isPending}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-6 text-base rounded-xl disabled:opacity-40"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>
              {product.datasheet_url && (
                <a
                  href={product.datasheet_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Ver Datasheet
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}