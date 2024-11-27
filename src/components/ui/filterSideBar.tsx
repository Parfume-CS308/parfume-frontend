import initialFilters from '@/constants/initialFilters'
import { Genders, PerfumeTypes } from '@/types/enums'
import React, { useState } from 'react'

export interface FilterState {
  category: string[]
  brand: string[]
  gender: string[]
  type: string[]
  priceRange: {
    min: number
    max: number
  }
  rating: number
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
  brands: string[]
  categories: string[]
  filters: FilterState
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ brands, categories, filters, onFilterChange }) => {
  const handleCheckboxChange = (filterType: 'category' | 'brand' | 'gender' | 'type', value: string) => {
    const updatedFilters = { ...filters }
    const array = updatedFilters[filterType] as string[]

    if (array.includes(value)) {
      // Remove value if already selected
      updatedFilters[filterType] = array.filter(item => item !== value)
    } else {
      // Add value if not selected
      updatedFilters[filterType] = [...array, value]
    }

    onFilterChange(updatedFilters)
  }

  const handlePriceChange = (value: number) => {
    const updatedFilters = {
      ...filters,
      priceRange: structuredClone({
        ...filters.priceRange,
        max: value
      })
    }

    onFilterChange(updatedFilters)
  }

  const handleRatingChange = (value: number) => {
    const updatedFilters = {
      ...filters,
      rating: value
    }

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
        <h3 className='font-semibold text-gray-700 mb-3'>Brand</h3>
        <div className='space-y-2'>
          {brands.map(brand => (
            <label key={brand} className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.brand.includes(brand)}
                onChange={() => handleCheckboxChange('brand', brand)}
                className='form-checkbox rounded text-blue-600'
              />
              <span className='ml-2 text-gray-700'>{brand}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Gender Filter */}
      <div className='mb-6'>
        <h3 className='font-semibold text-gray-700 mb-3'>Gender</h3>
        <div className='space-y-2'>
          {Object.values(Genders).map(gender => (
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
          {Object.values(PerfumeTypes).map(type => (
            <label key={type} className='flex items-center'>
              <input
                type='checkbox'
                checked={filters.type.includes(type)}
                onChange={() => handleCheckboxChange('type', type)}
                className='form-checkbox rounded text-blue-600'
              />
              <span className='ml-2 text-gray-700'>{type}</span>
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
          {categories.map(category => (
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
          onFilterChange(initialFilters)
        }}
        className='w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterSidebar
