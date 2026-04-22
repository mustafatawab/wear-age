'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="text-6xl">🛒</div>
            <h1 className="text-3xl md:text-4xl font-black">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground">
              Looks like you haven&apos;t added any items yet. Explore our collection to find your perfect pieces.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/products">
                Continue Shopping <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-balance">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="border border-border rounded-lg p-6 flex gap-6 hover:border-accent/50 transition-colors group"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <Link
                      href={`/products/${item.productId}`}
                      className="text-lg font-semibold hover:text-accent transition-colors block"
                    >
                      {item.productName}
                    </Link>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Color: <span className="text-foreground">{item.color}</span></span>
                      <span>Size: <span className="text-foreground">{item.size}</span></span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.color, item.size, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded border border-border hover:bg-muted transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.color, item.size, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded border border-border hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId, item.color, item.size)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="text-right">
                      <p className="text-2xl font-black">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">${item.price} each</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={clearCart}
              className="mt-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-border rounded-lg p-6 space-y-6 sticky top-20">
              <h2 className="text-2xl font-black">Order Summary</h2>

              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-accent">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl">
                <span className="font-semibold">Total</span>
                <span className="font-black text-2xl">${(total * 1.1).toFixed(2)}</span>
              </div>

              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Proceed to Checkout
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>

              {/* Info */}
              <div className="space-y-2 pt-4 border-t border-border text-xs text-muted-foreground">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day returns accepted</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
