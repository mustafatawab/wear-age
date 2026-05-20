'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
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
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-border py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav - Desktop */}
            <nav className="hidden md:flex items-center gap-7">
              <Link href="/products" className="text-[11px] font-medium tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-[11px] font-medium tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[11px] font-medium tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight uppercase">
                Wear<span className="text-accent">Age</span>
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <ShoppingCart size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 text-foreground/70 hover:text-foreground transition-colors md:hidden"
              >
                {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white md:hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-border">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <span className="font-display text-xl font-bold tracking-tight uppercase">
                  Wear<span className="text-accent">Age</span>
                </span>
              </Link>
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col p-6 gap-5">
              {[
                { label: 'Shop', href: '/products' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-display font-bold tracking-tight hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-8 left-6 right-6">
              <p className="text-xs text-muted-foreground">
                hello@wearage.pk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
