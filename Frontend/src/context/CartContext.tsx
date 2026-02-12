import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ecommerce-cart';

const calculateCart = (items: CartItem[]): Cart => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { items, subtotal, itemCount };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0, itemCount: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const items = JSON.parse(storedCart);
        setCart(calculateCart(items));
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
  }, [cart.items]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product._id === product._id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity: Math.min(quantity, product.stock) }];
      }
      
      toast({
        title: 'Added to cart',
        description: `${product.title} has been added to your cart`,
      });
      
      return calculateCart(newItems);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => i.product._id === productId);
      const newItems = prevCart.items.filter(item => item.product._id !== productId);
      
      if (item) {
        toast({
          title: 'Removed from cart',
          description: `${item.product.title} has been removed`,
        });
      }
      
      return calculateCart(newItems);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product._id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      );
      return calculateCart(newItems);
    });
  };

  const clearCart = () => {
    setCart({ items: [], subtotal: 0, itemCount: 0 });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const isInCart = (productId: string) => {
    return cart.items.some(item => item.product._id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
