export { login as loginRequest } from './auth'
export { register as registerRequest } from './auth'
export { me as meRequest } from './auth'
export { logout as logoutRequest } from './auth'

export { getPerfumes as getPerfumesRequest } from './perfumes'
export { getPerfume as getPerfumeRequest } from './perfumes'

export { getCategories as getCategoriesRequest } from './categories'
export { deleteCategory as deleteCategoryRequest } from './categories'
export { createCategory as createCategoryRequest } from './categories'

export { syncCart as syncCartRequest } from './cart'
export { getCart as getCartRequest } from './cart'
export { emptyCart as emptyCartRequest } from './cart'
export { addToCart as addToCartRequest } from './cart'
export { removeFromCart as removeFromCartRequest } from './cart'

export { getAllPublicReviewsForPerfume as getAllPublicReviewsForPerfumeRequest } from './review'
export { makeReview as makeReviewRequest } from './review'
export { getAverageRating as getAverageRatingRequest } from './review'
export { makeRating as makeRatingRequest } from './review'
export { getAllPublicReviewsForPerfume as getAllReviewsForPerfumeRequest } from './review'
export { getAllReviews as getAllReviewsRequest } from './review'
export { approveReview as approveReviewRequest } from './review'
export { rejectReview as rejectReviewRequest } from './review'

export { getOrdersRequest } from './order'
export { getAllOrdersRequest } from './order'
export { makeOrder as makeOrderRequest } from './order'
export { updateOrderStatus as updateOrderStatusRequest } from './order'
export { makeRefundRequest as makeRefundRequestRequest } from './order'
export { getRefundRequests as getRefundRequestsRequest } from './order'
export { getAllRefundRequests as getAllRefundRequestsRequest } from './order'
export { approveRefundRequest as approveRefundRequestRequest } from './order'
export { rejectRefundRequest as rejectRefundRequestRequest } from './order'

export { getDiscounts as getDiscountsRequest } from './discount'
export { createDiscount as createDiscountRequest } from './discount'
export { deleteDiscount as deleteDiscountRequest } from './discount'
