import axios, { AxiosResponse } from 'axios'

import { AdminOrder, MakeOrderRequest } from '@/types/orderTypes'

const ENDPOINT = '/orders'

import { Order } from '@/types/orderTypes' // Adjust the import path as needed
import { Perfume } from '@/types/entity/Perfume'

interface OrdersResponse {
  message: string
  items: Order[]
}
interface AllOrdersResponse {
  message: string
  items: AdminOrder[]
}

type RefundPerfumeDTO = {
  items: {
    perfumeId: string
    quantity: number
  }[]
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

const makeRefundRequest = async (orderId: string, refundPerfumeDTO: RefundPerfumeDTO): Promise<AxiosResponse> => {
  const response = await axios.post<AxiosResponse>(`${ENDPOINT}/${orderId}/refundRequests`, refundPerfumeDTO)
  return response
}

const getRefundRequests = async (): Promise<AxiosResponse> => {
  const response = await axios.get<AxiosResponse>(`${ENDPOINT}/refundRequests`)
  return response
}

const getAllRefundRequests = async (): Promise<AxiosResponse> => {
  const response = await axios.get<AxiosResponse>(`${ENDPOINT}/refundRequests/all`)
  return response
}

export {
  makeOrder,
  getOrdersRequest,
  getAllOrdersRequest,
  updateOrderStatus,
  makeRefundRequest,
  getRefundRequests,
  getAllRefundRequests
}
