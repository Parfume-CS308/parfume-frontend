import { AddCategoryDTO } from '@/types/dto/category/AddCategoryDTO'
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

const deleteCategory = async (id: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(`${ENDPOINT}/${id}`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const createCategory = async (addCategoryDTO: AddCategoryDTO): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(ENDPOINT, addCategoryDTO)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getCategories, deleteCategory, createCategory }
