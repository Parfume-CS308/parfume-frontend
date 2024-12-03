// types.ts
export interface OrderItem {
  perfumeId: string
  perfumeName: string
  volume: number
  quantity: number
  price: number
  totalAmount: number
}

export interface Order {
  orderId: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  appliedCampaigns: any[]
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  createdAt: string
}

export type MakeOrderRequest = {
  shippingAddress: string
  taxId: string
  campaignIds: string[]
  paymentId: string
  cardNumber: string
  cardHolder: string
  expiryDateMM: string
  expiryDateYY: string
  cvv: string
}
