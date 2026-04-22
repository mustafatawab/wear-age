'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { CartItem, CartContextType } from '@/lib/types'

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; color: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; color: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      )

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item === existingItem
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.color === action.payload.color &&
              item.size === action.payload.size
            )
        ),
      }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.color === action.payload.color &&
                item.size === action.payload.size
              )
          ),
        }
      }

      return {
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }

    case 'CLEAR_CART':
      return { items: [] }

    case 'LOAD_CART':
      return { items: action.payload }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: items })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const contextValue: CartContextType = {
    items: state.items,
    total,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (productId, color, size) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, color, size } }),
    updateQuantity: (productId, color, size, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, color, size, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
