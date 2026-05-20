'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { FilterPanel } from '@/components/FilterPanel'
import { products } from '@/lib/products'
import { ArrowUpDown, X, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) setSelectedCategory(cat)
  }, [])

  let filtered = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory
    const priceMatch = product.basePrice >= selectedPriceRange[0] && product.basePrice <= selectedPriceRange[1]
    const ratingMatch = !selectedRating || product.rating >= selectedRating
    return categoryMatch && priceMatch && ratingMatch
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.basePrice - b.basePrice
      case 'price-high': return b.basePrice - a.basePrice
      case 'rating': return b.rating - a.rating
      default: return 0
    }
  })

  const hasActiveFilters = selectedCategory || selectedRating || selectedPriceRange[0] !== 0 || selectedPriceRange[1] !== 10000

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              {selectedCategory ? selectedCategory : 'All'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 sm:mt-3">
              Collection
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {sorted.length} {sorted.length === 1 ? 'product' : 'products'}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedPriceRange={selectedPriceRange}
                onPriceRangeChange={setSelectedPriceRange}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Mobile Filters + Sort Bar */}
            <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 lg:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 border rounded-sm text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${
                  hasActiveFilters
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-border text-foreground hover:bg-secondary'
                }`}
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} />
                Filters
                {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground focus:outline-none focus:border-accent"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mb-6 sm:mb-8 p-4 sm:p-6 border border-border rounded-sm bg-white overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-sm font-semibold">Filters</h3>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  <FilterPanel
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    selectedPriceRange={selectedPriceRange}
                    onPriceRangeChange={setSelectedPriceRange}
                    selectedRating={selectedRating}
                    onRatingChange={setSelectedRating}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sort Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Showing {sorted.length} {sorted.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} strokeWidth={1.5} className="text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-border rounded-sm bg-background text-sm text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sorted.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12"
              >
                {sorted.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <p className="text-muted-foreground text-sm mb-4">No products match your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedPriceRange([0, 10000])
                    setSelectedRating(null)
                  }}
                  className="text-xs font-semibold tracking-[0.12em] uppercase text-accent border border-accent/20 px-6 py-3 rounded-sm hover:bg-accent/5 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
