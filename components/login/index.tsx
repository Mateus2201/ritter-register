'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import publicApi from '@/lib/public-api'
import { useAuth } from '@/src/contexts/auth-context'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import DialogType from '@/types/dialogs'
import AlertComponent from '../alert'

const formSchema = z.object({
    username: z.string().min(6, {
        message: "Nome deve ter pelo menos 2 caracteres",
    }).max(20, {
        message: "Nome deve ter no máximo 20 caracteres",
    }),
    password: z.string().min(4, {
        message: "Senha deve ter pelo menos 6 caracteres",
    }).max(20, {
        message: "Senha deve ter no máximo 20 caracteres",
    }),
})

export default function LoginComponent() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { setToken } = useAuth()
    const [propsRegister, setPropsRegister] = useState<DialogType>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "", password: "",
        },
    })

    const resetForm = () => {
        form.reset({
            username: "",
            password: "",
        })
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { username, password } = values;

        setLoading(true)
        setPropsRegister({ ...propsRegister, open: false })

        publicApi
            .post("/auth/login", { username, password })
            .then((res) => {
                const { token } = res.data

                localStorage.setItem('token', token)
                setToken(token)

                router.push('/home')
            })
            .catch(() => {
                setPropsRegister({
                    title: 'Login sem sucesso!',
                    description: 'Senha ou login inválido. Tente novamente!',
                    cancel: () => setPropsRegister({ ...propsRegister, open: false }),
                    cancelText: 'OK',
                    cancelButton: true,
                    open: true
                })
            })
            .finally(() => {
                setLoading(false)
                resetForm()
            })
    }

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex  flex-col gap-4 p-4 h-screen max-w-md mx-auto ">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <AlertComponent {...propsRegister} />
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Login</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Nome de usuário"
                                required
                                className=""
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='text-red' />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Nome de usuário"
                                required
                                className="border p-2 rounded"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='text-red' />
                    </FormItem>
                )}
            />
            <Button
                type="submit"
                disabled={loading}
                className="bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Acessando...' : 'Acessar'}
            </Button>
        </form>
    </Form>
}
