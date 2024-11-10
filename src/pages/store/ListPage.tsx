import Combobox from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { LucideCheck } from 'lucide-react'
import React from 'react'

type Props = {}

const sortItemOptions = [
  { value: 'new', label: 'New' },
  { value: 'price-asc', label: 'Price ascending' },
  { value: 'price-desc', label: 'Price descending' },
  { value: 'rating', label: 'Rating' }
]

const ListPage = () => {
  // #region States and Variables =========================================================
  const [searchText, setSearchText] = React.useState('')
  const [selectedSortKey, setSelectedSortKey] = React.useState(sortItemOptions[0].value)

  // #endregion

  // #region Render Functions =============================================================

  const renderListPageHeader = () => {
    return (
      <div id='list-page-header' className='flex items-center flex-wrap md:flex-nowrap gap-2'>
        <Input
          placeholder='Search'
          className='w-[372px] bg-white '
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <div className='flex-1' />
        <div className='flex-nowrap gap-2 hidden lg:flex'>
          {sortItemOptions.map(item => (
            <ListPageHeaderSortingItem
              key={item.value}
              isSelected={selectedSortKey === item.value}
              label={item.label}
              setSelected={() => {
                setSelectedSortKey(item.value)
              }}
            />
          ))}
        </div>
        <div className='lg:hidden block sm:w-full md:w-fit'>
          <Combobox options={sortItemOptions} value={selectedSortKey} setValue={setSelectedSortKey} />
        </div>
      </div>
    )
  }

  // #endregion

  return (
    <div className='bg-white w-full h-full rounded p-4'>
      <div id='list-page-sidebar'></div>
      <div>
        {renderListPageHeader()}
        <div id='list-page-content'></div>
      </div>
    </div>
  )
}

const ListPageHeaderSortingItem = ({
  isSelected,
  label,
  setSelected
}: {
  isSelected: boolean
  label: string
  setSelected: Function
}) => {
  return (
    <div
      className={`flex items-center  cursor-pointer ${
        isSelected ? 'text-white bg-black gap-2 w-fit' : 'text-gray-400 bg-gray-200 w-fit'
      } p-2 px-4 rounded-lg cursor-pointer transition-all duration-300 `}
      onClick={() => setSelected()}
    >
      {<LucideCheck size={16} className={`${isSelected ? 'opacity-100' : 'opacity-0 w-0'}`} />}
      {label}
    </div>
  )
}

export default ListPage
