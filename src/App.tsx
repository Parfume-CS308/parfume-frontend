import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { setAuthorizeInterceptor, setDefaultAxios } from './lib/helpers/axiosHelper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthContextProvider from './data/contexts/AuthContext.tsx'
import useAuth from './hooks/contexts/useAuth.tsx'

const Authorize = lazy(() => import('./pages/Authorize.tsx'))
const AppStore = lazy(() => import('./AppStore.tsx'))
const AboutPage = lazy(() => import('./pages/store/AboutPage.tsx'))

const queryClient = new QueryClient()

function App() {
  const { me } = useAuth()

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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<AppStore />}>
              <Route path='/about' element={<AboutPage />} />
            </Route>
            <Route path='/auth' element={<Authorize />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
