import { GetAllCategoriesResponse } from '@/types/response/categories/GetAllCategoriesResponse'
import axios, { AxiosResponse } from 'axios'

const ENDPOINT = '/categories'

const getCategories = async (): Promise<AxiosResponse<GetAllCategoriesResponse>> => {
  try {
    const response: AxiosResponse<GetAllCategoriesResponse> = await axios.get(ENDPOINT)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getCategories }
