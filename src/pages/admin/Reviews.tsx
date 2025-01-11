import { approveReviewRequest, getAllReviewsRequest, rejectReviewRequest } from '@/api'
import { ReviewExtended } from '@/types/entity/Review'
import React, { useEffect, useState } from 'react'

type Props = {}

const Reviews = (props: Props) => {
  const [reviews, setReviews] = useState<ReviewExtended[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReviews()
  }, [])

  const getReviews = async () => {
    try {
      setLoading(true)
      const response = await getAllReviewsRequest()

      setReviews(response.data.reviews)
    } catch (error) {
      console.error('Error getting reviews', error)
    } finally {
      setLoading(false)
    }
  }

  const renderReview = (review: ReviewExtended) => {
    const handleRejectReview = (id: string) => {
      rejectReviewRequest(id)
      setTimeout(() => getReviews(), 400)
    }

    const handleApproveReview = (id: string) => {
      approveReviewRequest(id)
      setTimeout(() => getReviews(), 400)
    }

    const renderApproveReject = () => {
      if (review.isApproved) {
        return <span className='text-green-500'>Approved</span>
      }
      return (
        <div className='flex items-center gap-2'>
          <button
            className='px-4 py-2 text-sm bg-white border-2 border-primary text-primary rounded hover:bg-red-500 hover:border-red-500 hover:text-white transition-all'
            onClick={() => handleRejectReview(review.id)}
          >
            Reject
          </button>
          <button
            className='px-4 py-2 text-sm bg-primary border-2 border-primary text-white rounded hover:bg-green-600 hover:border-green-600 transition-all'
            onClick={() => handleApproveReview(review.id)}
          >
            Approve
          </button>
        </div>
      )
    }
    return (
      <div key={review.id} className='p-6 bg-white rounded-lg shadow-md'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h2 className='text-xl font-semibold'>{review.perfumeName}</h2>
            <p className='text-gray-600'>By {review.user}</p>
          </div>
          <span className='text-sm text-gray-500'>{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
        <div className='flex'>
          <p className='text-gray-700 flex-1'>{review.comment}</p>
          {renderApproveReject()}
        </div>
      </div>
    )
  }
  return (
    <div className='flex justify-center '>
      <div className='flex flex-col gap-4 p-8 w-full  max-w-[1440px] mt-4'>
        <h1 className='text-3xl font-bold'>Reviews</h1>
        {loading ? <p>Loading...</p> : reviews.map(review => renderReview(review))}
      </div>
    </div>
  )
}

export default Reviews
