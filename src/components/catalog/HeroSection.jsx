import React from "react";
import { motion } from "framer-motion";
import { Cpu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HeroSection({ searchQuery, onSearchChange }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 py-16 md:py-24">
      {/* Animated circuit pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border border-cyan-400 rounded-full" />
        <div className="absolute top-20 right-20 w-60 h-60 border border-cyan-400/30 rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-32 h-32 border border-cyan-400/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-px h-40 bg-gradient-to-b from-cyan-400/40 to-transparent" />
        <div className="absolute top-1/3 right-1/3 w-px h-60 bg-gradient-to-b from-cyan-400/20 to-transparent" />
        <div className="absolute top-10 left-1/2 w-80 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium tracking-wide">Circuitos Integrados</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Componentes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Electrónicos</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            La mejor selección de circuitos integrados para tus proyectos. Microcontroladores, amplificadores, reguladores y más.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto relative"
        >
 