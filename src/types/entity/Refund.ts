import { Perfume } from './Perfume'

export type Refund = {
  createdAt: number
  invoiceNumber: string
  items: RefundPerfume[]
  orderDate: number
  orderId: string
  refundRequestId: string
  status: RefundStatuses
  totalRefundAmount: number
  userName: string
  userId: string
  userEmail: string
}

export enum RefundStatuses {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export type RefundPerfume = {
  brand: string
  perfumeName: string
  quantity: number
  refundAmount: number
}
