import { emptyCartRequest, getCartRequest, syncCartRequest } from '@/api'
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
  emptyCartRequest: () => {}
})

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [basket, setBasket] = useState<BasketItem[]>([])

  // #region Setter Functions ===========================================================
  const updateBasket = (items: BasketItem[]) => {
    setBasket(items)
    syncCartHelper(items)
  }

  const addToBasket = (item: BasketItem) => {
    const basketItem = basket.find(basketItem => basketItem.perfumeId === item.perfumeId)
    if (basketItem) {
      basketItem.quantity += item.quantity
      updateBasket([...basket])
    } else {
      updateBasket([...basket, item])
    }
  }

  const removeFromBasket = (id: string) => {
    const basketItems = basket.filter(item => item.perfumeId !== id)
    if (basketItems.length === 0) {
      emptyCart()
    } else {
      updateBasket(basketItems)
    }
  }

  const syncCart = async () => {
    syncCartHelper(basket)
  }

  const syncCartHelper = async (actualBasket: BasketItem[]) => {
    const getBasketResponse = await getCartRequest()
    const syncItems = getBasketResponse.data.items.items
    const basketItemsNotInSync = actualBasket.filter(
      basketItem => !syncItems.some(syncItem => syncItem.perfumeId === basketItem.perfumeId)
    )

    const body = {
      items: basketItemsNotInSync.map(item => ({
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
    <CartContext.Provider
      value={{ basket, addToBasket, removeFromBasket, getBasketProduct, syncCart, emptyCartRequest }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
