import React from 'react';
import { useParams } from 'react-router-dom';
import './FragrancePyramid.css';

interface Fragrance {
  id: number;
  name: string;
  size: number;
  image: string;
  originalPrice: number;
  discountedPrice?: number;
  inStock: boolean;
  description: string;
  essence: 'EDT' | 'EDP' | 'Parfum';
  gender: 'Male' | 'Female' | 'Unisex';
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

// Updated fragrance data structure
const fragranceData: Record<string, Fragrance> = {
  'xj-1861-naxos-50ml': {
    id: 1,
    name: "XJ 1861 Naxos",
    size: 50,
    image: "/src/images/naxos.jpg",
    originalPrice: 270,
    discountedPrice: 180,
    inStock: true,
    description: "A luxurious tobacco vanilla fragrance",
    essence: 'EDP',
    gender: 'Male',
    notes: {
      top: ["Lavender", "Bergamot", "Citrus", "Cinnamon"],
      heart: ["Tonka Bean", "Vanilla", "Tobacco", "Honey"],
      base: ["Tobacco", "Vanilla", "Tonka Bean", "Amber"]
    }
  },
  'xj-1861-naxos-100ml': {
    id: 2,
    name: "XJ 1861 Naxos",
    size: 100,
    image: "/src/images/naxos.jpg",
    originalPrice: 320,
    discountedPrice: 250,
    inStock: true,
    description: "A luxurious tobacco vanilla fragrance",
    essence: 'EDP',
    gender: 'Male',
    notes: {
      top: ["Lavender", "Bergamot", "Citrus", "Cinnamon"],
      heart: ["Tonka Bean", "Vanilla", "Tobacco", "Honey"],
      base: ["Tobacco", "Vanilla", "Tonka Bean", "Amber"]
    }
  },
  'layton-75ml': {
    id: 3,
    name: "Layton",
    size: 75,
    image: "/src/images/layton.jpg",
    originalPrice: 250,
    inStock: true,
    description: "A fresh and elegant vanilla fragrance",
    essence: 'EDP',
    gender: 'Male',
    notes: {
      top: ["Apple", "Bergamot", "Lavender"],
      heart: ["Jasmine", "Violet", "Geranium"],
      base: ["Vanilla", "Guaiac Wood", "Patchouli"]
    }
  },
  'grand-soir-70ml': {
    id: 4,
    name: "Grand Soir",
    size: 70,
    image: "/src/images/grandsoirbad.jpg",
    originalPrice: 220,
    inStock: true,
    description: "An amber vanilla masterpiece",
    essence: 'EDT',
    gender: 'Unisex',
    notes: {
      top: ["Amber", "Vanilla"],
      heart: ["Tonka Bean", "Benzoin"],
      base: ["Amber", "Vanilla Absolute"]
    }
  }
};

const FragranceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fragrance = fragranceData[id || ''];

  if (!fragrance) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fragrance Not Found</h2>
          <p className="text-gray-600 mb-6">The fragrance you're looking for could not be found.</p>
          <button 
            onClick={() => window.history.back()} 
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            ← Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left side - Image and Details */}
        <div className="md:w-1/2">
          <div className="sticky top-8">
            <img
              src={fragrance.image}
              alt={`${fragrance.name} ${fragrance.size}ml`}
              className="w-full rounded-lg shadow-lg object-contain"
            />
            <div className="mt-6 space-y-4">
              <h1 className="text-3xl font-bold">{fragrance.name}</h1>
              <p className="text-xl text-gray-600">{fragrance.size}ml · {fragrance.essence}</p>
              
              <div className="flex items-center gap-2">
                {fragrance.discountedPrice ? (
                  <>
                    <span className="text-xl line-through text-gray-500">
                      ${fragrance.originalPrice}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${fragrance.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
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

              <p className="text-gray-700 mt-4">{fragrance.description}</p>

              <button
                className={`w-full py-3 rounded-lg text-white font-medium mt-6 ${
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

        {/* Right side - Fragrance Notes */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-8">Fragrance Notes</h2>
          <div className="fragrance-pyramid">
            {/* Top Notes */}
            <div className="pyramid-section">
              <div className="pyramid-label">First Impression</div>
              <div className="top-notes">
                <div className="notes-content">
                  <h3 className="text-center font-semibold mb-2">Top Notes</h3>
                  <ul className="notes-list">
                    {fragrance.notes.top.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Heart Notes */}
            <div className="pyramid-section">
              <div className="pyramid-label">Heart of the Fragrance</div>
              <div className="heart-notes">
                <div className="notes-content">
                  <h3 className="text-center font-semibold mb-2">Heart Notes</h3>
                  <ul className="notes-list">
                    {fragrance.notes.heart.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Base Notes */}
            <div className="pyramid-section">
              <div className="pyramid-label">Long Lasting Impression</div>
              <div className="base-notes">
                <div className="notes-content">
                  <h3 className="text-center font-semibold mb-2">Base Notes</h3>
                  <ul className="notes-list">
                    {fragrance.notes.base.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceDetailPage;