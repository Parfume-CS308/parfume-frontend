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

export const getAllReviews = async () => {
  const response = await axios.get(`${ENDPOINT}/all`)
  return response
}

export const approveReview = async (reviewId: string) => {
  const response = await axios.patch(`${ENDPOINT}/${reviewId}/approve`)
  return response
}

export const rejectReview = async (reviewId: string) => {
  const response = await axios.patch(`${ENDPOINT}/${reviewId}/reject`)
  return response
}
