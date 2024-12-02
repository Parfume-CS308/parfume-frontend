import { lazy, Suspense, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { setAuthorizeInterceptor, setDefaultAxios } from './lib/helpers/axiosHelper'
import AuthContextProvider from './data/contexts/AuthContext'
import useAuth from './hooks/contexts/useAuth'
import { USER_ROLE } from './types/entity/User'
import CartContextProvider from './data/contexts/CartContext'
import ToastContextProvider from './data/contexts/ToastContext'
import useCart from './hooks/contexts/useCart'

const MainPage = lazy(() => import('./pages/MainPage'))
const Authorize = lazy(() => import('./pages/Authorize'))
const AppStore = lazy(() => import('./AppStore'))
const AboutPage = lazy(() => import('./pages/store/AboutPage'))
const PerfumeDetailPage = lazy(() => import('./pages/PerfumeDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const CheckoutPage = lazy(() => import('./pages/store/CheckoutPage'))
const ThankYouPage = lazy(() => import('./pages/store/ThankYouPage'))

const queryClient = new QueryClient()

function App() {
  const { me, user } = useAuth()
  const { syncCart } = useCart()

  useEffect(() => {
    setDefaultAxios()
    setAuthorizeInterceptor()
    checkMe()
  }, [])

  const checkMe = async () => {
    try {
      const isLoggedIn = await me()
      if (isLoggedIn) await syncCart()
    } catch (error) {
      console.error('Error checking me', error)
    }
  }

  const getRoutes = () => {
    const customerRoutes = (
      <>
        <Route path='/' element={<AppStore />}>
          <Route index element={<MainPage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='perfume/:id' element={<PerfumeDetailPage />} />
          <Route path='account' element={<AccountPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='thank-you' element={<ThankYouPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
        <Route path='/auth' element={<Authorize />} />
      </>
    )

    const productManagerRoutes = <></>
    const salesManagerRoutes = <></>

    switch (user?.role) {
      case USER_ROLE.CUSTOMER:
        return customerRoutes
      case USER_ROLE.PRODUCT_MANAGER:
        return productManagerRoutes
      case USER_ROLE.SALES_MANAGER:
        return salesManagerRoutes
      default:
        return customerRoutes
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>{getRoutes()}</Routes>
            </Suspense>
          </BrowserRouter>
        </CartContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  )
}

export default App
