import React, { useEffect } from 'react'
import StarRating from './StarRating'
import { GetPerfumeDetailDTO } from '@/types/dto/perfumes/GetPerfumeDetailDTO'
import useCart from '@/hooks/contexts/useCart'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { Button } from './button'
import useAuth from '@/hooks/contexts/useAuth'
import useWishlist from '@/hooks/contexts/useWishlist'

interface ProductCardProps {
  perfume: GetPerfumeDetailDTO
}

const ProductCard: React.FC<ProductCardProps> = ({ perfume }) => {
  const [selectedVariant, setSelectedVariant] = React.useState(perfume.variants[0])
  const [isVariantSelectionDialogOpen, setIsVariantSelectionDialogOpen] = React.useState(false)
  const { getBasketProduct, addToBasket, removeFromBasket } = useCart()
  const { isAuthenticated } = useAuth()
  const wishlistContext = useWishlist()
  const navigate = useNavigate()

  const totalStock = perfume.variants.reduce((acc, variant) => acc + variant.stock, 0)
  const isOutOfStock = totalStock === 0
  const isLastOneItem = totalStock === 1

  // #region Mount Functions ==============================================================
  useEffect(() => {
    setMinimumVariantWithStock()
  }, [])

  const setMinimumVariantWithStock = () => {
    const variantsWithStock = perfume.variants.filter(variant => variant.stock > 0).sort((a, b) => a.volume - b.volume)

    const basketVariant = perfume.variants.find(variant => getBasketProduct(perfume.id, variant.volume))
    setSelectedVariant(basketVariant || (variantsWithStock.length > 0 ? variantsWithStock[0] : perfume.variants[0]))
  }
  // #endregion

  // #region Handler Functions ============================================================

  const handleProductCardClick = (id: string) => {
    navigate(`/perfume/${id}`)
  }

  // #endregion

  // #region Render Functions =============================================================
  const renderOutOfStockBanner = () => {
    if (!isOutOfStock) return null

    return (
      <div className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm z-10'>Out of Stock</div>
    )
  }

  const renderLastOneItemBanner = () => {
    if (!isLastOneItem) return null

    return (
      <div className='absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm z-10'>Last stock</div>
    )
  }

  const renderActiveDiscountBanner = () => {
    if (!perfume.activeDiscount) return null

    return (
      <div className='absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm z-10'>
        {perfume.activeDiscount.rate}% Discount
      </div>
    )
  }

  const renderPerfumeImage = () => {
    const isInWishlist = wishlistContext?.wishlist.some(item => item.id === perfume.id)
    return (
      <div className='relative h-72 cursor-pointer' onClick={() => handleProductCardClick(perfume.id)}>
        <img src={perfume.assetUrl} alt={`${perfume.name}`} className='w-full h-full object-contain rounded-lg' />
        {isAuthenticated && (
          <button
            className={`absolute top-3 right-0 ${isInWishlist ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            onClick={e => {
              e.stopPropagation()
              if (isInWishlist) {
                wishlistContext?.removeFromWishlist(perfume.id)
              } else {
                wishlistContext?.addToWishlist(perfume.id)
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.414l1.318-1.096a4.5 4.5 0 016.364 6.364l-7.318 7.318a.75.75 0 01-1.06 0l-7.318-7.318a4.5 4.5 0 010-6.364z'
              />
            </svg>
          </button>
        )}
      </div>
    )
  }

  const renderPerfumeInformation = () => {
    const renderRating = () => {
      if (!perfume?.reviewCount || !perfume?.averageRating) return null
      return (
        <div className='flex items-center gap-2'>
          <StarRating rating={perfume.averageRating} size='sm' />
          <span className='text-sm text-gray-500'>({perfume.reviewCount})</span>
        </div>
      )
    }
    const renderPrice = () => {
      if (isOutOfStock) return null
      const hasDiscount = perfume.activeDiscount

      if (hasDiscount) {
        const discountedPrice = selectedVariant.price - selectedVariant.price * (perfume.activeDiscount.rate / 100)
        return (
          <div className='mt-2'>
            <span className='text-gray-400 line-through'>${selectedVariant.price}</span>
            <span className='text-red-500'> ${discountedPrice.toFixed(2)}</span>
          </div>
        )
      }

      return (
        <div className='mt-2'>
          <span className='text-gray-900'>${selectedVariant.price}</span>
        </div>
      )
    }

    return (
      <div className='mt-4 space-y-2'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-gray-700'>{perfume.name}</h3>
          {!isOutOfStock && <p className='text-md font-semibold text-gray-700'>{selectedVariant.volume}ml</p>}
        </div>
        {renderRating()}
        {renderPrice()}
      </div>
    )
  }

  const renderAddToBasketButton = () => {
    return (
      <div className='mt-4'>
        <Button
          className={`w-full py-2 px-4 rounded-md transition-colors duration-200 `}
          onClick={e => {
            e.stopPropagation()
            setIsVariantSelectionDialogOpen(true)
          }}
          disabled={isOutOfStock}
        >
          {'Add to Cart'}
        </Button>
      </div>
    )
  }

  const renderAdjustBasketButtons = () => {
    return (
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <Button
            className='px-3 py-2 rounded-l-md border-r'
            onClick={e => {
              e.stopPropagation()
              removeFromBasket(perfume.id, selectedVariant.volume, 1)
            }}
          >
            -
          </Button>
          <div className='px-4 py-2 border-r flex items-center'>
            {getBasketProduct(perfume.id, selectedVariant.volume)?.quantity || 0}
          </div>
          <Button
            className='px-3 py-2 rounded-r-md'
            onClick={e => {
              e.stopPropagation()
              const basketItem = getBasketProduct(perfume.id, selectedVariant.volume)
              if (basketItem && basketItem.quantity < selectedVariant.stock) {
                const item = {
                  perfumeId: perfume.id,
                  perfumeName: perfume.name,
                  brand: perfume.brand,
                  volume: selectedVariant.volume,
                  quantity: +1,
                  price: selectedVariant.price,
                  discountedPrice: perfume.activeDiscount
                    ? selectedVariant.price - selectedVariant.price * (perfume.activeDiscount.rate / 100)
                    : selectedVariant.price
                }
                addToBasket(item)
              }
            }}
            // @ts-ignore
            disabled={getBasketProduct(perfume.id, selectedVariant.volume)?.quantity >= selectedVariant.stock}
          >
            +
          </Button>
        </div>
        <Button
          className='ml-2 px-3 py-2'
          onClick={e => {
            e.stopPropagation()
            setIsVariantSelectionDialogOpen(true)
          }}
        >
          Change
        </Button>
      </div>
    )
  }

  const renderBasket = () => {
    const basketItem = getBasketProduct(perfume.id, selectedVariant.volume)
    const renderBasketButton = () => {
      if (basketItem) {
        return renderAdjustBasketButtons()
      } else {
        return renderAddToBasketButton()
      }
    }

    return renderBasketButton()
  }

  const renderVariantSelectionDialog = () => {
    const hasDiscount = perfume.activeDiscount
    return (
      <Dialog open={isVariantSelectionDialogOpen} onOpenChange={e => setIsVariantSelectionDialogOpen(e)}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Select Variant</DialogTitle>
            <DialogDescription>Choose your preferred volume size for {perfume.name}</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {perfume.variants.map(variant => {
              let usedStock = 0
              const basketProduct = getBasketProduct(perfume.id, variant.volume)
              if (basketProduct) {
                usedStock = basketProduct.quantity
              }
              let isAvailable = variant.stock - usedStock !== 0
              return (
                <button
                  onClick={e => {
                    e.stopPropagation()

                    if (isAvailable) {
                      const item = {
                        perfumeId: perfume.id,
                        perfumeName: perfume.name,
                        brand: perfume.brand,
                        volume: variant.volume,
                        quantity: 1,
                        price: variant.price,
                        discountedPrice: hasDiscount
                          ? variant.price - variant.price * (perfume.activeDiscount.rate / 100)
                          : variant.price
                      }
                      addToBasket(item)
                    }
                    setIsVariantSelectionDialogOpen(false)
                    setSelectedVariant(variant)
                  }}
                  className={`flex justify-between items-center w-full p-4 border rounded-lg hover:bg-gray-50 ${
                    isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'
                  }`}
                  disabled={!isAvailable}
                >
                  <span>{variant.volume}ml</span>
                  <span>
                    {hasDiscount
                      ? `$${(variant.price - variant.price * (perfume.activeDiscount.rate / 100)).toFixed(2)}`
                      : `$${variant.price}`}
                  </span>
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // #endregion

  return (
    <div className='relative border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white flex flex-col'>
      {renderOutOfStockBanner()}
      {renderLastOneItemBanner()}
      {renderActiveDiscountBanner()}
      {renderPerfumeImage()}
      {renderPerfumeInformation()}
      <div className='flex-1' />
      {renderBasket()}
      {renderVariantSelectionDialog()}
    </div>
  )
}

export default ProductCard
