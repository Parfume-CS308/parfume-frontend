import { WishlistContext } from '@/data/contexts/WishlistContext'
import { useContext } from 'react'

const useWishlist = () => {
  return useContext(WishlistContext)
}

export default useWishlist
