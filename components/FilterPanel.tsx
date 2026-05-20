'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
  { label: '$50 – $100', min: 50, max: 100 },
  { label: '$100 – $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: 10000 },
]

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0 pb-6 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between group"
      >
        <span className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">{title}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  )
}

export function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedRating,
  onRatingChange,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <FilterSection title="Category">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors ${
            selectedCategory === null
              ? 'bg-foreground text-white'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat.toLowerCase())}
            className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors ${
              selectedCategory === cat.toLowerCase()
                ? 'bg-foreground text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {cat}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Price">
        {priceRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => onPriceRangeChange([range.min, range.max])}
            className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors ${
              selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max
                ? 'bg-foreground text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {range.label}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Rating" defaultOpen={false}>
        {[5, 4, 3].map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
            className={`w-full text-left px-3 py-2 text-sm rounded-sm transition-colors flex items-center gap-2 ${
              selectedRating === rating
                ? 'bg-foreground text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < rating ? 'text-accent' : 'text-border'}`}>★</span>
              ))}
            </span>
            <span>{rating}+</span>
          </button>
        ))}
      </FilterSection>

      {(selectedCategory || selectedRating || selectedPriceRange[0] !== 0 || selectedPriceRange[1] !== 10000) && (
        <button
          onClick={() => {
            onCategoryChange(null)
            onPriceRangeChange([0, 10000])
            onRatingChange(null)
          }}
          className="w-full py-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-accent border border-accent/20 rounded-sm hover:bg-accent/5 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  )
}
