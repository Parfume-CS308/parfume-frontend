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

export const AuthContext = createContext({
  ...initialState,
  login: (user: User) => {},
  logout: () => {},
  me: () => {}
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
      if (!state.isAuthenticated) return
      const response = await meRequest()
      login(response.data.user)
    } catch (error) {
      console.log(error)
      logout()
    }
  }
  // #endregion

  return <AuthContext.Provider value={{ ...state, login, logout, me }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
