import React, { useEffect, useState } from 'react'
import { getOrdersRequest } from '@/api' // Adjust the import path as necessary
import { Order } from '@/types/orderTypes' // Adjust the import path as necessary
import { format } from 'date-fns'

const AppAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      PROCESSING: 'bg-blue-500 text-white',
      SHIPPED: 'bg-yellow-500 text-white',
      DELIVERED: 'bg-green-500 text-white',
      CANCELLED: 'bg-red-500 text-white'
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status]}`}>
        {status.toUpperCase()}
      </span>
    )
  }

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
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Your Orders</h1>
      <div className='space-y-6'>
        {orders.map(order => (
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
              {order.status === 'DELIVERED' && (
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
                  onClick={() => alert(`Refund request for order ${order.orderId} initiated.`)}
                >
                  Request Refund
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppAdmin
