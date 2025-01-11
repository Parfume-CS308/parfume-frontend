import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog' // Import the Dialog components

import { format } from 'date-fns'
import { cn } from '@/lib/utils' // Ensure you have a utility for class names
import { getRefundRequestsRequest } from '@/api'
import { Refund } from '@/types/entity/Refund'

const RefundsPage: React.FC = () => {
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRefunds()
  }, [])

  const fetchRefunds = async () => {
    try {
      setIsLoading(true)
      const response = await getRefundRequestsRequest()
      setRefunds(response.data.items || [])
    } catch (error) {
      console.error('Error fetching refunds:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: Refund['status']) => {
    const statusStyles: { [key in Refund['status']]: string } = {
      PENDING: 'bg-blue-500 text-white',
      APPROVED: 'bg-green-500 text-white',
      REJECTED: 'bg-red-500 text-white'
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status]}`}>
        {status.toUpperCase()}
      </span>
    )
  }

  const filteredRefunds = refunds // Add any filtering logic if necessary

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <div className='text-gray-500 text-lg font-medium'>Loading your refunds...</div>
      </div>
    )
  }

  if (refunds.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>No Refunds Found</h2>
          <p className='text-gray-500 mb-6'>You haven’t requested any refunds yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Refunds</h1>

      <div className='space-y-6'>
        {filteredRefunds.map(refund => (
          <div key={refund.refundRequestId} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Refund Header */}
            <div className='border-b border-gray-200 p-6 flex justify-between items-center'>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>Refund #{refund.refundRequestId}</h2>
                <p className='text-sm text-gray-500'>
                  Requested on {format(new Date(refund.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
              {getStatusBadge(refund.status)}
            </div>

            {/* Refund Items */}
            <div className='divide-y divide-gray-200'>
              {refund.items.map((item, index) => (
                <div key={index} className='flex items-center justify-between p-4'>
                  <div>
                    <p className='font-medium text-gray-800'>{item.perfumeName}</p>
                    <p className='text-sm text-gray-500'>TODO: VOLUME ml × {item.quantity}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>${item.refundAmount} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RefundsPage
