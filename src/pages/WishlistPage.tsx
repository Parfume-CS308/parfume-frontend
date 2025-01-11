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
import { makeRefundRequest } from '@/api/order'
import { differenceInSeconds } from 'date-fns'
import useWishlist from '@/hooks/contexts/useWishlist'
import ProductCard from '@/components/ui/productcard'

const WishlistPage: React.FC = () => {
  const wishlishContext = useWishlist()
  const perfumes = wishlishContext?.wishlist ?? []

  if (perfumes.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>No perfume found in wishlist</h2>
          <p className='text-gray-500 mb-6'>You haven’t add any perfumes yet. Start shopping now!</p>
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
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Wishlist</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {perfumes.map(perfume => (
          // @ts-ignore
          <ProductCard key={perfume.id} perfume={perfume} />
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
