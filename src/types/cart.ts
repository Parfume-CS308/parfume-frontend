export interface CartItem {
  perfumeId: string
  perfumeName: string
  brand: string
  volume: number
  quantity: number
  price: number
  discountedPrice: number
}

export interface Cart {
  id: string
  items: CartItem[]
  totalPrice: number
  totalDiscountedPrice: number
}

export interface CartResponse {
  message: string
  items: Cart
}

export interface SyncCartItem {
  perfume: string // perfumeId
  volume: number
  quantity: number
}

export interface SyncCartRequest {
  items: SyncCartItem[]
}
