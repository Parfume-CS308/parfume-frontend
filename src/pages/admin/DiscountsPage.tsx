import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { getAllRefundRequests } from '@/api/order'
import { Refund, RefundStatuses } from '@/types/entity/Refund'
import {
  approveRefundRequestRequest,
  createDiscountRequest,
  deleteDiscountRequest,
  getDiscountsRequest,
  getPerfumesRequest,
  rejectRefundRequestRequest
} from '@/api'
import { Discount } from '@/types/entity/Discount'
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { getAllPerfumesDTO } from '@/types/dto/perfumes/GetAllPerfumesDTO'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'
import { SortOptions } from '@/types/enums'

const DiscountsPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [perfumes, setPerfumes] = useState<GetPerfumeDetailDTO[]>([])
  const [discountRate, setDiscountRate] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedPerfumes, setSelectedPerfumes] = useState<GetPerfumeDetailDTO[]>([])
  const [name, setName] = useState<string>('')

  useEffect(() => {
    fetchDiscounts()
    fetchPerfumes()
  }, [])

  const fetchDiscounts = async () => {
    try {
      setIsLoading(true)
      const response = await getDiscountsRequest()
      setDiscounts(response.data.items || [])
    } catch (error) {
      console.error('Error fetching refund requests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPerfumes = async () => {
    try {
      const body = {
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER,
        sortBy: SortOptions.NAME_ASC,
        type: []
      }
      const response = await getPerfumesRequest(body)
      setPerfumes([...response.data.items] || [])
    } catch (error) {
      console.error('Error fetching perfumes:', error)
    }
  }

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <div className='text-gray-500 text-lg font-medium'>Loading your discounts...</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-12 max-w-[1440px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 '>Discounts</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add New Discount</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Add New Discount</DialogTitle>
          <div>
            <label>Name:</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              className='border rounded p-2 w-full'
            />
          </div>
          <div>
            <label>Discount Rate:</label>
            <input
              type='number'
              value={discountRate}
              onChange={e => setDiscountRate(Number(e.target.value))}
              className='border rounded p-2 w-full'
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type='date'
              onChange={e => setStartDate(new Date(e.target.value))}
              className='border rounded p-2 w-full'
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type='date'
              onChange={e => setEndDate(new Date(e.target.value))}
              className='border rounded p-2 w-full'
            />
          </div>
          <div>
            <label>Select Perfumes:</label>
            <div className='grid grid-cols-2 gap-4' style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {perfumes.map(perfume => (
                <div
                  key={perfume.id}
                  className={`border rounded p-4 cursor-pointer ${
                    selectedPerfumes.includes(perfume) ? 'bg-blue-100' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectedPerfumes(prev =>
                      prev.includes(perfume) ? prev.filter(p => p !== perfume) : [...prev, perfume]
                    )
                  }}
                >
                  <img src={perfume.assetUrl} alt={perfume.name} className='w-full h-32 object-cover rounded mb-2' />
                  <p className='text-center font-medium'>{perfume.name}</p>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <DialogClose onClick={() => setIsDialogOpen(false)}>Close</DialogClose>
            <Button
              onClick={async () => {
                try {
                  const body = {
                    name,
                    discountRate,
                    startDate: startDate?.getTime(),
                    endDate: endDate?.getTime(),
                    perfumeIds: selectedPerfumes.map(p => p.id)
                  }
                  await createDiscountRequest(body)
                  fetchDiscounts()
                } catch (error) {
                  console.error('Error creating discount:', error)
                } finally {
                  setIsDialogOpen(false)
                  setName('')
                  setDiscountRate(0)
                  setStartDate(null)
                  setEndDate(null)
                  setSelectedPerfumes([])
                }
              }}
            >
              Add Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {discounts.length === 0 && (
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-8'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>No Discount Found</h2>
          </div>
        </div>
      )}

      <div className='space-y-6'>
        {discounts.map(discount => (
          <div key={discount.id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Request Header */}
            <div className='border-b border-gray-200 p-6 flex justify-between items-center'>
              <div>
                <h1 className='text-xl font-bold text-gray-900'>{discount.name}</h1>
                <h2 className='text-lg font-semibold text-gray-800'>Discount #{discount.id}</h2>
                <p className='text-sm text-gray-500'>
                  {format(new Date(discount.startDate), 'MMMM d, yyyy')} -{' '}
                  {format(new Date(discount.endDate), 'MMMM d, yyyy')}
                </p>
                <p className='text-sm text-gray-500'>Created by: {discount.createdBy}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  discount.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {discount.active ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* Refunded Items */}
            <div className='p-6 bg-gray-50'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Refunded Items</h3>
              <div className='divide-y divide-gray-200'>
                {discount.perfumes.map((item, index) => (
                  <div key={index} className='flex items-center justify-between p-4'>
                    <div>
                      <p className='font-medium text-gray-800'>{item.name}</p>
                      <p className='text-sm text-gray-500'>Price: ${item.originalPrice}</p>
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800'>
                        Discounted Price: ${item.discountedPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Action Buttons */}
            <div className='p-4 flex justify-end border-t border-gray-200'>
              <Button
                onClick={async () => {
                  try {
                    // Call delete function here
                    await deleteDiscountRequest(discount.id)
                    fetchDiscounts() // Refresh the discounts list
                  } catch (error) {
                    console.error('Error deleting discount:', error)
                  }
                }}
                className='bg-red-500 text-white'
              >
                Delete Discount
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiscountsPage
