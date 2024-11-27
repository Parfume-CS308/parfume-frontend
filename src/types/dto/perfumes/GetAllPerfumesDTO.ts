import { Genders, PerfumeTypes, SortByTypes } from '@/types/enums'

export type getAllPerfumesDTO = {
  categoryIds?: string[]
  minPrice?: number
  maxPrice?: number
  brands?: string[]
  genders?: Genders[]
  type?: PerfumeTypes
  sortBy?: SortByTypes
}
