import React, { useState } from 'react'

export interface FilterState {
  gender: string[]
  essence: string[]
  priceRange: {
    min: number
    max: number
  }
  rating: number
  category: string[]
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    essence: [],
    priceRange: {
      min: 0,
      max: 1000
    },
    rating: 0,
    category: []
  })

  const handleCheckboxChange = (filterType: keyof FilterState, value: string) => {
    const updatedFilters = { ...filters }
    const array = updatedFilters[filterType] as string[]

    if (array.includes(value)) {
      // Remove value if already selected
      // updatedFilters[filterType] = array.filter(item => item !== value);
    } else {
      // Add value if not selected
      // updatedFilters[filterType] = [...array, value];
    }

    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handlePriceChange = (value: number) => {
    const updatedFilters = {
      ...filters,
      priceRange: {
        ...filters.priceRange,
        max: value
      }
    }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleRatingChange = (value: number) => {
    const updatedFilters = {
      ...filters,
      rating: value
    }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  return (
    <div className='bg-white rounded-lg p-4 shadow-sm'>
      <h2 className='text-xl font-bold mb-6'>Filters</h2>

      {/* Gender Filter */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-700 mb-3'>Gender</h3>
        <div className='space-y-2'>
          {['Male', 'Female', 'Unisex'].map(gender => (
            <label key={gender} className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.gender.includes(gender)}
                onChange={() => handleCheckboxChange('gender', gender)}
                className='form-checkbox rounded text-blue-600'
              />
              <span className='ml-2 text-gray-700'>{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Essence Filter */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-700 mb-3'>Essence</h3>
        <div className='space-y-2'>
          {['EDT', 'EDP', 'Parfum'].map(essence => (
            <label key={essence} className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.essence.includes(essence)}
                onChange={() => handleCheckboxChange('essence', essence)}
                className='form-checkbox rounded text-blue-600'
              />
              <span className='ml-2 text-gray-700'>{essence}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-700 mb-3'>Price Range</h3>
        <div className='px-2'>
          <div className='flex justify-between text-sm text-gray-600 mb-2'>
            <span>{formatPrice(0)}</span>
            <span>{formatPrice(filters.priceRange.max)}</span>
          </div>
          <input
            type='range'
            min='0'
            max='1000'
            step='10'
            value={filters.priceRange.max}
            onChange={e => handlePriceChange(Number(e.target.value))}
            className='w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer'
          />
        </div>
      </div>

      {/* Rating */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-700 mb-3'>Minimum Rating</h3>
        <div className='px-2'>
          <div className='flex justify-between text-sm text-gray-600 mb-2'>
            <span>★</span>
            <span className='text-yellow-500'>{filters.rating === 0 ? 'Any' : `${filters.rating}★`}</span>
          </div>
          <input
            type='range'
            min='0'
            max='5'
            step='0.5'
            value={filters.rating}
            onChange={e => handleRatingChange(Number(e.target.value))}
            className='w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer'
          />
        </div>
      </div>

      {/* Category */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-700 mb-3'>Category</h3>
        <div className='space-y-2'>
          {['Summer', 'Winter', 'Spring/Fall'].map(category => (
            <label key={category} className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.category.includes(category)}
                onChange={() => handleCheckboxChange('category', category)}
                className='form-checkbox rounded text-blue-600'
              />
              <span className='ml-2 text-gray-700'>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          const resetFilters = {
            gender: [],
            essence: [],
            priceRange: { min: 0, max: 1000 },
            rating: 0,
            category: []
          }
          setFilters(resetFilters)
          onFilterChange(resetFilters)
        }}
        className='w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterSidebar
