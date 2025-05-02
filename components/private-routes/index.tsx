'use client'

import { useAuth } from '@/src/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        console.log(isAuthenticated);
        
        if (!isAuthenticated && !loading) {
            logout()
            // Aqui você pode adicionar um redirecionamento para a página de login ou qualquer outra página
            router.push('/entry')

            console.log('User not authenticated, redirecting to /entry');
            
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return null // ou um Loading Spinner
    }

    return <>{children}</>
}
