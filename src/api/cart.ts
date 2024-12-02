import axios from 'axios'
import { CartResponse, SyncCartRequest } from '../types/cart'

const ENDPOINT = '/cart'

const getCart = () => axios.get<CartResponse>(ENDPOINT)

const syncCart = (data: SyncCartRequest) => axios.post<CartResponse>(ENDPOINT + '/sync', data)

export { getCart, syncCart }
