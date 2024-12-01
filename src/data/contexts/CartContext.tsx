import { syncCartRequest } from '@/api'
import { createContext, useState } from 'react'

type BasketItem = {
  perfumeId: string
  perfumeName: string
  brand: string
  volume: number
  quantity: number
  basePrice: number
}

export const CartContext = createContext({
  basket: [] as BasketItem[],
  addToBasket: (item: BasketItem) => {},
  removeFromBasket: (id: string) => {},
  getBasketProduct: (id: string) => ({} as BasketItem | undefined),
  syncCart: () => {}
})

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [basket, setBasket] = useState<BasketItem[]>([])

  // #region Setter Functions ===========================================================
  const addToBasket = (item: BasketItem) => {
    const basketItem = basket.find(basketItem => basketItem.perfumeId === item.perfumeId)
    if (basketItem) {
      basketItem.quantity += item.quantity
      setBasket([...basket])
    } else {
      setBasket([...basket, item])
    }
  }

  const removeFromBasket = (id: string) => {
    setBasket(basket.filter(item => item.perfumeId !== id))
  }

  const syncCart = async () => {
    const body = {
      items: basket.map(item => ({
        perfume: item.perfumeId,
        quantity: item.quantity,
        volume: item.volume
      }))
    }
    try {
      await syncCartRequest(body)
    } catch (error) {
      console.error('Error syncing cart:', error)
    }
  }

  // #endregion

  // #region Getter Functions =============================================================
  const getBasketProduct = (id: string) => {
    return basket.find(item => item.perfumeId === id)
  }
  // #endregion

  return (
    <CartContext.Provider value={{ basket, addToBasket, removeFromBasket, getBasketProduct, syncCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
