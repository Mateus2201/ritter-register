'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import publicApi from '@/lib/api' // onde você configurou o axios
import { useAuth } from '@/hooks/use-auth'

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

	const { Login } = useAuth()

	useEffect(() => {
		const savedToken = localStorage.getItem('token')
		if (savedToken) {
			validateToken(savedToken)
		} else {
			logout()
			setLoading(false);
		}
	}, [])

	const validateToken = async (token: string) => {
		try {
			const res = await publicApi.get('/auth/validate', {
				headers: { Authorization: `Bearer ${token}` },
			})

			if (res.status === 200) {
				setToken(token)
			} else {
				logout()
			}
		} catch (error) {
			logout()
		} finally {
			setLoading(false)
		}
	}

	const login = (newToken: string) => {
		localStorage.setItem('token', newToken)
		setToken(newToken)
	}

	const logout = () => {
		console.log('Executando logout...');

		localStorage.removeItem('token')
		setToken(null)

		router.push('/entry')
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

export const useAuthContext = () => useContext(AuthContext)
