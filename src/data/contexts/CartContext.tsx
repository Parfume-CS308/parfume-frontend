import { addToCartRequest, emptyCartRequest, getCartRequest, removeFromCartRequest, syncCartRequest } from '@/api'
import useAuth from '@/hooks/contexts/useAuth'
import { createContext, useEffect, useState } from 'react'

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
  syncCart: () => {},
  emptyCart: () => {}
})

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [basket, setBasket] = useState<BasketItem[]>([])
  const { isAuthenticated } = useAuth()

  // #region Setter Functions ===========================================================
  const updateBasket = (items: BasketItem[]) => {
    setBasket(items)
    if (isAuthenticated) {
      syncCartHelper(items)
    }
  }

  const addToBasket = async (item: BasketItem) => {
    try {
      // update the context
      const existingItem = basket.find(basketItem => basketItem.perfumeId === item.perfumeId)
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity }
        const updatedBasket = basket.map(basketItem =>
          basketItem.perfumeId === item.perfumeId ? updatedItem : basketItem
        )
        updateBasket(updatedBasket)
      } else {
        const updatedBasket = [...basket, item]
        updateBasket(updatedBasket)
      }

      // update the db
      if (isAuthenticated) {
        const response = await addToCartRequest({
          perfumeId: item.perfumeId,
          volume: item.volume,
          quantity: item.quantity
        })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const removeFromBasket = async (id: string) => {
    const item = basket.find(item => item.perfumeId === id)
    if (!item) return
    const updatedBasket = basket.filter(item => item.perfumeId !== id)

    if (isAuthenticated) {
      await removeFromCartRequest({ perfumeId: id, volume: item?.volume, quantity: item?.quantity })
      updateBasket(updatedBasket)
    }
  }

  const syncCart = async () => {
    console.log('FILTERED BASKET', basket)
    syncCartHelper(basket)
  }

  const syncCartHelper = async (actualBasket: BasketItem[]) => {
    const getBasketResponse = await getCartRequest()
    const syncItems = getBasketResponse.data.items.items
    const basketItemsNotInSync = actualBasket.filter(
      basketItem => !syncItems.some(syncItem => syncItem.perfumeId === basketItem.perfumeId)
    )
    const fullBasket = [...syncItems, ...basketItemsNotInSync]

    const body = {
      items: fullBasket.map(item => ({
        perfume: item.perfumeId,
        quantity: item.quantity,
        volume: item.volume
      }))
    }
    try {
      const response = await syncCartRequest(body)
      setBasket(response.data.items.items)
    } catch (error) {
      console.error('Error syncing cart:', error)
    }
  }

  const emptyCart = () => {
    setBasket([])
    emptyCartRequest()
  }

  // #endregion

  // #region Getter Functions =============================================================
  const getBasketProduct = (id: string) => {
    return basket.find(item => item.perfumeId === id)
  }
  // #endregion

  return (
    <CartContext.Provider value={{ basket, addToBasket, removeFromBasket, getBasketProduct, syncCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
