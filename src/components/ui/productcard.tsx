import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

interface ProductCardProps {
  id: number;
  name: string;
  size: number;
  image: string;
  originalPrice: number;
  discountedPrice?: number;
  isInBasket: boolean;
  inStock: boolean;
  popularity: number;
  totalRatings: number;
  description: string;
  onAddToBasket: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  size,
  image,
  originalPrice,
  discountedPrice,
  isInBasket,
  inStock,
  popularity,
  totalRatings,
  onAddToBasket,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const urlName = name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-');
    
    const fullUrlId = `${urlName}-${size}ml`;
    navigate(`/perfume/${fullUrlId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white"
    >
      {!inStock && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm z-10">
          Out of Stock
        </div>
      )}
      
      <div className="relative h-72">
        <img 
          src={image} 
          alt={`${name} ${size}ml`}
          className="w-full h-full object-contain rounded-lg"
        />
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
          <span className="text-sm text-gray-500">{size}ml</span>
        </div>
        
        <div className="flex items-center gap-2">
          <StarRating rating={popularity} size="sm" />
          <span className="text-sm text-gray-500">({totalRatings})</span>
        </div>
        
        <div className="mt-2">
          {discountedPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through">${originalPrice}</span>
              <span className="font-bold text-gray-900">${discountedPrice}</span>
            </div>
          ) : (
            <span className="text-gray-900">${originalPrice}</span>
          )}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToBasket();
        }}
        disabled={!inStock}
        className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
          !inStock 
            ? 'bg-gray-200 cursor-not-allowed' 
            : isInBasket 
              ? 'bg-green-100 text-green-600' 
              : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {isInBasket ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ProductCard;