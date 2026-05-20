'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 sm:space-y-8"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto">
              <Check size={24} strokeWidth={2} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Order Confirmed</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Thank you for your purchase. Your order confirmation has been sent to your email.
            </p>
            <div className="border border-border rounded-sm p-4 sm:p-6 text-left space-y-2">
              <p className="text-sm">
                Order: <span className="font-semibold text-accent">#WA-2026-00001</span>
              </p>
              <p className="text-sm text-muted-foreground">Estimated delivery: 5–7 business days</p>
            </div>
            <Button
              asChild
              className="bg-foreground text-white hover:bg-foreground/90 text-xs tracking-[0.15em] uppercase rounded-sm h-12 sm:h-14 w-full"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Button asChild variant="ghost" className="mb-6 sm:mb-8 rounded-sm">
            <Link href="/cart">
              <ArrowLeft className="mr-2" size={16} strokeWidth={1.5} />
              Back to Bag
            </Link>
          </Button>
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Your bag is empty</h1>
            <p className="text-muted-foreground text-sm">Add items before checking out.</p>
            <Button
              asChild
              className="bg-foreground text-white hover:bg-foreground/90 text-xs tracking-[0.15em] uppercase rounded-sm h-12 sm:h-14 w-full"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Button asChild variant="ghost" className="mb-6 sm:mb-8 rounded-sm">
          <Link href="/cart">
            <ArrowLeft className="mr-2" size={16} strokeWidth={1.5} />
            Back to Bag
          </Link>
        </Button>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8 sm:mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Contact */}
              <div className="border border-border rounded-sm p-4 sm:p-6 space-y-4">
                <h2 className="text-sm font-semibold tracking-[0.12em] uppercase">Contact</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Shipping */}
              <div className="border border-border rounded-sm p-4 sm:p-6 space-y-4">
                <h2 className="text-sm font-semibold tracking-[0.12em] uppercase">Shipping</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors col-span-2 sm:col-span-1"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="border border-border rounded-sm p-4 sm:p-6 space-y-4">
                <h2 className="text-sm font-semibold tracking-[0.12em] uppercase">Payment</h2>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM / YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    name="cardCvc"
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 sm:h-14 bg-foreground text-white hover:bg-foreground/90 text-xs tracking-[0.15em] uppercase rounded-sm"
              >
                Place Order — ${total}
              </Button>
            </form>
          </div>

          {/* Summary */}
          <div>
            <div className="border border-border rounded-sm p-4 sm:p-6 space-y-4 sm:space-y-6 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold tracking-[0.12em] uppercase">Order Summary</h2>

              <div className="space-y-3 sm:space-y-4 pb-3 sm:pb-4 border-b border-border max-h-48 sm:max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="relative w-12 h-16 rounded-sm overflow-hidden bg-secondary flex-shrink-0">
                      <Image src={item.image} alt={item.productName} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{item.productName}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {item.color} / {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-semibold">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-accent">Free</span>
                </div>
              </div>

              <div className="border-t border-border pt-3 sm:pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
