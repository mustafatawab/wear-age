'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/app/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { CartDrawer } from './CartDrawer'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Desktop Nav - Left */}
            <nav className="hidden md:flex items-center gap-10">
              <Link href="/products" className="group relative text-[10px] font-bold tracking-[0.3em] uppercase transition-colors">
                Collection
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/products?category=jackets" className="group relative text-[10px] font-bold tracking-[0.3em] uppercase transition-colors">
                Outerwear
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>

            {/* Logo - Center */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-2xl md:text-3xl font-black tracking-tighter uppercase"
              >
                WEAR <span className="text-accent">AGE</span>
              </motion.div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button className="hidden sm:block text-white/80 hover:text-accent transition-colors">
                <Search size={18} />
              </button>
              
              <button 
                onClick={() => setCartOpen(true)}
                className="group relative flex items-center gap-2"
              >
                <ShoppingCart size={18} className="group-hover:text-accent transition-colors" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-accent text-black text-[10px] font-black rounded-full flex items-center justify-center px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 hover:text-accent transition-colors md:hidden"
              >
                <Menu size={24} />
              </button>

              <div className="hidden md:block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-none border-white/10 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                >
                  Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-black text-white flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="text-xl font-black tracking-tighter">WEAR AGE</div>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={32} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-8">
                {['Collection', 'Shirts', 'Pants', 'Jackets', 'New Arrivals'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={`/products${item === 'Collection' ? '' : `?category=${item.toLowerCase()}`}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6">
                <p className="text-white/40 text-xs tracking-widest uppercase font-bold">Engineering the future</p>
                <div className="flex gap-6">
                  <Link href="#" className="text-sm font-bold tracking-widest">INSTAGRAM</Link>
                  <Link href="#" className="text-sm font-bold tracking-widest">TIKTOK</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}


