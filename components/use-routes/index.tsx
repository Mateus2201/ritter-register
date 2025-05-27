'use client'

import { useAuth } from '@/src/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated && !loading) {

            logout()
            router.push('/entry')
            console.log('User not authenticated, redirecting to /entry');

        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
