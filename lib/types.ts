export interface ProductVariant {
  color: string;
  colorCode: string;
  images: string[];
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'shirts' | 'pants' | 'shorts' | 'jackets';
  description: string;
  basePrice: number;
  rating: number;
  reviews: number;
  badge?: 'New' | 'Bestseller' | 'Trending';
  variants: ProductVariant[];
  sizes: string[];
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
}
