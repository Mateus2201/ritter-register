'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import privateApi from '@/src/services/privateApi'
import publicApi from '@/src/services/publicApi'

export default function LoginComponent() {
    const [nome, setNome] = useState('mateusviana1')
    const [senha, setSenha] = useState('1234')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        publicApi
            .post("/auth/login", { identifier: nome, password: senha, })
            .then((res) => {
                const { token } = res.data

                console.log(token);

                localStorage.setItem('token', token)

                router.push('/home')
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 h-screen max-w-md mx-auto text-black">
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
    )
}
