import Link from 'next/link'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight uppercase">
                Wear<span className="text-accent">Age</span>
              </h3>
              <p className="text-muted-foreground text-sm mt-3 max-w-xs leading-relaxed">
                Premium menswear where architectural precision meets everyday comfort.
              </p>
            </div>

            <div className="flex gap-5 sm:gap-6">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="sm:col-span-2 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="space-y-5 sm:space-y-6">
              <h4 className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-accent">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
                <li><Link href="/products?category=jackets" className="text-muted-foreground hover:text-foreground transition-colors">Outerwear</Link></li>
                <li><Link href="/products?category=pants" className="text-muted-foreground hover:text-foreground transition-colors">Trousers</Link></li>
                <li><Link href="/products?category=shirts" className="text-muted-foreground hover:text-foreground transition-colors">Shirts</Link></li>
              </ul>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <h4 className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-accent">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <h4 className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-accent">Help</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            &copy; 2026 Wear Age. All rights reserved.
          </p>
          <span className="text-[10px] sm:text-xs text-muted-foreground">Pakistan / PKR</span>
        </div>
      </div>
    </footer>
  )
}
