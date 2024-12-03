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

export { getCart, syncCart, emptyCart }
