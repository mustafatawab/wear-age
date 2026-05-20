'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { Heart } from 'lucide-react'
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
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={displayImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-semibold px-3 py-1 rounded-sm tracking-wider uppercase">
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={isWishlisted ? 'fill-accent text-accent' : 'text-foreground/60'}
            />
          </button>

          {/* Quick Add */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <div className="bg-white/95 backdrop-blur-sm py-3 text-center text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground rounded-sm">
              Quick View
            </div>
          </motion.div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] font-medium">
              {product.category}
            </p>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-sm font-semibold mt-0.5 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <p className="text-sm font-semibold">${product.basePrice}</p>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5">
          {product.variants.map((variant, idx) => (
            <button
              key={variant.color}
              onClick={(e) => {
                e.preventDefault()
                setActiveVariantIndex(idx)
              }}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                activeVariantIndex === idx
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-background scale-110'
                  : 'opacity-50 hover:opacity-100'
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
