import axios, { AxiosResponse } from 'axios'

import { AdminOrder, MakeOrderRequest } from '@/types/orderTypes'

const ENDPOINT = '/orders'

import { Order } from '@/types/orderTypes' // Adjust the import path as needed

interface OrdersResponse {
  message: string
  items: Order[]
}
interface AllOrdersResponse {
  message: string
  items: AdminOrder[]
}

const getOrdersRequest = () => axios.get<OrdersResponse>('/orders')
const getAllOrdersRequest = () => axios.get<AllOrdersResponse>('/orders/all')

const makeOrder = async (body: MakeOrderRequest): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(ENDPOINT, body)
  return response
}

const updateOrderStatus = async (orderId: string, status: string): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(`${ENDPOINT}/updateStatus/${orderId}/${status}`)
  return response
}

export { makeOrder, getOrdersRequest, getAllOrdersRequest, updateOrderStatus }
