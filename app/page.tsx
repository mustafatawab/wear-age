'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/products'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)
  const newArrivals = products.filter((p) => p.badge === 'New').slice(0, 4)
  const bestsellers = products.filter((p) => p.badge === 'Bestseller').slice(0, 4)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

        {/* Decorative Line */}
        <div className="absolute top-32 left-4 sm:left-6 lg:left-8 w-px h-20 bg-border hidden sm:block" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-6 sm:w-8 h-px bg-accent" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Spring / Summer 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-foreground mb-6 sm:mb-8"
            >
              Engineered
              <br />
              <span className="text-muted-foreground">for the</span>
              <br />
              modern era
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={staggerItem}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8 sm:mb-12"
            >
              Premium menswear where architectural precision meets everyday comfort. Designed for those who lead, not follow.
            </motion.p>

            {/* CTA */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 bg-foreground text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase rounded-sm hover:bg-foreground/90 transition-colors"
              >
                Explore Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?category=jackets"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-foreground border border-border rounded-sm hover:border-foreground/30 transition-colors"
              >
                View Outerwear
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          style={{ y, opacity }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] sm:w-[40%] lg:w-[35%] h-[60vh] sm:h-[70vh] hidden md:block"
        >
          <div className="relative h-full w-full overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80"
              alt="Wear Age Collection"
              fill
              sizes="(max-width: 768px) 40vw, 35vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/50" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Scroll</span>
          <div className="w-px h-6 sm:h-8 bg-border relative overflow-hidden">
            <motion.div
              animate={{ y: [-12, 12] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-3 sm:h-4 bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <section className="py-5 sm:py-6 border-y border-border overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6">
              <span className="text-[10px] sm:text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                Premium Quality
              </span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-[10px] sm:text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                Free Shipping
              </span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-[10px] sm:text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                Sustainable Materials
              </span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-[10px] sm:text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                30-Day Returns
              </span>
              <span className="w-1 h-1 rounded-full bg-accent" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent">Curated</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 sm:mt-3">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-14">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1000&q=80"
                alt="Wear Age Editorial"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent">Philosophy</span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mt-2 sm:mt-3">
                  Less noise,
                  <br />
                  more intention
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-muted-foreground leading-relaxed max-w-md text-sm sm:text-base"
              >
                Every piece in our collection is designed with purpose. We strip away the unnecessary and focus on what matters: premium materials, precise construction, and timeless silhouettes that work as hard as you do.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-border"
              >
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">10k+</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Members</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">50+</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Drops</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">2026</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Founded</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent">Just Landed</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 sm:mt-3">
              New Arrivals
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
            {newArrivals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent">Most Popular</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 sm:mt-3">
              Bestsellers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
            {bestsellers.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-foreground text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto space-y-6 sm:space-y-8"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Join the movement
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">
              Get early access to new drops, exclusive offers, and style insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2 sm:pt-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase rounded-sm hover:bg-accent/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
