'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/products'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)
  const newArrivals = products.filter((p) => p.badge === 'New').slice(0, 4)
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const headlineLines = ["OWN THE", "FUTURE", "OF STYLE"]

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      {/* Asymmetrical Hero Section */}
      <section 
        ref={containerRef}
        className="relative min-h-[100svh] lg:h-[100vh] flex items-center overflow-hidden pt-20"
      >
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          
          {/* Left: Oversized Typography */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-xl"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">New Era Collection</span>
            </motion.div>

            <div className="space-y-2">
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase ${
                      i === 1 ? 'text-gradient-neon' : 'text-white'
                    }`}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-xl text-white/50 max-w-xl font-light leading-relaxed"
            >
              Experience the convergence of high-fashion and futuristic engineering. 
              Designed for those who lead, not follow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="group relative h-16 px-10 bg-white text-black hover:bg-white/90 transition-all duration-500 rounded-none button-glow"
              >
                <Link href="/products" className="flex items-center gap-3">
                  <span className="font-black tracking-[0.2em] text-xs">EXPLORE COLLECTION</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: Full-height Model Image */}
          <div className="lg:col-span-5 relative h-[60vh] lg:h-[90vh]">
            <motion.div 
              style={{ y: imageY }}
              className="absolute inset-0 z-10"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
                 <Image 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
                  alt="High Fashion Model"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20 bg-white text-black p-6 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
              >
                <p className="text-[10px] font-black tracking-widest uppercase mb-1">Limited Drop</p>
                <p className="text-2xl font-black tracking-tighter">04 / 50</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 -left-10 z-20 bg-accent p-4 rounded-xl shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="User" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-black/60 uppercase">Recently Purchased</p>
                    <p className="text-xs font-black text-black">Minimal Crew Neck</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10 animate-pulse" />
          </div>
        </div>

        {/* Marquee Text Strip */}
        <div className="absolute bottom-0 left-0 right-0 py-8 bg-accent/5 border-y border-white/5 overflow-hidden z-30 backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                <span className="text-2xl font-black tracking-tighter text-white/20 uppercase">Wear Age — Future Streetwear</span>
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-2xl font-black tracking-tighter text-white/20 uppercase">Redefining Aesthetics</span>
                <span className="w-2 h-2 rounded-full bg-accent-purple" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Featured Products */}
      <section className="py-32 container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              The <span className="text-gradient-neon">Curated</span> <br /> Selection
            </h2>
            <p className="text-white/40 max-w-sm uppercase text-[10px] font-bold tracking-[0.2em]">High-performance essentials engineered for the modern aesthetic.</p>
          </motion.div>
          
          <Link href="/products" className="group flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase hover:text-accent transition-colors">
            View All Products
            <div className="p-3 rounded-full border border-white/10 group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {featuredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Horizontal Scroll Showcase (Placeholder) */}
      <section className="py-32 bg-accent/5 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 mb-16">
           <h3 className="text-3xl font-black uppercase tracking-tighter">New Arrivals</h3>
        </div>
        <div className="flex gap-8 px-6 lg:px-12 overflow-x-auto pb-12 no-scrollbar">
          {newArrivals.map((product) => (
            <div key={product.id} className="min-w-[300px] md:min-w-[400px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12"
          >
            We are <br /> <span className="stroke-text opacity-30">Wear Age</span>
          </motion.h2>
          <p className="text-xl md:text-3xl font-light text-white/40 max-w-3xl mx-auto leading-relaxed mb-16">
            Pushing the boundaries of garment construction and digital style. Our mission is to engineer the wardrobe of the future.
          </p>
          <div className="flex justify-center gap-12 md:gap-24">
            <div>
              <p className="text-4xl md:text-6xl font-black mb-2">10k+</p>
              <p className="text-[10px] font-black tracking-[0.3em] text-accent uppercase">Members</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-black mb-2">50+</p>
              <p className="text-[10px] font-black tracking-[0.3em] text-accent-purple uppercase">Drops</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-black mb-2">2026</p>
              <p className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Founded</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


