import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { setAuthorizeInterceptor, setDefaultAxios } from './lib/helpers/axiosHelper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useAuth from './hooks/contexts/useAuth.tsx'
import { USER_ROLE } from './types/entity/User.ts'
import ErrorPage from './pages/ErrorPage.tsx'

const Authorize = lazy(() => import('./pages/Authorize.tsx'))
const AppStore = lazy(() => import('./AppStore.tsx'))
const AboutPage = lazy(() => import('./pages/store/AboutPage.tsx'))
const ListPage = lazy(() => import('./pages/store/ListPage.tsx'))
const ProfilePage = lazy(() => import('./pages/store/ProfilePage.tsx'))

const queryClient = new QueryClient()

function App() {
  const { me, user } = useAuth()

  useEffect(() => {
    setDefaultAxios()
    setAuthorizeInterceptor()
    checkMe()
  }, [])

  const checkMe = async () => {
    try {
      await me()
    } catch (error) {
      console.error('Error checking me', error)
    }
  }

  const getRoutes = () => {
    const customerRoutes = (
      <>
        <Route path='/' element={<AppStore />} errorElement={<ErrorPage />}>
          <Route path='/' element={<ListPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/*' element={<ErrorPage />} />
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
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{getRoutes()}</Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
