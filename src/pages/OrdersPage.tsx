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
import { getOrdersRequest } from '@/api' // Adjust the import path as necessary
import { Order, OrderStatus } from '@/types/orderTypes' // Adjust the import path as necessary
import { format } from 'date-fns'
import { cn } from '@/lib/utils' // Ensure you have a utility for class names
import { makeRefundRequest } from '@/api/order'

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'in-transit' | 'delivered' | 'cancelled'>(
    'all'
  )
  const [isModalOpen, setIsModalOpen] = useState(false) // State for modal visibility
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null) // State for the selected order

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await getOrdersRequest()
      setOrders(response.data.items || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: Order['status']) => {
    const statusStyles: { [key in Order['status']]: string } = {
      processing: 'bg-blue-500 text-white',
      'in-transit': 'bg-yellow-500 text-white',
      delivered: 'bg-green-500 text-white',
      cancelled: 'bg-red-500 text-white'
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status]}`}>
        {status.toUpperCase()}
      </span>
    )
  }

  const handleRequestRefund = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true) // Open the modal
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null) // Reset selected order
  }

  const handleRefundSubmit = async () => {
    if (!selectedOrder) return // Ensure there is a selected order

    // Collect selected items for refund
    const selectedItems = selectedOrder.items.filter((item, index) => {
      const checkbox = document.getElementById(`refund-${index}`) as HTMLInputElement
      return checkbox?.checked
    })

    try {
      const body = {
        items: selectedItems.map(item => ({
          perfumeId: item.perfumeId,
          volume: item.volume,
          quantity: item.quantity
        }))
      }

      const response = makeRefundRequest(selectedOrder.orderId, body)
    } catch (error) {
      console.error('Error requesting refund:', error)
      alert('There was an error processing your refund request. Please try again.')
    } finally {
      closeModal() // Close the modal after processing
    }
  }

  const filteredOrders = filterStatus === 'all' ? orders : orders.filter(order => order.status === filterStatus)

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-12 text-center'>
        <div className='text-gray-500 text-lg font-medium'>Loading your orders...</div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>No Orders Found</h2>
          <p className='text-gray-500 mb-6'>You haven’t placed any orders yet. Start shopping now!</p>
          <button
            onClick={() => (window.location.href = '/')}
            className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Orders</h1>

      {/* Filter by Status */}
      <div className='mb-4'>
        <label className='mr-2'>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as any)}
          className='border rounded p-2'
        >
          <option value='all'>All</option>
          <option value='processing'>Processing</option>
          <option value='in-transit'>In Transit</option>
          <option value='delivered'>Delivered</option>
          <option value='cancelled'>Cancelled</option>
        </select>
      </div>

      <div className='space-y-6'>
        {filteredOrders.map(order => (
          <div key={order.orderId} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Order Header */}
            <div className='border-b border-gray-200 p-6 flex justify-between items-center'>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>Order #{order.orderId.slice(-8)}</h2>
                <p className='text-sm text-gray-500'>Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            {/* Order Items */}
            <div className='divide-y divide-gray-200'>
              {order.items.map((item, index) => (
                <div key={index} className='flex items-center justify-between p-4'>
                  <div>
                    <p className='font-medium text-gray-800'>{item.perfumeName}</p>
                    <p className='text-sm text-gray-500'>
                      {item.volume}ml × {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>${(item.price * item.quantity).toFixed(2)}</p>
                    <p className='text-sm text-gray-500'>${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className='p-6 bg-gray-50 flex justify-between items-center'>
              <p className='text-sm text-gray-600'>
                Total: <span className='font-semibold'>${order.totalAmount}</span>
              </p>
              {order.status === OrderStatus.DELIVERED && (
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
                  onClick={() => handleRequestRefund(order)} // Open modal with selected order
                >
                  Request Refund
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refund Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Refund for Order #{selectedOrder?.orderId.slice(-8)}</DialogTitle>
            <DialogDescription>Select the perfumes to refund:</DialogDescription>
          </DialogHeader>
          <div className='mb-4'>
            {selectedOrder?.items.map((item, index) => (
              <div key={index} className='flex items-center'>
                <input type='checkbox' id={`refund-${index}`} className='mr-2' />
                <label htmlFor={`refund-${index}`}>
                  {item.perfumeName} - ${item.price} each
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <button onClick={handleRefundSubmit} className='bg-blue-500 text-white px-4 py-2 rounded mr-2'>
              Submit Refund
            </button>
            <DialogClose asChild>
              <button className='bg-gray-300 text-gray-800 px-4 py-2 rounded'>Cancel</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrdersPage
