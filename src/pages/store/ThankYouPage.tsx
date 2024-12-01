import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

type Props = {}
const ThankYouPage = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Thank you for your purchase</h1>
      <div className='text-center py-8'>
        <p className='text-gray-500'>Your order has been successfully placed.</p>
      </div>
      <div className='text-center'>
        <Button onClick={() => navigate('/')} className='mt-4 bg-[#956F5A] hover:bg-[#7d5d4a] mx-auto'>
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}

export default ThankYouPage
