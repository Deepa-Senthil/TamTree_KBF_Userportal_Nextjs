"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  selectedSize: string;
  selectedPrice: number;
  Quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  cartCount: number;
  addToCart: (product: CartItem) => void;
  updateCartItemQuantity: (index: number, change: number) => void;
  removeFromCart: (index: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    const parsedCartItems: CartItem[] = savedCartItems
      ? JSON.parse(savedCartItems)
      : [];
    setCartItems(parsedCartItems);
    calculateTotalPrice(parsedCartItems);
    calculateCartCount(parsedCartItems);
  }, []);

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    setCartCount(0);
    localStorage.removeItem("cartItems");
  };

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce(
      (acc, item) => acc + item.selectedPrice * item.Quantity,
      0
    );
    setTotalPrice(total);
  };

  const calculateCartCount = (items: CartItem[]) => {
    const totalCount = items.length; // Count only unique products
    setCartCount(totalCount);
  };

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const addToCart = (product: {
    id: string;
    title: string;
    imageUrl: string;
    selectedSize: string;
    selectedPrice: number;
    Quantity: number;
  }) => {
    console.log("Adding to cart:", product);

    const existingProductIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id && item.selectedSize === product.selectedSize
    );

    console.log("Existing product index:", existingProductIndex);

    let updatedCartItems;

    if (existingProductIndex !== -1) {
      updatedCartItems = [...cartItems];
      console.log(
        "Before update:",
        updatedCartItems[existingProductIndex].Quantity
      );
      updatedCartItems[existingProductIndex].Quantity = product.Quantity;
      console.log(
        "After update:",
        updatedCartItems[existingProductIndex].Quantity
      );
    } else {
      const productWithQuantity: CartItem = {
        ...product,
        Quantity: product.Quantity,
      };
      updatedCartItems = [...cartItems, productWithQuantity];
    }

    console.log("Updated cart:", updatedCartItems);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const updateCartItemQuantity = (index: number, change: number) => {
    let updatedItems = [...cartItems];
    let item = updatedItems[index];

    const newQuantity = item.Quantity + change;

    if (newQuantity <= 0) {
      updatedItems.splice(index, 1);
      alert(`Product removed: ${item.title} (Size: ${item.selectedSize})`);
    } else {
      item.Quantity = newQuantity;
      // alert(
      //   `Product updated: ${item.title} (Size: ${item.selectedSize}) updated as ${newQuantity}`
      // );
    }

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
    calculateCartCount(updatedItems);
  };

  const removeFromCart = (index: number) => {
    // const removedItem = cartItems[index];
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
    calculateCartCount(updatedItems);

    // alert(
    //   `Product removed: ${removedItem.title} (Size: ${removedItem.selectedSize})`
    // );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        cartCount,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        setCartItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
