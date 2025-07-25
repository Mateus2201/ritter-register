'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import publicApi from '@/lib/api'
import { useAuthContext } from '@/src/contexts/auth-context'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import DialogType from '@/types/dialogs'
import AlertDialogComponent from '../alert'
import { FormDataLogin } from '@/schema-forms/form-login'
import { useAuth } from '@/hooks/use-auth'
import Image from 'next/image'
import logo from "@/public/logo.png";

interface LoginComponentProps {
    children: React.ReactNode
}


export default function LoginComponent({ children }: LoginComponentProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { setToken } = useAuthContext()
    const [propsRegister, setPropsRegister] = useState<DialogType>()

    const { schemaLogin, useSetFormLogin } = FormDataLogin()

    const { Login } = useAuth()

    async function onSubmit(values: z.infer<typeof schemaLogin>) {
        setLoading(true)
        setPropsRegister({ ...propsRegister, open: false })

        Login(values)
            .then((token) => {

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
            })
    }

    return <Form {...useSetFormLogin} >
        <AlertDialogComponent {...propsRegister} />
        <form onSubmit={useSetFormLogin.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-3 h-full max-w-md mx-auto justify-between ">
            <Image src={logo} alt="w" className='w-full' />

            <div className='flex flex-col justify-center bg-white p-5 rounded-xl w-full gap-y-5 my-10'>
                <FormField
                    control={useSetFormLogin.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Login</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Login"
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
                    control={useSetFormLogin.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Senha"
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
            </div>
            {children}
        </form>
    </Form>
}
