import React, { useEffect, useState } from 'react'
import { getAllOrdersRequest, getOrdersRequest, updateOrderStatusRequest } from '@/api' // Adjust the import path as necessary
import { AdminOrder, Order, OrderStatus } from '@/types/orderTypes' // Adjust the import path as necessary
import { format } from 'date-fns'

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'in-transit' | 'delivered' | 'cancelled'>(
    'all'
  )

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await getAllOrdersRequest()
      setOrders(response.data.items || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: AdminOrder['status']) => {
    const statusStyles: { [key in AdminOrder['status']]: string } = {
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

  const handleApproveOrder = async (orderId: string) => {
    try {
      await updateOrderStatusRequest(orderId, OrderStatus.SHIPPED)
      fetchOrders()
    } catch (error) {
      console.error('Error approving order:', error)
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
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 '>Orders</h1>

        <div>
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
      </div>

      <div className='space-y-6'>
        {filteredOrders.map(order => (
          <div key={order.orderId} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Order Header */}
            <div className='border-b border-gray-200 p-6 flex justify-between items-center'>
              <div>
                <h2 className='text-lg font-semibold text-gray-800'>Order #{order.orderId.slice(-8)}</h2>
                <p className='text-sm text-gray-500'>Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}</p>
                <p className='text-sm text-gray-500'>User: {order.userName}</p>
                <p className='text-sm text-gray-500'>Shipping Address: {order.shippingAddress}</p>
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
              {order.status === OrderStatus.PROCESSING && (
                <button
                  className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition'
                  onClick={() => handleApproveOrder(order.orderId)}
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
