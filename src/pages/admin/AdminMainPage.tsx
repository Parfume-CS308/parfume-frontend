import useAuth from '@/hooks/contexts/useAuth'
import React from 'react'

type Props = {}

const AdminMainPage = (props: Props) => {
  const { user } = useAuth()
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-purple-50 to-blue-50'>
      <div className='text-center space-y-6 max-w-3xl px-4'>
        <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
          Welcome, {user?.firstName}!
        </h1>
        <p className='text-xl text-gray-600'>To the Admin Control Center of Perfume Point</p>
        <div className='grid md:grid-cols-2 gap-6 mt-12'>
          <div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>Quick Stats</h2>
            <p className='text-gray-600'>View your dashboard analytics and key metrics at a glance</p>
          </div>
          <div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>Manage Products</h2>
            <p className='text-gray-600'>Add, edit, or remove products from your inventory</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMainPage
