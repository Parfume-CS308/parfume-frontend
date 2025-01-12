import { deletePerfumeRequest, getPerfumesRequest } from '@/api'
import { Button } from '@/components/ui/button'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'
import { SortOptions } from '@/types/enums'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'

type Props = {}

const ProductsPage = (props: Props) => {
  const [perfumes, setPerfumes] = React.useState<GetPerfumeDetailDTO[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedPerfume, setSelectedPerfume] = React.useState<GetPerfumeDetailDTO | null>(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchPerfumes()
  }, [])

  const fetchPerfumes = async () => {
    try {
      const body = {
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER,
        sortBy: SortOptions.NAME_ASC,
        type: []
      }
      const response = await getPerfumesRequest(body)
      setPerfumes(response.data.items)
    } catch (error) {
      console.error('Error fetching perfumes:', error)
    }
  }

  const filteredPerfumes = perfumes.filter(perfume => perfume.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className='flex justify-center'>
      <div className='p-4 mt-8 max-w-[1440px] w-full'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold mb-4'>Products</h1>
          <div className='flex items-center gap-4'>
            <input
              type='text'
              placeholder='Search perfumes...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='border rounded p-2'
            />
            <Button onClick={() => navigate('/add-product')}>Add Product</Button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredPerfumes.map(perfume => (
            <div
              key={perfume.id}
              className='bg-white shadow-lg rounded-lg p-4 cursor-pointer'
              onClick={() => setSelectedPerfume(perfume)}
            >
              <div className='flex items-center gap-4'>
                <img src={perfume.assetUrl} alt={perfume.name} className='w-24 h-24 object-cover' />
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>{perfume.name}</h2>
                  <p className='text-gray-500'>{perfume.brand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPerfume && (
          <Dialog open onOpenChange={() => setSelectedPerfume(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedPerfume.name}</DialogTitle>
                <DialogDescription>
                  <p>ID: {selectedPerfume.id}</p>
                  <p>Brand: {selectedPerfume.brand}</p>
                  <p>Description: {selectedPerfume.description}</p>
                  {selectedPerfume.categories && <p>Category: {selectedPerfume.categories.map((category) => category.name).join(', ')}</p>}
                  <p>Distributor: {selectedPerfume.distributor.name}</p>
                  <p>Gender: {selectedPerfume.gender}</p>
                  <p>Longevity: {selectedPerfume.longevity}</p>
                </DialogDescription>
              </DialogHeader>
              <DialogClose />
              <DialogFooter>
                <Button className='bg-red-500' onClick={() => deletePerfumeRequest(selectedPerfume.id)}>
                  Remove
                </Button>
                <Button onClick={() => navigate(`/perfume/${selectedPerfume.id}`)}>Go to detail</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
