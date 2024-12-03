import axios from 'axios'

const ENDPOINT = '/review'

export const getAllPublicReviewsForPerfume = async (perfumeId: string) => {
  const response = await axios.get(`${ENDPOINT}/${perfumeId}/public`)
  return response
}

export const makeReview = async (perfumeId: string, review: any) => {
  const response = await axios.post(`${ENDPOINT}/${perfumeId}`, {
    rating: review.rating,
    comment: review.comment
  })
  return response
}