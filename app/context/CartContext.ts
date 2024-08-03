// context/CartContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { addProductToCart } from '../firebase/services';

type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = async (productId: string, quantity: number) => {
    // Assuming userId is fetched from Clerk's authentication context
    const userId = "example-user-id"; // Replace with actual userId
    await addProductToCart(userId, productId, quantity);
    setItems([...items, { productId, quantity }]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
