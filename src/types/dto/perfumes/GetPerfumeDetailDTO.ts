import { Perfume } from '@/types/entity/Perfume'

export interface GetPerfumeDetailDTO extends Perfume {
  averageRating: number
  reviewCount: number
  activeDiscount: {
    rate: number
  }
}
