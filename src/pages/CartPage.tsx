import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "@/hooks/contexts/useCart";
import { Button } from "@/components/ui/button";

const CartPage: React.FC = () => {
  const { basket, removeFromBasket, syncCart } = useCart();

  const navigate = useNavigate();

  // #region Render Functions =============================================================
  const renderEmptyCart = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
          <Button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#956F5A] hover:bg-[#7d5d4a]"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  };

  // #endregion

  // #region Helper Functions =============================================================
  const calculateTotal = () => {
    return basket.reduce(
      (total, item) => total + item.basePrice * item.quantity,
      0
    );
  };

  // #endregion

  if (basket.length === 0) {
    return renderEmptyCart();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-2">
          {basket.map((item) => (
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
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6l1.34 11.34A2 2 0 007.32 19h9.36a2 2 0 001.98-1.66L20 6M9 10v4m6-4v4"
                      />
                    </svg>
                    <span className="font-semibold">Quantity:</span>
                    <span>{item.quantity}</span>
                  </div>

                  <button
                    onClick={() => removeFromBasket(item.perfumeId)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
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
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="w-full bg-[#956F5A] hover:bg-[#7d5d4a]"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
