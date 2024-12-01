import React, { createContext, useState, useEffect } from "react";
import { getCartRequest, syncCartRequest } from "@/api";
import { Cart, CartItem } from "@/types/cart";

interface CartContextType {
  basket: CartItem[];
  addToBasket: (item: CartItem) => void;
  removeFromBasket: (itemId: string) => void;
  clearBasket: () => void;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType>({
  basket: [],
  addToBasket: () => {},
  removeFromBasket: () => {},
  clearBasket: () => {},
  isLoading: false,
});

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart data when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await getCartRequest();
      if (response.data.cart?.items) {
        setBasket(response.data.cart.items);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncCart = async (newBasket: CartItem[]) => {
    try {
      await syncCartRequest({
        items: newBasket.map((item) => ({
          perfume: item.perfumeId,
          volume: item.volume,
          quantity: item.quantity,
        })),
      });
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToBasket = async (item: CartItem) => {
    const newBasket = [...basket, item];
    setBasket(newBasket);
    await syncCart(newBasket);
  };

  const removeFromBasket = async (itemId: string) => {
    const newBasket = basket.filter((item) => item.perfumeId !== itemId);
    setBasket(newBasket);
    await syncCart(newBasket);
  };

  const clearBasket = async () => {
    setBasket([]);
    await syncCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
