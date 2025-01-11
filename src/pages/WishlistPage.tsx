import React, { useState } from "react";
import useCart from "@/hooks/contexts/useCart";
import ProductCard from "@/components/ui/productcard";

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (item: Product) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-md">
              <ProductCard product={item} />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
