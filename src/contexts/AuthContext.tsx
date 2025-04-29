'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import publicApi from '@/src/services/publicApi' // onde você configurou o axios

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    console.log('Token tentando!');

    if (savedToken) {
      validateToken(savedToken)
      setLoading(false);
      console.log('Token encontrado!');
      

    }else {
      setLoading(false);
      logout()
    }
  }, [])

  const validateToken = async (token: string) => {
    try {
      const res = await publicApi.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log(res);

      if (res.status === 200) {
        setToken(token)
      } else {
        logout()
      }
    } catch (error) {
      logout()
    }
  }

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    router.push('/entry')
    console.log('Acesso negado! logout...');

  }

  const value = {
    token,
    setToken,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
