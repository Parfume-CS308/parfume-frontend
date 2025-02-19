import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { getAllRefundRequests } from '@/api/order'
import { Refund, RefundStatuses } from '@/types/entity/Refund'
import { approveRefundRequestRequest, rejectRefundRequestRequest } from '@/api'

const RefundRequests: React.FC = () => {
  const [refundRequests, setRefundRequests] = useState<Refund[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all')

  useEffect(() => {
    fetchRefundRequests()
  }, [])

  const fetchRefundRequests = async () => {
    try {
      setIsLoading(true)
      const response = await getAllRefundRequests()
      setRefundRequests(response.data.items || [])
    } catch (error) {
      console.error('Error fetching refund requests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveRefund = async (requestId: string) => {
    try {
      await approveRefundRequestRequest(requestId)
      fetchRefundRequests()
    } catch (error) {
      console.error('Error approving refund:', error)
    }
  }

  const handleRejectRefund = async (requestId: string) => {
    try {
      await rejectRefundRequestRequest(requestId)
      fetchRefundRequests()
    } catch (error) {
      console.error('Error rejecting refund:', error)
    }
  }

  const filteredRequests =
    filterStatus === 'all' ? refundRequests : refundRequests.filter(request => request.status === filterStatus)

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <div className='text-gray-500 text-lg font-medium'>Loading your refund requests...</div>
      </div>
    )
  }

  if (refundRequests.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>No Refund Requests Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-12 max-w-[1440px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 '>Refund Requests</h1>

        <div>
          <label className='mr-2'>Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className='border rounded p-2'
          >
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
      </div>

      <div className='space-y-6'>
        {filteredRequests.map(request => (
          <div key={request.refundRequestId} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Request Header */}
            <div className='border-b border-gray-200 p-6 flex justify-between items-center'>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>Refund Request #{request.refundRequestId}</h2>
                <p className='text-sm text-gray-500'>
                  Requested on {format(new Date(request.createdAt), 'MMMM d, yyyy')}
                </p>
                <p className='text-sm text-gray-500'>User: {request.userName}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  request.status === RefundStatuses.PENDING
                    ? 'bg-yellow-500 text-white'
                    : request.status === RefundStatuses.APPROVED
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {request.status.toUpperCase()}
              </span>
            </div>

            {/* Refunded Items */}
            <div className='p-6 bg-gray-50'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Refunded Items</h3>
              <div className='divide-y divide-gray-200'>
                {request.items.map((item, index) => (
                  <div key={index} className='flex items-center justify-between p-4'>
                    <div>
                      <p className='font-medium text-gray-800'>{item.perfumeName}</p>
                      <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                    </div>
                    <div>
                      <p className='font-semibold text-gray-800'>${(item.refundAmount * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Footer */}
            <div className='p-6 bg-gray-50 flex justify-between items-center'>
              <p className='text-sm text-gray-600'>
                Total Amount: <span className='font-semibold'>${request.totalRefundAmount}</span>
              </p>
              {request.status === RefundStatuses.PENDING && (
                <div className='flex items-center gap-4'>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition'
                    onClick={() => handleRejectRefund(request.refundRequestId)}
                  >
                    Reject
                  </button>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition'
                    onClick={() => handleApproveRefund(request.refundRequestId)}
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RefundRequests
