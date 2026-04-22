 'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { FilterPanel } from '@/components/FilterPanel'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, X } from 'lucide-react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) setSelectedCategory(cat)
  }, [])
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Filter products
  let filtered = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory
    const priceMatch = product.basePrice >= selectedPriceRange[0] && product.basePrice <= selectedPriceRange[1]
    const ratingMatch = !selectedRating || product.rating >= selectedRating
    return categoryMatch && priceMatch && ratingMatch
  })

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.basePrice - b.basePrice
      case 'price-high':
        return b.basePrice - a.basePrice
      case 'rating':
        return b.rating - a.rating
      case 'newest':
      default:
        return 0
    }
  })

  const hasActiveFilters = selectedCategory || selectedRating || (selectedPriceRange[0] !== 0 || selectedPriceRange[1] !== 10000)

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-balance mb-2">Shop Collection</h1>
          <p className="text-muted-foreground">
            Browse {sorted.length} {sorted.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block">
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={setSelectedPriceRange}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
            />
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Mobile Filters Button */}
            <div className="lg:hidden mb-6 flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex-1"
              >
                Filters {hasActiveFilters && <span className="ml-2 badge">Active</span>}
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6 p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={20} />
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
              </div>
            )}

            {/* Sort Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div>
                <h2 className="font-semibold text-foreground">
                  {sorted.length} Products
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={18} className="text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground font-medium"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {sorted.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedPriceRange([0, 10000])
                    setSelectedRating(null)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
