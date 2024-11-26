import React, { useState, useMemo } from 'react';
import FilterSidebar from '../components/ui/filterSideBar';
import ProductCard from '../components/ui/productcard';
import naxosimage from '../images/naxos.jpg';
import laytonimage from '../images/layton.jpg';
import grandsoirimage from '../images/grandsoirbad.jpg';

// Updated product interface
interface Product {
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
  gender: 'Male' | 'Female' | 'Unisex';
  essence: 'EDT' | 'EDP' | 'Parfum';
  category: string[];
}

// Updated products data
const products: Product[] = [
  {
    id: 1,
    name: "XJ 1861 Naxos",
    size: 50,
    image: naxosimage,
    originalPrice: 270,
    discountedPrice: 180,
    isInBasket: false,
    inStock: true,
    popularity: 4.5,
    totalRatings: 128,
    description: "A rich tobacco vanilla fragrance with honey and lavender notes",
    gender: 'Male',
    essence: 'EDP',
    category: ['Winter']
  },
  {
    id: 2,
    name: "Layton",
    size: 75,
    image: laytonimage,
    originalPrice: 250,
    isInBasket: true,
    inStock: true,
    popularity: 4.8,
    totalRatings: 256,
    description: "A fresh, elegant and sweet vanilla fragrance",
    gender: 'Male',
    essence: 'EDP',
    category: ['Winter']
  },
  {
    id: 3,
    name: "Layton",
    size: 125,
    image: laytonimage,
    originalPrice: 300,
    isInBasket: false,
    inStock: false,
    popularity: 4.8,
    totalRatings: 256,
    description: "A fresh, elegant and sweet vanilla fragrance",
    gender: 'Male',
    essence: 'EDP',
    category: ['Winter']
  },
  {
    id: 4,
    name: "Grand Soir",
    size: 70,
    image: grandsoirimage,
    originalPrice: 220,
    isInBasket: false,
    inStock: true,
    popularity: 4.6,
    totalRatings: 189,
    description: "An amber vanilla masterpiece",
    gender: 'Unisex',
    essence: 'EDP',
    category: ['Winter']
  }
];

type SortOption = 'price-asc' | 'price-desc' | 'popularity';

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Handler for adding products to the basket
  const handleAddToBasket = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product && !product.inStock) {
      alert('This product is out of stock');
      return;
    }
    console.log(`Add product with ID ${productId} to basket`);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(product => {
        const searchLower = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return (a.discountedPrice || a.originalPrice) - (b.discountedPrice || b.originalPrice);
          case 'price-desc':
            return (b.discountedPrice || b.originalPrice) - (a.discountedPrice || a.originalPrice);
          case 'popularity':
            return b.popularity - a.popularity;
          default:
            return 0;
        }
      });
  }, [searchQuery, sortBy]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search and Sort Controls */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Our Perfumes</h1>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToBasket={() => handleAddToBasket(product.id)}
              />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No fragrances found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainPage;