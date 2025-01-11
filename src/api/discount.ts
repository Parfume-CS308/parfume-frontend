import axios from 'axios'

const ENDPOINT = '/discounts'

const getDiscounts = async () => {
  const response = await axios.get(ENDPOINT)
  return response
}

const createDiscount = async (discount: any) => {
  const response = await axios.post(ENDPOINT, discount)
  return response
}

const deleteDiscount = async (id: string) => {
  const response = await axios.delete(`${ENDPOINT}/${id}`)
  return response
}

export { getDiscounts, createDiscount, deleteDiscount }
