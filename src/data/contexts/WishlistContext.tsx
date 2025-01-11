import { addToCartRequest, emptyCartRequest, getCartRequest, removeFromCartRequest, syncCartRequest } from '@/api'
import useAuth from '@/hooks/contexts/useAuth'
import { createContext, useEffect, useState } from 'react'
import { Perfume } from '@/types/entity/Perfume'
import axios from 'axios'

type WishlistContext = {
  wishlist: Perfume[]
  addToWishlist: (perfumeId: string) => void
  removeFromWishlist: (perfumeId: string) => void
}

export const WishlistContext = createContext<WishlistContext | null>(null)

const WishlistContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Perfume[]>([])

  useEffect(() => {
    getWishlist()
  }, [])

  const getWishlist = async () => {
    try {
      const response = await axios.get('/wishlist')
      setWishlist(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }

  // #region Setter Functions ===========================================================

  const addToWishlist = async (perfumeId: string) => {
    try {
      const response = await axios.post('/wishlist/add', { perfumeId })
      getWishlist()
    } catch (error) {
      console.log(error)
    }
  }
  const removeFromWishlist = async (perfumeId: string) => {
    try {
      const response = await axios.delete('/wishlist/remove', { data: { perfumeId } })
      getWishlist()
    } catch (error) {
      console.log(error)
    }
  }

  // #endregion

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContextProvider
