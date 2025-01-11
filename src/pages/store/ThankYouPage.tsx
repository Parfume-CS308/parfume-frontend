import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/contexts/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../styles/invoice.css'
import { format } from 'date-fns'

interface propState {
  orderDetails: {
    invoiceNumber: string
    shippingAddress: string
    cardLastFourDigits: string
    taxId: string
    items: {
      perfumeName: string
      volume: number
      quantity: number
      price: number
      discountedPrice: number
    }[]
    totalAmount: number
    discountAmount: number
  }
}

type Props = {}
const ThankYouPage = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  // get the order id from history state
  const { orderDetails: order } = location.state as propState

  const renderInvoice = () => {
    if (!order) return null
    return (
      <body>
        <div className='invoice-box'>
          <div className='header'>
            <div className='logo'>Perfume Point</div>
            <div className='invoice-title'>INVOICE</div>
          </div>

          <div className='info-section'>
            <div>
              <strong>Invoice Number:</strong> {order.invoiceNumber}
            </div>
            <div>
              <strong>Date:</strong> {format(new Date(), 'dd/MM/yyyy')}
            </div>
          </div>

          <div className='info-section'>
            <div>
              <strong>Bill To:</strong>
            </div>
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <div>{order.shippingAddress}</div>
            <div>
              <strong>Used Card:</strong> **** **** **** {order.cardLastFourDigits}
            </div>
            <div>
              <strong>Tax ID:</strong> {order.taxId || 'N/A'}
            </div>
          </div>

          <table className='items-table'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Volume</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr>
                  <td>{item.perfumeName}</td>
                  <td>{item.volume}ml</td>
                  <td>{item.quantity}</td>
                  <td>${item.discountedPrice.toFixed(2)}</td>
                  <td>${(item.discountedPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='totals'>
            <div>
              <strong>Subtotal:</strong> ${(order.totalAmount + order.discountAmount).toFixed(2)}
            </div>

            {order.discountAmount > 0 ? (
              <div>
                <strong>Campaign Discount:</strong> -${order.discountAmount.toFixed(2)}
              </div>
            ) : (
              ''
            )}
            <div className='grand-total'>
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </div>
          </div>

          <div className='footer'>
            <p>Thank you for shopping with Perfume Point!</p>
            <p>For any questions, please contact support@perfumepoint.com</p>
          </div>
        </div>
      </body>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Thank you for your purchase</h1>
      <div className='text-center py-8'>
        <p className='text-gray-500 mb-8'>Your order has been successfully placed.</p>
        {renderInvoice()}
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
