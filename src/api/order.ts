import axios, { AxiosResponse } from 'axios'

import { MakeOrderRequest } from '@/types/orderTypes'

const ENDPOINT = '/orders'

const makeOrder = async (body: MakeOrderRequest): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(ENDPOINT, body)
  return response
}

export { makeOrder }
