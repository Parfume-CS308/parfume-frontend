import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlusCircleIcon from '../icons/pluscircle.png';
import CheckCircleIcon from '../icons/checkcircle.png';

interface ProductCardProps {
  id: number; // Add an id property to identify the product
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice?: number;
  priceRange?: string;
  isInBasket: boolean;
  onAddToBasket: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  originalPrice,
  discountedPrice,
  priceRange,
  isInBasket,
  onAddToBasket,
}) => {
  const navigate = useNavigate();

  // Navigate to the product detail page on card click
  const handleCardClick = () => {
    navigate(`/perfume/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border rounded-lg p-6 shadow-sm relative w-full max-w-sm cursor-pointer"
    >
      {/* Image and Favorite Icon */}
      <div className="relative h-72">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={(e) => e.stopPropagation()} // Prevents navigation on button click
        >
          {/* Heart Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.414l1.318-1.096a4.5 4.5 0 016.364 6.364l-7.318 7.318a.75.75 0 01-1.06 0l-7.318-7.318a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
        {discountedPrice ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm line-through text-gray-500">${originalPrice}</span>
            <span className="text-sm font-bold text-gray-900 bg-gray-200 px-2 py-1 rounded-md">
              ${discountedPrice}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-700">{priceRange || `$${originalPrice}`}</span>
        )}
      </div>

      {/* Add to Basket / In Basket */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents card click from triggering
          onAddToBasket();
        }}
        className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        {isInBasket ? (
          <img src={CheckCircleIcon} alt="In Basket" className="w-6 h-6" />
        ) : (
          <img src={PlusCircleIcon} alt="Add to Basket" className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
