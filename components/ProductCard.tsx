'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { Heart, Plus } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const activeVariant = product.variants[activeVariantIndex]
  const displayImage = activeVariant.images[0]

  return (
    <motion.div 
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/products/${product.id}`} className="block overflow-hidden relative aspect-[4/5] bg-muted rounded-[20px] shadow-sm group-hover:shadow-2xl transition-all duration-500">
        {/* Product Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </motion.div>
        </AnimatePresence>

        {/* Glassmorphism Overlay on Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500" />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-6 left-6 right-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16, 1, 0.3, 1]">
          <button className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all shadow-xl flex items-center justify-center gap-2">
            <Plus size={16} /> Quick Add
          </button>
        </div>

        {/* Premium Badge Tags */}
        {product.badge && (
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg border border-white/20">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-6 right-6 z-20 transition-transform duration-300 hover:scale-110 p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/10"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-accent text-accent' : 'text-white'}
          />
        </button>
      </Link>

      {/* Product Info */}
      <div className="pt-6 px-2 space-y-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">
              {product.category}
            </p>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-base font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <p className="text-lg font-black tracking-tighter text-white/90">${product.basePrice}</p>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 h-6">
          {product.variants.map((variant, idx) => (
            <button
              key={variant.color}
              onClick={() => setActiveVariantIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeVariantIndex === idx ? 'ring-2 ring-accent ring-offset-2 ring-offset-[#0B0B0F] scale-125' : 'opacity-40 hover:opacity-100'
              }`}
              style={{ backgroundColor: variant.colorCode }}
              title={variant.color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}


