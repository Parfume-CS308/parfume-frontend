import React, { createContext } from 'react'
import { Alert } from '@/components/ui/alert'
import { useState } from 'react'

// #region Types =============================================================
type ToastType = 'default' | 'destructive' | undefined

type Toast = {
  id: string
  type: ToastType
  message: string
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: string) => void
}

// #endregion

// #region Context =============================================================
export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {}
})

// #endregion

// #region Provider =============================================================
const ToastContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(7)
    setToasts([...toasts, { id, type, message }])

    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts(toasts.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className='fixed top-4 right-4 z-50 flex flex-col gap-4'>
        {toasts.map(toast => (
          <Alert key={toast.id} variant={toast.type}>
            {toast.message}
          </Alert>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// #endregion

export default ToastContextProvider
