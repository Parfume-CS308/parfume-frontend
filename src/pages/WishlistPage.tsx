import React from "react";
import useCart from "@/hooks/contexts/useCart";
import ProductCard from "@/components/ui/productcard";

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={() => addToCart(item.id)}
              onRemoveFromWishlist={() => removeFromWishlist(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
