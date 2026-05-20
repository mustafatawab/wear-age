'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-accent" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Our Story</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
            >
              Built with intention,
              <br />
              <span className="text-muted-foreground">worn with purpose</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Editorial Image */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[21/9] rounded-sm overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80"
              alt="Wear Age Studio"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">The Beginning</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Where it started
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Wear Age was born from a simple frustration: the gap between fast fashion and overpriced luxury. We believed there had to be a better way — clothing that respects both your wallet and the planet.
                </p>
                <p>
                  Founded in 2026 in Islamabad, we set out to create a brand that bridges the divide. Premium materials, thoughtful construction, and honest pricing. No logos shouting for attention. Just clean design that speaks for itself.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Our workshop"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">What We Stand For</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-3">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: 'Quality First',
                desc: 'Every garment is crafted from premium materials sourced from trusted suppliers. We test every fabric for durability, comfort, and feel.',
                num: '01',
              },
              {
                title: 'Sustainable',
                desc: 'We believe fashion shouldnt cost the earth. Our production minimizes waste, uses eco-friendly processes, and prioritizes longevity over trends.',
                num: '02',
              },
              {
                title: 'Honest Pricing',
                desc: 'No markup madness. We price our pieces fairly, cutting out the middlemen so you pay for quality, not branding.',
                num: '03',
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-8 border border-border rounded-sm group hover:border-accent/30 transition-colors"
              >
                <span className="text-xs font-mono text-accent/60">{value.num}</span>
                <h3 className="font-display text-xl font-bold mt-4 mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Process Image */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative aspect-[3/4] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                alt="Our team"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">The Process</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                From sketch to your wardrobe
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Every Wear Age piece goes through a rigorous design process. We start with extensive research — understanding how people move, what they need, and where current fashion falls short.
                </p>
                <p>
                  Our designers work closely with pattern makers and fabric specialists to refine each silhouette. Multiple prototypes are tested for fit, comfort, and durability before a single piece reaches production.
                </p>
                <p>
                  The result? Clothing that looks good on day one and gets better with every wear.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">20+</p>
                  <p className="text-sm text-muted-foreground mt-1">Unique Pieces</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">4</p>
                  <p className="text-sm text-muted-foreground mt-1">Categories</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Experience the difference
            </h2>
            <p className="text-white/60 text-lg">
              Explore our collection and discover what premium menswear should feel like.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 text-xs font-semibold tracking-[0.15em] uppercase rounded-sm hover:bg-white/90 transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
