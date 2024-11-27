import { CartContext } from '@/data/contexts/CartContext'
import { useContext } from 'react'

const useCart = () => {
  return useContext(CartContext)
}

export default useCart
