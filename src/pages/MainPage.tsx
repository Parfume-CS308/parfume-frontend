import React, { useState, useMemo, useEffect } from 'react'
import FilterSidebar, { FilterState } from '../components/ui/filterSideBar'
import ProductCard from '../components/ui/productcard'
import { getPerfumesRequest } from '@/api'
import { getAllPerfumesDTO } from '@/types/dto/perfumes/GetAllPerfumesDTO'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'

type SortOption = 'price-asc' | 'price-desc' | 'popularity'

const MainPage: React.FC = () => {
  const [perfumes, setPerfumes] = useState<GetPerfumeDetailDTO[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    essence: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    category: []
  })

  // #region Mount Functions ==============================================================
  useEffect(() => {
    getParfumes()
  })

  const getParfumes = async () => {
    try {
      const body: getAllPerfumesDTO = {
        minPrice: -1,
        maxPrice: -1
      }
      const response = await getPerfumesRequest(body)
      setPerfumes(response.data.items)
    } catch (error) {
      console.error(error)
    }
  }
  // #endregion

  // #region Render Functions =============================================================
  const renderSidebar = () => {
    return (
      <aside className='md:w-64 flex-shrink-0'>
        <FilterSidebar onFilterChange={setFilters} initialFilters={filters} />
      </aside>
    )
  }

  const renderSearchBar = () => {
    return (
      <div className='relative'>
        <input
          type='text'
          placeholder='Search fragrances...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <svg
          className='absolute right-3 top-2.5 h-5 w-5 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    )
  }

  const renderListHeader = () => {
    return (
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>
          Our Perfumes
          <span className='text-sm text-gray-500 ml-2'>({perfumes.length} products)</span>
        </h1>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortOption)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          <option value='popularity'>Sort by Popularity</option>
          <option value='price-asc'>Price: Low to High</option>
          <option value='price-desc'>Price: High to Low</option>
        </select>
      </div>
    )
  }

  // #endregion

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col md:flex-row gap-6 p-4'>
        {renderSidebar()}
        <main className='flex-1'>
          {/* Search and Sort Controls */}
          <div className='mb-6 space-y-4'>
            {renderSearchBar()}
            {renderListHeader()}
          </div>

          {/* Product Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {perfumes.map(perfume => (
              <ProductCard key={perfume.id} perfume={perfume} onAddToBasket={() => {}} />
            ))}
          </div>

          {perfumes.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-gray-500'>No fragrances found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default MainPage
