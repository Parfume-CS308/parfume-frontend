import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/ui/StarRating.tsx';
import FragranceNotes from '../components/ui/FragranceNotes.tsx';

interface Fragrance {
  id: number;
  name: string;
  size: number;
  image: string;
  originalPrice: number;
  discountedPrice?: number;
  inStock: boolean;
  popularity: number;
  totalRatings: number;
  description: string;
  essence: 'EDT' | 'EDP' | 'Parfum';
  gender: 'Male' | 'Female' | 'Unisex';
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

const fragranceData: Record<string, Fragrance> = {
  'xj-1861-naxos-50ml': {
    id: 1,
    name: "XJ 1861 Naxos",
    size: 50,
    image: "/src/images/naxos.jpg",
    originalPrice: 270,
    discountedPrice: 180,
    inStock: true,
    popularity: 4.5,
    totalRatings: 128,
    description: "A rich tobacco vanilla fragrance with honey and lavender notes",
    essence: 'EDP',
    gender: 'Male',
    notes: {
      top: ["Lavender", "Bergamot", "Citrus", "Cinnamon"],
      heart: ["Tonka Bean", "Vanilla", "Tobacco", "Honey"],
      base: ["Tobacco", "Vanilla", "Tonka Bean", "Amber"]
    }
  },
  'layton-75ml': {
    id: 2,
    name: "Layton",
    size: 75,
    image: "/src/images/layton.jpg",
    originalPrice: 250,
    inStock: true,
    popularity: 4.8,
    totalRatings: 256,
    description: "A fresh, elegant and sweet vanilla fragrance",
    essence: 'EDP',
    gender: 'Male',
    notes: {
      top: ["Apple", "Bergamot", "Lavender"],
      heart: ["Jasmine", "Violet", "Geranium"],
      base: ["Vanilla", "Guaiac Wood", "Patchouli"]
    }
  },
  'grand-soir-70ml': {  // Updated key to match the URL format
    id: 4,
    name: "Grand Soir",
    size: 70,
    image: "/src/images/grandsoirbad.jpg",
    originalPrice: 220,
    inStock: true,
    popularity: 4.6,
    totalRatings: 189,
    description: "An amber vanilla masterpiece",
    essence: 'EDP',
    gender: 'Unisex',
    notes: {
      top: ["Amber", "Vanilla"],
      heart: ["Tonka Bean", "Benzoin"],
      base: ["Amber", "Vanilla Absolute"]
    }
  }
  
  // Add other fragrances as needed
};

const FragranceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fragrance = fragranceData[id || ''];

  if (!fragrance) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fragrance Not Found</h2>
          <p className="text-gray-600 mb-6">The fragrance you're looking for could not be found.</p>
          <button 
            onClick={() => navigate('/')} 
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left side - Image and Details */}
        <div className="lg:w-1/2">
          <div className="sticky top-8">
            <img
              src={fragrance.image}
              alt={`${fragrance.name} ${fragrance.size}ml`}
              className="w-full rounded-lg shadow-lg object-contain"
            />
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{fragrance.name}</h1>
                  <p className="text-xl text-gray-600">{fragrance.size}ml · {fragrance.essence}</p>
                </div>
                <button className="text-gray-500 hover:text-red-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.414l1.318-1.096a4.5 4.5 0 016.364 6.364l-7.318 7.318a.75.75 0 01-1.06 0l-7.318-7.318a4.5 4.5 0 010-6.364z" 
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={fragrance.popularity} size="lg" />
                <span className="text-gray-500">({fragrance.totalRatings} ratings)</span>
              </div>
              
              <div className="flex items-center gap-2">
                {fragrance.discountedPrice ? (
                  <>
                    <span className="text-2xl line-through text-gray-500">
                      ${fragrance.originalPrice}
                    </span>
                    <span className="text-3xl font-bold text-blue-600">
                      ${fragrance.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${fragrance.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {fragrance.gender}
                </span>
                {!fragrance.inStock && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-gray-700">{fragrance.description}</p>

              <button
                className={`w-full py-3 rounded-lg text-white font-medium ${
                  fragrance.inStock 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!fragrance.inStock}
              >
                {fragrance.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Notes and Reviews */}
        <div className="lg:w-1/2 space-y-8">
          {/* Fragrance Notes */}
          <FragranceNotes 
            top={fragrance.notes.top}
            heart={fragrance.notes.heart}
            base={fragrance.notes.base}
          />

          {/* Ratings Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>
            
            <div className="flex items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {fragrance.popularity.toFixed(1)}
                </div>
                <StarRating 
                  rating={fragrance.popularity} 
                  size="lg" 
                  showNumber={false}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {fragrance.totalRatings} ratings
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage = Math.random() * 100;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <div className="w-12 text-sm text-gray-600">{stars} stars</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm text-gray-500">
                        {Math.round(percentage)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceDetailPage;