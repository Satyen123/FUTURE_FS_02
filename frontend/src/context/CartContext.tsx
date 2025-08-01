    // frontend/src/context/CartContext.tsx
    "use client"; // This context will be used by Client Components

    import React, { createContext, useContext, useState, ReactNode } from 'react';

    // Define the structure of a product in the cart
    interface CartItem {
      _id: string;
      name: string;
      price: number;
      imageUrl: string;
      quantity: number; // Quantity of this item in the cart
      countInStock: number; // Max available stock
    }

    // Define the shape of the CartContext
    interface CartContextType {
      cartItems: CartItem[];
      addToCart: (product: { _id: string; name: string; price: number; imageUrl: string; countInStock: number }) => void;
      removeFromCart: (productId: string) => void;
      updateQuantity: (productId: string, newQuantity: number) => void;
      getCartTotal: () => number;
      getCartItemCount: () => number;
    }

    // Create the context with a default undefined value
    const CartContext = createContext<CartContextType | undefined>(undefined);

    // Custom hook to use the CartContext
    export const useCart = () => {
      const context = useContext(CartContext);
      if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
      }
      return context;
    };

    // CartProvider component to wrap your application
    interface CartProviderProps {
      children: ReactNode;
    }

    export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
      const [cartItems, setCartItems] = useState<CartItem[]>([]);

      // Function to add a product to the cart
      const addToCart = (product: { _id: string; name: string; price: number; imageUrl: string; countInStock: number }) => {
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((item) => item._id === product._id);

          if (existingItem) {
            // If item exists, update its quantity, respecting stock limits
            const newQuantity = existingItem.quantity + 1;
            if (newQuantity <= product.countInStock) {
              return prevItems.map((item) =>
                item._id === product._id ? { ...item, quantity: newQuantity } : item
              );
            } else {
              // Optionally, show a message that stock limit is reached
              console.warn(`Cannot add more ${product.name}. Stock limit reached.`);
              return prevItems; // Return previous state if stock limit hit
            }
          } else {
            // If new item, add it with quantity 1
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
      };

      // Function to remove a product completely from the cart
      const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
      };

      // Function to update the quantity of an item in the cart
      const updateQuantity = (productId: string, newQuantity: number) => {
        setCartItems((prevItems) => {
          return prevItems.map((item) => {
            if (item._id === productId) {
              // Ensure newQuantity is not less than 1 and respects stock limits
              const clampedQuantity = Math.max(1, Math.min(newQuantity, item.countInStock));
              return { ...item, quantity: clampedQuantity };
            }
            return item;
          }).filter(item => item.quantity > 0); // Remove item if quantity becomes 0
        });
      };

      // Calculate total price of items in the cart
      const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      };

      // Get total number of items (not quantity, but unique products) in the cart
      const getCartItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      };

      // Provide the context values to children components
      const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemCount,
      };

      return (
        <CartContext.Provider value={contextValue}>
          {children}
        </CartContext.Provider>
      );
    };
    