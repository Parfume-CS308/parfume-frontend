import { PerfumeTypes } from '../enums'

export interface Perfume {
  id: string
  name: string
  brand: string
  notes: string[]
  type: PerfumeTypes
  assetUrl: string
  season: string
  sillage: string
  longevity: string
  gender: string
  description: string
  serialNumber: number
  warrantyStatus: number
  distributor: PerfumeDistributor
  categories: PerfumeCategory[]
  variants: PerfumeVariant[]
}

export interface PerfumeVariant {
  volume: number
  basePrice: number
  price: number
  stock: number
  active: boolean
}

export interface PerfumeDistributor {
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
}

export interface PerfumeCategory {
  id: string
  name: string
  description: string
}
