export type Discount = {
  id: string
  name: string
  discountRate: number
  startDate: string
  endDate: string
  active: boolean
  perfumes: DiscountPerfume[]
  createdBy: string
}

export type DiscountPerfume = {
  id: string
  name: string
  brand: string
  originalPrice: number
  discountedPrice: number
}
