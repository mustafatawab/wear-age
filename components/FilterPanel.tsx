'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterPanelProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  selectedPriceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) => void
}

const categories = ['Shirts', 'Pants', 'Shorts', 'Jackets']
const priceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: 10000 },
]

export function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedRating,
  onRatingChange,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['category', 'price', 'rating'])
  )

  const toggleSection = (section: string) => {
    const newSections = new Set(expandedSections)
    if (newSections.has(section)) {
      newSections.delete(section)
    } else {
      newSections.add(section)
    }
    setExpandedSections(newSections)
  }

  return (
    <div className="w-full space-y-4">
      {/* Category Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between group"
        >
          <h3 className="font-semibold text-foreground">Category</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.has('category') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.has('category') && (
          <div className="mt-4 space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`w-full text-left px-3 py-2 rounded transition-colors ${
                selectedCategory === null
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat.toLowerCase())}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  selectedCategory === cat.toLowerCase()
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between group"
        >
          <h3 className="font-semibold text-foreground">Price</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.has('price') ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.has('price') && (
          <div className="mt-4 space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => onPriceRangeChange([range.min, range.max])}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between group"
        >
          <h3 className="font-semibold text-foreground">Rating</h3>
          <ChevronDown
            size={20}
            className={`transition-transform ${expandedSections.has('rating') ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.has('rating') && (
          <div className="mt-4 space-y-2">
            {[5, 4, 3].map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
                className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center gap-2 ${
                  selectedRating === rating
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-muted'}>
                      ★
                    </span>
                  ))}
                </span>
                <span className="text-sm">{rating}+ stars</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedRating) && (
        <Button
          variant="outline"
          onClick={() => {
            onCategoryChange(null)
            onPriceRangeChange([0, 10000])
            onRatingChange(null)
          }}
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </div>
  )
}
