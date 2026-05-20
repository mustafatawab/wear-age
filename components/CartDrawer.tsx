'use client'

import { useCart } from '@/app/context/CartContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
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
      <SheetContent className="w-full sm:max-w-md bg-white border-l border-border p-0 flex flex-col">
        <SheetHeader className="p-5 sm:p-6 border-b border-border">
          <SheetTitle className="text-base sm:text-lg font-display font-bold tracking-tight text-foreground flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-accent" />
            Your Bag
            <span className="text-sm font-normal text-muted-foreground ml-auto">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Items in your shopping bag
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 px-5 sm:px-6">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center">
                  <ShoppingBag size={22} strokeWidth={1.5} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">Your bag is empty</p>
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="outline"
                  className="text-xs tracking-[0.12em] uppercase rounded-sm"
                >
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-5 sm:space-y-6">
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="flex gap-3 sm:gap-4 group"
                  >
                    <div className="relative w-16 h-24 sm:w-20 sm:h-28 rounded-sm overflow-hidden bg-secondary flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors pr-4">
                            {item.productName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.productId, item.color, item.size)}
                            className="text-muted-foreground/40 hover:text-destructive transition-colors flex-shrink-0"
                          >
                            <X size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-border rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                            className="px-2 sm:px-2.5 py-1.5 hover:bg-secondary transition-colors"
                          >
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="w-6 sm:w-7 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                            className="px-2 sm:px-2.5 py-1.5 hover:bg-secondary transition-colors"
                          >
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-5 sm:p-6 border-t border-border space-y-3 sm:space-y-4">
            <div className="w-full space-y-2 sm:space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-accent">Free</span>
              </div>
            </div>
            <Button
              asChild
              className="w-full h-12 sm:h-14 bg-foreground text-white hover:bg-foreground/90 text-xs tracking-[0.15em] uppercase rounded-sm"
            >
              <Link href="/checkout">Checkout</Link>
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              Free shipping and returns on all orders
            </p>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
