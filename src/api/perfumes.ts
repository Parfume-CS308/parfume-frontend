import { getAllPerfumesDTO } from '@/types/dto/perfumes/GetAllPerfumesDTO'
import { GetPerfumesResponse } from '@/types/response/perfumes/GetPerfumesResponse'
import axios, { AxiosResponse } from 'axios'

const ENDPOINT = '/perfumes'

const getPerfumes = async (body: getAllPerfumesDTO): Promise<AxiosResponse<GetPerfumesResponse>> => {
  try {
    const response: AxiosResponse<GetPerfumesResponse> = await axios.post(ENDPOINT, body)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getPerfumes }
