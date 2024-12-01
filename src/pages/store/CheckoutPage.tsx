import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCart from '@/hooks/contexts/useCart'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/contexts/useAuth'
import useToast from '@/hooks/contexts/useToast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const checkoutSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  cardNumber: z.string().min(16, 'Card number is required').max(16, 'Card number is invalid'),
  cardHolder: z.string().min(1, 'Card holder is required'),
  expiryDateMM: z
    .string()
    .min(1, 'Expiry date month is required')
    .max(2, 'Expiry date month is invalid')
    .refine(
      data => {
        const month = parseInt(data)
        return month >= 1 && month <= 12
      },
      { message: 'Expiry date month is invalid' }
    ),
  expiryDateYY: z
    .string()
    .min(2, 'Expiry date year is required')
    .max(2, 'Expiry date year is invalid')
    .refine(
      data => {
        const year = parseInt(data)
        return year >= 21 && year <= 99
      },
      { message: 'Expiry date year is invalid' }
    ),
  cvv: z.string().min(3, 'CVV is required').max(3, 'CVV is invalid')
})

const CheckoutPage: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { basket } = useCart()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const checkoutForm = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address: '',
      cardNumber: '',
      cardHolder: '',
      expiryDateMM: '',
      expiryDateYY: '',
      cvv: ''
    }
  })

  // #region Mounting Functions ===========================================================
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/cart' } })
      addToast('destructive', 'Please login to proceed')
    }
  }, [])
  // #endregion

  // #region Handler Functions =============================================================
  const handleCheckoutFormSubmit: SubmitHandler<z.infer<typeof checkoutSchema>> = async data => {
    navigate('/thank-you')
  }
  // #endregion

  // #region Render Functions =============================================================
  const renderEmptyCart = () => {
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Perfumes that you are buying:</h1>
        <div className='text-center py-8'>
          <p className='text-gray-500'>Your cart is empty</p>
          <Button onClick={() => navigate('/')} className='mt-4 bg-[#956F5A] hover:bg-[#7d5d4a]'>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  // #endregion

  // #region Helper Functions =============================================================
  const calculateTotal = () => {
    return basket.reduce((total, item) => total + item.basePrice * item.quantity, 0)
  }

  // #endregion

  if (basket.length === 0) {
    return renderEmptyCart()
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Perfumes that you are buying: </h1>
      <div className='grid md:grid-cols-3 gap-8'>
        {/* Cart Items List */}
        <div className='md:col-span-2'>
          {basket.map(item => (
            <div
              key={`${item.perfumeId}-${item.volume}`}
              className='bg-white rounded-lg p-4 shadow-sm flex items-center gap-4 mb-4'
            >
              <div className='flex-1'>
                <h3 className='font-semibold'>{item.perfumeName}</h3>
                <p className='text-sm text-gray-500'>{item.brand}</p>
                <p className='text-sm text-gray-500'>{item.volume}ml</p>
                <div className='flex items-center gap-4 mt-2'>
                  <p className='font-bold'>${item.basePrice}</p>
                  <div className='text-sm text-gray-600'>Quantity: {item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='bg-white rounded-lg p-6 shadow-sm h-fit'>
          <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
          <div className='space-y-2 mb-4'>
            <div className='flex justify-between font-bold'>
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <Form {...checkoutForm} key={'checkoutForm'}>
            <form onSubmit={checkoutForm.handleSubmit(handleCheckoutFormSubmit)} className='space-y-4 w-full'>
              <FormField
                control={checkoutForm.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={checkoutForm.control}
                name='cardNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Card number' {...field} type='number' min={1} max={9999999999999999} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={checkoutForm.control}
                name='cardHolder'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Card holder' {...field} type='text' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-nowrap gap-4 flex-1'>
                <FormField
                  control={checkoutForm.control}
                  name='expiryDateMM'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input placeholder='Expiration month' {...field} type='number' min={1} max={12} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={checkoutForm.control}
                  name='expiryDateYY'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input placeholder='Expiration year' {...field} type='number' min={1} max={99} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={checkoutForm.control}
                name='cvv'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='CVV' {...field} type='number' min={0} max={999} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='w-full bg-[#956F5A] hover:bg-[#7d5d4a]' type='submit'>
                Complete checkout
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
