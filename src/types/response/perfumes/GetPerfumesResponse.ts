import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'

export type GetPerfumesResponse = {
  message: string
  items: GetPerfumeDetailDTO[]
}
