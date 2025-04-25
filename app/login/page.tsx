'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import privateApi from '@/src/services/privateApi'
import publicApi from '@/src/services/publicApi'

export default function LoginPage() {
    const [nome, setNome] = useState('mateusviana')
    const [senha, setSenha] = useState('184184')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await publicApi.post('/auth/login', {
                identifier: nome,
                password: senha,
            })

            const { token } = res.data

            console.log(token);
            
            localStorage.setItem('token', token)
            // router.push('/dashboard')
        } catch (err: any) {
            alert(err?.response?.data?.message || 'Erro ao fazer login.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-400 p-8 rounded-xl shadow-xl w-full max-w-md space-y-5"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
        </div>
    )
}
