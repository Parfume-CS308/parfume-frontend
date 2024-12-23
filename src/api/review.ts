import axios from 'axios'

const ENDPOINT = '/review'

export const getAllPublicReviewsForPerfume = async (perfumeId: string) => {
  const response = await axios.get(`${ENDPOINT}/${perfumeId}/public`)
  return response
}

export const getAllReviewsForPerfume = async (perfumeId: string) => {
  const response = await axios.get(`${ENDPOINT}/${perfumeId}/public`)
  return response
}

export const makeReview = async (perfumeId: string, review: any) => {
  const response = await axios.post(`${ENDPOINT}/${perfumeId}`, {
    comment: review.comment
  })
  return response
}

export const getAverageRating = async (perfumeId: string) => {
  const response = await axios.get(`${ENDPOINT}/rating/${perfumeId}`)
  return response
}

export const makeRating = async (perfumeId: string, body: { rating: number }) => {
  const response = await axios.post(`${ENDPOINT}/rating/${perfumeId}`, body)
  return response
}
