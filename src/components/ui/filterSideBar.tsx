import React from 'react';

const FilterSidebar: React.FC = () => {
  return (
    <div className="w-full md:w-1/4 p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* Gender Filter Block */}
      <div className="p-4 border border-gray-200 rounded-lg space-y-3">
        <h3 className="font-semibold text-gray-700 pb-2 border-b border-gray-200">Gender</h3>
        <div className="flex flex-col space-y-2 pt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Female</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Unisex</span>
          </label>
        </div>
      </div>

      {/* Essence Filter Block */}
      <div className="p-4 border border-gray-200 rounded-lg space-y-3">
        <h3 className="font-semibold text-gray-700 pb-2 border-b border-gray-200">Essence</h3>
        <div className="flex flex-col space-y-2 pt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">EDT</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">EDP</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Parfum</span>
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Price Filter</h3>
          <span className="text-xs text-gray-500">$0 - $1000</span>
        </div>
        <input type="range" min="0" max="1000" className="w-full h-1.5 text-blue-700" />
      </div>

      {/* Ranking Filter */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Ranking Filter</h3>
          <span className="text-xs text-gray-500">1 - 5</span>
        </div>
        <input type="range" min="1" max="5" className="w-full h-1.5 text-blue-700" />
      </div>

      {/* Category Filter Block */}
      <div className="p-4 border border-gray-200 rounded-lg space-y-3">
        <h3 className="font-semibold text-gray-700 pb-2 border-b border-gray-200">Category</h3>
        <div className="flex flex-col space-y-2 pt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Summer</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Winter</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Spring / Fall</span>
          </label>
        </div>
      </div>

      {/* Brand Filter Block */}
      <div className="p-4 border border-gray-200 rounded-lg space-y-3">
        <h3 className="font-semibold text-gray-700 pb-2 border-b border-gray-200">Brand</h3>
        <div className="flex flex-col space-y-2 pt-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Parfums De Marly</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Maison Francis Kurkdjian</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Xerjoff</span>
          </label>
          {/* Add more brands if needed */}
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Hugo Boss</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Initio</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-700" />
            <span className="ml-2">Mancera</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
