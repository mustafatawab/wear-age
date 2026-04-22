import Link from 'next/link'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
               <h3 className="text-3xl font-black tracking-tighter">
                WEAR <span className="text-accent">AGE</span>
              </h3>
              <p className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase max-w-sm leading-loose">
                Engineering high-performance aesthetics for the modern man. Est. 2026.
              </p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-white/40 hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                <Instagram size={16} /> INSTAGRAM
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                <Twitter size={16} /> TWITTER
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                <Youtube size={16} /> YOUTUBE
              </a>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Shop */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Shop</h4>
              <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase">
                <li><Link href="/products" className="text-white/40 hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/products?category=jackets" className="text-white/40 hover:text-white transition-colors">Outerwear</Link></li>
                <li><Link href="/products?category=pants" className="text-white/40 hover:text-white transition-colors">Trousers</Link></li>
                <li><Link href="/products?category=shirts" className="text-white/40 hover:text-white transition-colors">Shirts</Link></li>
              </ul>
            </div>

            {/* Assistance */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Assistance</h4>
              <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase">
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>

            {/* Privacy */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Legal</h4>
              <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase">
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/20">
            &copy; 2026 WEAR AGE. REFINING THE FUTURE.
          </p>
          <div className="flex gap-10">
            <span className="text-[10px] font-black tracking-widest uppercase text-white/20">United Kingdom / GBP</span>
            <span className="text-[10px] font-black tracking-widest uppercase text-white/20">Global Shipping Available</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

