import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './data/contexts/AuthContext.tsx'
import CartContextProvider from './data/contexts/CartContext.tsx'
import WishlistContextProvider from './data/contexts/WishlistContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <App />
        </WishlistContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
