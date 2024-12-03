import React, { useState, useMemo, useEffect, useCallback } from 'react'
import FilterSidebar, { FilterState } from '../components/ui/filterSideBar'
import ProductCard from '../components/ui/productcard'
import { getCategoriesRequest, getPerfumesRequest } from '@/api'
import { getAllPerfumesDTO } from '@/types/dto/perfumes/GetAllPerfumesDTO'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'
import initialFilters from '@/constants/initialFilters'
import { PerfumeCategory } from '@/types/entity/Perfume'
import { Genders, PerfumeTypes, SortOptions } from '@/types/enums'
import { debounce } from 'lodash'
import { getSortOptionName } from '@/lib/helpers/sortOptionHelper'

const MainPage: React.FC = () => {
  // #region States & Variables ===========================================================
  const [perfumes, setPerfumes] = useState<GetPerfumeDetailDTO[]>([])
  const [searchedPerfumes, setSearchedPerfumes] = useState<GetPerfumeDetailDTO[]>([])
  const [categories, setCategories] = useState<PerfumeCategory[]>([])
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.BEST_SELLER)
  const [isInitialLoadCompleted, setIsInitialLoadCompleted] = useState(false)

  const brands = useMemo(() => {
    const brandSet = new Set<string>()
    perfumes.forEach(perfume => brandSet.add(perfume.brand))
    return Array.from(brandSet)
  }, [isInitialLoadCompleted])

  // #endregion

  // #region Mount Functions ==============================================================
  useEffect(() => {
    debouncedGetPerfumes({ filters, sortBy, categories: categories })
  }, [filters, sortBy, searchQuery])

  useEffect(() => {
    getCategories()
  }, [])

  const getPerfumes = async ({
    filters,
    sortBy,
    categories
  }: {
    filters: FilterState
    sortBy: SortOptions
    categories: PerfumeCategory[]
  }) => {
    const categoryIds = filters.category.reduce((acc: string[], categoryName) => {
      const relatedCategory = categories.find(c => c.name === categoryName)
      if (relatedCategory) acc.push(relatedCategory.id)
      return acc
    }, [])

    try {
      const body: getAllPerfumesDTO = {
        categoryIds: categoryIds,
        brands: filters.brand,
        genders: filters.gender as Genders[],
        type: filters?.type as PerfumeTypes[],
        minPrice: filters.priceRange.min,
        maxPrice: filters.priceRange.max,
        sortBy: sortBy
      }
      const response = await getPerfumesRequest(body)
      setPerfumes(response.data.items)
    } catch (error) {
      console.error(error)
    } finally {
      setIsInitialLoadCompleted(true)
    }
  }

  const debouncedGetPerfumes = useCallback(debounce(getPerfumes, 200), [])

  const getCategories = async () => {
    try {
      const response = await getCategoriesRequest()
      setCategories(response.data.items)
    } catch (error) {
      console.error(error)
    }
  }

  // #endregion

  // #region Handler Functions ============================================================
  useEffect(() => {
    if (searchQuery === '') {
      setSearchedPerfumes([])
      return
    }

    const newPerfumes = perfumes.filter(
      perfume =>
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchedPerfumes(newPerfumes)
  }, [searchQuery])

  // #endregion

  // #region Render Functions =============================================================
  const renderSidebar = () => {
    const categoryNames = categories.map(c => c.name)
    return (
      <aside className='md:w-64 flex-shrink-0'>
        <FilterSidebar onFilterChange={setFilters} categories={categoryNames} brands={brands} filters={filters} />
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
          onChange={e => setSortBy(e.target.value as SortOptions)}
          className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        >
          {Object.values(SortOptions).map((option, index) => (
            <option key={index} value={option}>
              {getSortOptionName(option)}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const renderPerfumes = () => {
    const isSearch = searchQuery.length > 2
    const localPerfumes = isSearch ? searchedPerfumes : perfumes

    return (
      <>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {localPerfumes.map(perfume => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {localPerfumes.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-gray-500'>No perfumes found matching your criteria.</p>
          </div>
        )}
      </>
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
          {renderPerfumes()}
        </main>
      </div>
    </div>
  )
}

export default MainPage
