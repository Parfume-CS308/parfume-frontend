import { ToastContext } from '@/data/contexts/ToastContext'
import { useContext } from 'react'

const useToast = () => {
  const { addToast, removeToast } = useContext(ToastContext)

  return { addToast, removeToast }
}

export default useToast
