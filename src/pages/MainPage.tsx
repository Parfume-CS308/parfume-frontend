import React from 'react';
import FilterSidebar from '../components/ui/filterSideBar';
import ProductCard from '../components/ui/productcard';
import naxosimage from '../images/naxos.jpg';
import laytonimage from '../images/layton.jpg';
import grandsoirimage from '../images/grandsoirbad.jpg';

const products = [
  {
    id: 1,
    name: "XJ 1861 Naxos",
    image: naxosimage,    
    originalPrice: 270,
    discountedPrice: 180,
    isInBasket: false,
  },
  {
    id: 2,
    name: "Layton",
    image: laytonimage, 
    originalPrice: 250,
    priceRange: "$200-300",
    isInBasket: true,
  },
  {
    id: 3,
    name: "Grand Soir",
    image: grandsoirimage,    
    originalPrice: 220,
    priceRange: "$180-270",
    isInBasket: false,
  },
];

const MainPage: React.FC = () => {
  // Handler for adding products to the basket
  const handleAddToBasket = (productId: number) => {
    console.log(`Add product with ID ${productId} to basket`);
    // Implement actual logic to add product to the basket here
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {/* Sidebar */}
      <FilterSidebar />

      {/* Main Content (Product Grid) */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6">Our Perfumes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render ProductCard components based on products data */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id = {product.id}
              name={product.name}
              image={product.image}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              priceRange={product.priceRange}
              isInBasket={product.isInBasket}
              onAddToBasket={() => handleAddToBasket(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
