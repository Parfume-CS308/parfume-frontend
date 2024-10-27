import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { setDefaultAxios } from './lib/helpers/axiosHelper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Authorize = lazy(() => import('./pages/Authorize.tsx'))
const AppInner = lazy(() => import('./AppInner'))

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    setDefaultAxios()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<AppInner />} />
            <Route path='/auth' element={<Authorize />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
