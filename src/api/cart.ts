import axios, { AxiosResponse } from 'axios'
import { CartResponse, SyncCartRequest } from '../types/cart'

const ENDPOINT = '/cart'

const getCart = async () => {
  return await axios.get<CartResponse>(ENDPOINT)
}

const syncCart = async (data: SyncCartRequest) => {
  const response = await axios.post<CartResponse>(ENDPOINT + '/sync', data)
  return response
}

const emptyCart = async () => {
  return await axios.post<CartResponse>(ENDPOINT + '/clear')
}

const addToCart = async (data: { perfumeId: string; volume: number; quantity: number }) => {
  return await axios.post<CartResponse>(ENDPOINT + '/add', {
    items: [
      {
        perfume: data.perfumeId,
        volume: data.volume,
        quantity: data.quantity
      }
    ]
  })
}

const removeFromCart = async (data: { perfumeId: string; volume: number; quantity: number }) => {
  return await axios.post<CartResponse>(ENDPOINT + '/remove', {
    perfume: data.perfumeId,
    volume: data.volume,
    quantity: data.quantity
  })
}

export { getCart, syncCart, emptyCart, addToCart, removeFromCart }
