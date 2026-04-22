'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'

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
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order placement
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto text-4xl">
              <Check size={40} />
            </div>
            <h1 className="text-4xl font-black">Order Placed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order confirmation has been sent to your email.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 text-left space-y-2">
              <p className="font-semibold">Order Number: <span className="text-accent">#WA-2024-12345</span></p>
              <p className="text-muted-foreground">Estimated Delivery: 5-7 business days</p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button asChild variant="ghost">
            <Link href="/cart" className="mb-8">
              <ArrowLeft className="mr-2" size={20} />
              Back to Cart
            </Link>
          </Button>
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-3xl font-black">Your Cart is Empty</h1>
            <p className="text-muted-foreground">Please add items to your cart before checking out.</p>
            <Button
              asChild
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/cart">
            <ArrowLeft className="mr-2" size={20} />
            Back to Cart
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-black mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Shipping */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    name="cardCvc"
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                Place Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-border rounded-lg p-6 space-y-6 sticky top-20">
              <h2 className="text-2xl font-black">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.productName} x{item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
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

              <div className="border-t border-border pt-4 flex justify-between text-xl">
                <span className="font-semibold">Total</span>
                <span className="font-black text-2xl">${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
