import { getAllPerfumesDTO } from '@/types/dto/perfumes/GetAllPerfumesDTO'
import { GetPerfumeResponse } from '@/types/response/perfumes/GetPerfumeResponse'
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

const getPerfume = async (id: string): Promise<AxiosResponse<GetPerfumeResponse>> => {
  try {
    const response: AxiosResponse<GetPerfumeResponse> = await axios.get(`${ENDPOINT}/${id}`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const uploadProductImage = async (image: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData()
    formData.append('file', image)
    const response: AxiosResponse = await axios.post(`/productImage`, formData)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getProductImage = async (id: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(`/productImage/${id}`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const addNewPerfume = async (body: any): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(`${ENDPOINT}/add`, body)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updatePerfume = async (id: string, body: any): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.patch(`${ENDPOINT}/update/${id}`, body)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deletePerfume = async (id: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(`${ENDPOINT}/remove/${id}`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getPerfumes, getPerfume, uploadProductImage, getProductImage, addNewPerfume, updatePerfume, deletePerfume }
