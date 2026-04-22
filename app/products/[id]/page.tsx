'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { products } from '@/lib/products'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Check, ArrowLeft, Info, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
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
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Product not found</h1>
          <Button asChild variant="outline" className="rounded-none border-white/10">
            <Link href="/products" className="font-bold tracking-widest uppercase text-xs">Return to Collection</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    setIsAdding(true)
    
    // Simulate luxury loader
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
    }, 800)
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation */}
        <Link href="/products" className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-accent transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Sticky Image Gallery */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32 flex flex-col-reverse lg:flex-row gap-6">
              
              {/* Vertical Thumbnails */}
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar">
                {selectedVariant.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === idx ? 'border-accent scale-105 shadow-xl shadow-accent/20' : 'border-white/5 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image with Crossfade */}
              <div className="flex-1 relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white/5 border border-white/5 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedVariant.color}-${currentImageIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedVariant.images[currentImageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-8 left-8">
                    <span className="bg-white text-black text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase shadow-2xl">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent">
                  {product.category}
                </p>
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                  {product.name}
                </h1>
              </div>
              
              <div className="flex items-center gap-6">
                <p className="text-4xl font-black tracking-tighter text-white">
                  ${product.basePrice}
                </p>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-accent' : 'text-white/10'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {product.reviews} Reviews
                  </span>
                </div>
              </div>

              <p className="text-lg text-white/60 font-light leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            {/* Urgency Indicators */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Info size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-white/90">Exclusive Drop</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  🔥 120 people viewing this item right now
                </p>
              </div>
            </div>

            {/* Variant Selectors */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Select Color</label>
                  <span className="text-[10px] font-black tracking-widest uppercase text-accent">{selectedVariant.color}</span>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.color}
                      onClick={() => {
                        setSelectedVariant(variant)
                        setCurrentImageIndex(0)
                      }}
                      className={`relative w-12 h-12 rounded-full transition-all duration-300 ${
                        selectedVariant === variant
                          ? 'ring-2 ring-accent ring-offset-4 ring-offset-[#0B0B0F] scale-110 shadow-xl shadow-accent/20'
                          : 'opacity-40 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: variant.colorCode }}
                      title={variant.color}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Select Size</label>
                  <button className="text-[10px] font-black tracking-widest uppercase text-white/20 hover:text-white transition-colors underline underline-offset-4">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 rounded-xl border-2 font-black tracking-widest uppercase text-xs transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-accent bg-accent text-black'
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-accent/80 uppercase tracking-widest">
                   ⚠️ Only 5 left in this size
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-8">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`flex-1 h-20 rounded-2xl font-black tracking-[0.2em] uppercase text-sm transition-all duration-500 overflow-hidden relative shadow-2xl ${
                    isAdded ? 'bg-accent text-black' : 'bg-white text-black hover:bg-white/90 button-glow'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.div
                        key="adding"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                         <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                         Processing
                      </motion.div>
                    ) : isAdded ? (
                      <motion.div
                        key="added"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={20} /> Added to Bag
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={20} /> Add to Bag
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
                
                <Button
                  variant="outline"
                  className={`w-20 h-20 rounded-2xl border-white/10 transition-all duration-300 ${
                    isWishlisted ? 'bg-white/5 border-accent text-accent' : 'hover:bg-white/5'
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    size={24}
                    className={isWishlisted ? 'fill-accent' : ''}
                  />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                className="w-full h-12 text-white/20 hover:text-white transition-colors font-black tracking-widest text-[10px] uppercase gap-2"
              >
                <Share2 size={16} /> Share this item
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-white/5 bg-white/2[0.02] space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-accent">Free Shipping</p>
                 <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase">Worldwide delivery on orders over $150</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/2[0.02] space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-accent-purple">Returns</p>
                 <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase">30-day effortless collection & return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

