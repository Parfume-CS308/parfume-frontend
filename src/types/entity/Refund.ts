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
