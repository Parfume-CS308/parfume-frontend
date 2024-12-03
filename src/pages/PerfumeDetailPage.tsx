import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StarRating from '../components/ui/StarRating.tsx'
import FragranceNotes from '../components/ui/FragranceNotes.tsx'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO.ts'
import { getPerfumeRequest, makeReviewRequest } from '@/api/index.ts'
import { getAllPublicReviewsForPerfume } from '@/api/review.ts'
import { cn } from '../lib/utils'
import useCart from '@/hooks/contexts/useCart.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Review } from '@/types/entity/Review.ts'
import useAuth from '@/hooks/contexts/useAuth.tsx'
import useToast from '@/hooks/contexts/useToast.tsx'
import StarRatingSelect from '@/components/ui/StarRatingSelect.tsx'

const PerfumeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [perfume, setPerfume] = useState<GetPerfumeDetailDTO | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [comment, setComment] = useState('')
  const [isReviewLoading, setIsReviewLoading] = useState(false)
  const [rating, setRating] = useState(0)

  const navigate = useNavigate()
  const { addToBasket, getBasketProduct } = useCart()
  const { addToast } = useToast()
  const { isAuthenticated, user } = useAuth()

  const basketProduct = getBasketProduct(id ?? '')

  // #region Mount Functions ==============================================================
  useEffect(() => {
    getPerfume()
    getPerfumeReviews()
  }, [])

  const getPerfume = async () => {
    try {
      if (id) {
        const response = await getPerfumeRequest(id)
        const minVolume = response.data.item.variants.reduce((prev, current) =>
          prev.volume < current.volume ? prev : current
        )
        setSelectedVariant(minVolume.volume)
        setPerfume(response.data.item)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPerfumeReviews = async () => {
    try {
      if (id) {
        const response = await getAllPublicReviewsForPerfume(id)
        setReviews(response.data.reviews)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  // #endregion

  // #region Handler Functions ============================================================
  const handleAddToBasket = (perfume: GetPerfumeDetailDTO | null) => {
    const price = perfume?.variants.find(v => v.volume === selectedVariant)?.price
    const basketItem = {
      perfumeId: perfume?.id ?? '',
      perfumeName: perfume?.name ?? '',
      brand: perfume?.brand ?? '',
      volume: selectedVariant,
      quantity: 1,
      basePrice: price ?? 0
    }

    if (basketItem) {
      addToBasket(basketItem)
    }
  }

  const handleMakeReview = async () => {
    try {
      if (id) {
        setIsReviewLoading(true)
        const response = await makeReviewRequest(id, { rating: 5, comment })
        addToast('default', 'Review submitted successfully. It will be visible after approval.')
        setIsReviewLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  // #endregion

  // #region Render Functions =============================================================
  const renderEmptyState = () => {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>Fragrance Not Found</h2>
          <p className='text-gray-600 mb-6'>The fragrance you're looking for could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className='text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors'
          >
            ← Back to Products
          </button>
        </div>
      </div>
    )
  }

  const renderVariantSelector = () => {
    const selected = perfume?.variants.find(v => v.volume === selectedVariant)
    const inStock = selected ? selected.stock > 0 : false
    return (
      <>
        <div className='flex items-center gap-2'>
          {perfume?.variants.map(variant => (
            <span
              className={cn('p-4 border-blue-700 border-2 cursor-pointer', {
                'bg-blue-700 text-white': selectedVariant === variant.volume
              })}
              onClick={() => setSelectedVariant(variant.volume)}
            >
              {variant.volume}
            </span>
          ))}
        </div>
        <p className='text-3xl font-bold text-gray-900 mt-2'>${selected?.price} </p>

        <div className='flex flex-wrap gap-2'>
          <span className='px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700'>{perfume?.gender}</span>
          {!inStock && <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm'>Out of Stock</span>}
        </div>

        <p className='text-gray-700'>{perfume?.description}</p>

        <button
          className={`w-full py-3 rounded-lg text-white font-medium ${
            !inStock || !!basketProduct ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={!inStock || !!basketProduct}
          onClick={() => handleAddToBasket(perfume)}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </>
    )
  }

  const renderRatingSection = () => {
    const reviewPointCount = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    }, {} as { [key: number]: number })

    const fullName = isAuthenticated ? `${user?.firstName} ${user?.lastName}` : 'Anonymous'

    return (
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <h2 className='text-2xl font-bold mb-6'>Ratings & Reviews</h2>

        <div className='flex items-center gap-8 mb-8'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-gray-900 mb-2'>{perfume?.averageRating?.toFixed(1) ?? 0}</div>
            <StarRating rating={perfume?.averageRating ?? 0} size='lg' showNumber={false} />
            <div className='text-sm text-gray-500 mt-1'>{perfume?.averageRating} ratings</div>
          </div>

          <div className='flex-1 space-y-2'>
            {[5, 4, 3, 2, 1].map((star, index) => {
              const percentage = reviewPointCount[star]
                ? ((reviewPointCount[star] / reviews.length) * 100).toFixed(1)
                : 0
              return (
                <div key={index} className='flex items-center gap-2'>
                  <div className='w-12 text-sm text-gray-600'>{star} stars</div>
                  <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div className='h-full bg-yellow-400 rounded-full' style={{ width: `${percentage}%` }} />
                  </div>
                  <div className='w-12 text-sm text-gray-500'>{percentage}%</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col gap-4 mb-8'>
          {reviews?.map(review => {
            if (review.comment && review.isApproved) {
              return (
                <div key={review.id} className='flex items-start gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='text-lg font-bold'>{review.user}</h3>
                      <StarRating rating={review.rating} size='sm' />
                    </div>
                    <p className='text-gray-600'>{review.comment}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
        {isAuthenticated && (
          <div>
            <Textarea className='mb-4' value={comment} onChange={e => setComment(e.target.value)} />
            <button
              className='w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors'
              onClick={handleMakeReview}
              disabled={isReviewLoading}
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    )
  }
  // #endregion

  if (isLoading) {
    return <>Loading...</>
  }

  if (perfume == null) {
    return renderEmptyState()
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-12'>
        {/* Left side - Image and Details */}
        <div className='lg:w-1/2'>
          <div className='sticky top-8'>
            <img
              src={perfume?.assetUrl}
              alt={`${perfume.name}`}
              className='w-full rounded-lg shadow-lg object-contain'
            />
            <div className='mt-6 space-y-4'>
              <div className='flex justify-between items-start'>
                <div>
                  <h1 className='text-3xl font-bold'>{perfume.name}</h1>
                </div>
                <button className='text-gray-500 hover:text-red-500'>
                  <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.414l1.318-1.096a4.5 4.5 0 016.364 6.364l-7.318 7.318a.75.75 0 01-1.06 0l-7.318-7.318a4.5 4.5 0 010-6.364z'
                    />
                  </svg>
                </button>
              </div>

              <div className='flex items-center gap-2'>
                <StarRating rating={perfume.averageRating ?? 0} size='lg' />
                <span className='text-gray-500'>({reviews.length} ratings)</span>
              </div>

              {renderVariantSelector()}
            </div>
          </div>
        </div>

        {/* Right side - Notes and Reviews */}
        <div className='lg:w-1/2 space-y-8'>
          {/* Fragrance Notes */}
          {/* <FragranceNotes top={fragrance.notes.top} heart={fragrance.notes.heart} base={fragrance.notes.base} /> */}

          {/* Ratings Section */}
          {renderRatingSection()}
        </div>
      </div>
    </div>
  )
}

export default PerfumeDetailPage
