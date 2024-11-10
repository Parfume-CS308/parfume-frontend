import { LoginDTO } from '@/types/dto/auth/LoginDTO'
import { RegisterDTO } from '@/types/dto/auth/RegisterDTO'
import LoginResponse from '@/types/response/auth/LoginResponse'
import MeResponse from '@/types/response/auth/MeResponse'
import RegisterResponse from '@/types/response/auth/RegisterResponse'
import axios, { AxiosResponse } from 'axios'

const ENDPOINT = '/auth'

const login = async (data: LoginDTO): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const body = {
      email: data.email,
      password: data.password
    }

    const response: AxiosResponse<LoginResponse> = await axios.post(ENDPOINT + '/login', body)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const register = async (data: RegisterDTO): Promise<AxiosResponse<RegisterResponse>> => {
  try {
    const body = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender
    }

    const response: AxiosResponse<RegisterResponse> = await axios.post(ENDPOINT + '/signup', body)

    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const me = async (): Promise<AxiosResponse<MeResponse>> => {
  try {
    const response: AxiosResponse<MeResponse> = await axios.get(ENDPOINT + '/me')
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

const logout = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(ENDPOINT + '/logout')
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { login, register, me, logout }
