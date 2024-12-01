import { logoutRequest, meRequest } from '@/api'
import { User } from '@/types/entity/User'
import { createContext, useReducer } from 'react'

type stateType = {
  isAuthenticated: boolean
  user?: User
}

const initialState: stateType = {
  isAuthenticated: false,
  user: undefined
}

type AuthContextType = {
  isAuthenticated: boolean
  user?: User
  login: (user: User) => void
  logout: () => void
  me: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  login: () => {},
  logout: () => {},
  me: () => Promise.resolve(false)
})

const reducer = (state: stateType, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        ...state,
        user: undefined,
        isAuthenticated: false
      }
    default:
      return state
  }
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // #region Reducer ====================================================================
  const [state, dispatch] = useReducer(reducer, initialState)
  // #endregion

  // #region Setter Functions ===========================================================
  const login = (user: User) => {
    dispatch({ type: 'LOGIN', payload: user })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: null })
    logoutRequest()
  }

  // #endregion

  // #region Helper Functions =============================================================
  const me = async () => {
    try {
      const response = await meRequest()
      login(response.data.user)
      return true
    } catch (error) {
      console.log(error)
      logout()
      return false
    }
  }
  // #endregion

  return <AuthContext.Provider value={{ ...state, login, logout, me }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
