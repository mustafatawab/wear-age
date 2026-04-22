'use client'

import { useCart } from '@/app/context/CartContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total } = useCart()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-black/95 backdrop-blur-2xl border-l border-white/5 p-0 flex flex-col">
        <SheetHeader className="p-8 border-b border-white/5">
          <SheetTitle className="text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
            <ShoppingBag className="text-accent" /> Your Bag 
            <span className="text-sm font-light text-white/40 ml-auto">({items.length} items)</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 px-8 custom-scrollbar">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                   <ShoppingBag size={32} className="text-white/20" />
                </div>
                <p className="text-white/40 font-bold tracking-widest uppercase text-xs">Your bag is empty</p>
                <Button 
                  onClick={() => onOpenChange(false)}
                  variant="outline" 
                  className="rounded-none border-white/10 text-[10px] font-black tracking-[0.2em] uppercase"
                >
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-6 group"
                  >
                    <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-muted border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                            {item.productName}
                          </h4>
                          <button 
                            onClick={() => removeItem(item.productId, item.color, item.size)}
                            className="text-white/20 hover:text-white transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-1">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-8">
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                            className="px-2 hover:bg-white/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                            className="px-2 hover:bg-white/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-black tracking-tighter text-white">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-8 border-t border-white/5 space-y-6">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-[10px] font-black tracking-[0.3em] uppercase text-white/40">
                <span>Subtotal</span>
                <span className="text-white">${total}</span>
              </div>
              <div className="flex justify-between text-2xl font-black uppercase tracking-tighter text-white">
                <span>Total</span>
                <span className="text-gradient-neon">${total}</span>
              </div>
            </div>
            <Button
              asChild
              className="w-full h-16 rounded-xl bg-white text-black hover:bg-white/90 font-black tracking-[0.2em] text-xs transition-all button-glow"
            >
              <Link href="/checkout">PROCEED TO CHECKOUT</Link>
            </Button>
            <p className="text-[8px] text-center text-white/20 font-bold tracking-widest uppercase">
              Free shipping and returns on all premium orders
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
