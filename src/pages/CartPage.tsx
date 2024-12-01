import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartRequest } from "@/api/cart";
import { Cart } from "@/types/cart";
import { Button } from "@/components/ui/button";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await getCartRequest();
      setCart(response.data.cart);
    } catch (err) {
      setError("Failed to load cart");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-2">
          {cart.items.map((item) => (
            <div
              key={`${item.perfumeId}-${item.volume}`}
              className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4 mb-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{item.perfumeName}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-sm text-gray-500">{item.volume}ml</p>
                <div className="flex items-center gap-4 mt-2">
                  <p className="font-bold">${item.basePrice}</p>
                  <div className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
