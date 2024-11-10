import { AuthContext } from '@/data/contexts/AuthContext'
import { useContext } from 'react'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
