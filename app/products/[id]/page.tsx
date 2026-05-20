'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { products } from '@/lib/products'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { Heart, Check, ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === params.id)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center space-y-6 px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Product not found</h1>
          <Button asChild variant="outline" className="rounded-sm">
            <Link href="/products" className="text-xs tracking-[0.12em] uppercase">Return to Collection</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) return

    setIsAdding(true)
    setTimeout(() => {
      addItem({
        productId: product.id,
        productName: product.name,
        color: selectedVariant.color,
        size: selectedSize,
        price: product.basePrice,
        image: selectedVariant.images[0],
      })
      setIsAdding(false)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }, 600)
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-secondary mb-3 sm:mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedVariant.color}-${currentImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedVariant.images[currentImageIndex]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {product.badge && (
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-semibold px-3 py-1 rounded-sm tracking-wider uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-3">
                {selectedVariant.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-sm overflow-hidden bg-secondary transition-all ${
                      currentImageIndex === idx
                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 64px, 80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent">
                  {product.category}
                </p>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-2">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <p className="text-xl sm:text-2xl font-bold">${product.basePrice}</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs sm:text-sm ${i < Math.floor(product.rating) ? 'text-accent' : 'text-border'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews})</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Color */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
                  Color
                </label>
                <span className="text-xs text-muted-foreground">{selectedVariant.color}</span>
              </div>
              <div className="flex gap-2 sm:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => {
                      setSelectedVariant(variant)
                      setCurrentImageIndex(0)
                    }}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all ${
                      selectedVariant === variant
                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-background scale-110'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: variant.colorCode }}
                    title={variant.color}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
                  Size
                </label>
                <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 sm:h-12 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all ${
                      selectedSize === size
                        ? 'bg-foreground text-white'
                        : 'border border-border text-foreground hover:border-foreground/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-muted-foreground">Please select a size</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex gap-2 sm:gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding || !selectedSize}
                  className={`flex-1 h-12 sm:h-14 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all ${
                    isAdded
                      ? 'bg-accent text-white'
                      : 'bg-foreground text-white hover:bg-foreground/90'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Adding
                      </motion.div>
                    ) : isAdded ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={16} /> Added
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={16} /> Add to Bag
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                <Button
                  variant="outline"
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-sm border-border transition-all ${
                    isWishlisted ? 'border-accent text-accent' : 'hover:border-foreground/30'
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart size={18} strokeWidth={1.5} className={isWishlisted ? 'fill-accent' : ''} />
                </Button>
              </div>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="p-4 rounded-sm border border-border">
                <p className="text-xs font-semibold text-foreground">Free Shipping</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Orders over $150</p>
              </div>
              <div className="p-4 rounded-sm border border-border">
                <p className="text-xs font-semibold text-foreground">Easy Returns</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
