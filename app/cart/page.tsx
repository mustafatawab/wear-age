'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <ArrowRight size={20} strokeWidth={1.5} className="text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Your bag is empty</h1>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Explore our collection to find pieces that speak to you.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Button
              asChild
              className="bg-foreground text-white hover:bg-foreground/90 text-xs tracking-[0.15em] uppercase rounded-sm h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto"
            >
              <Link href="/products">Browse Collection</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8 sm:mb-12"
        >
          Shopping Bag
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.color}-${item.size}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 sm:gap-5 p-3 sm:p-4 border border-border rounded-sm group"
              >
                <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-sm overflow-hidden bg-secondary flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <Link
                      href={`/products/${item.productId}`}
                      className="text-sm font-semibold hover:text-accent transition-colors line-clamp-1"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.color} / {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div className="flex items-center border border-border rounded-sm">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.color, item.size, item.quantity - 1)
                        }
                        className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-secondary transition-colors text-muted-foreground"
                      >
                        −
                      </button>
                      <span className="w-6 sm:w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.color, item.size, item.quantity + 1)
                        }
                        className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-secondary transition-colors text-muted-foreground"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                      <p className="text-sm font-semibold">${item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.productId, item.color, item.size)}
                        className="text-muted-foreground/40 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors pt-2 sm:pt-4"
            >
              Clear bag
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-border rounded-sm p-5 sm:p-6 space-y-5 sm:space-y-6 lg:sticky lg:top-24"
            >
              <h2 className="text-sm font-semibold tracking-[0.12em] uppercase">Order Summary</h2>

              <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-accent">Free</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">${total}</span>
              </div>

              <Button
                asChild
                className="w-full h-12 sm:h-14 bg-foreground text-white hover:bg-foreground/90 text-xs tracking-[0.15em] uppercase rounded-sm"
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <div className="space-y-1.5 sm:space-y-2 pt-3 sm:pt-4 border-t border-border text-xs text-muted-foreground">
                <p>Free shipping on orders over $150</p>
                <p>30-day returns accepted</p>
                <p>Secure checkout</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
