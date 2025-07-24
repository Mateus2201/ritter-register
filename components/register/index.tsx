'use client'

import { useState } from 'react'
import publicApi from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AlertDialogComponent from '@/components/alert'

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import DialogType from '@/types/dialogs'
import { useAuth } from '@/hooks/use-auth'
import { FormDataRegister } from '@/schema-forms/form-register'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from "@/public/logo.png";

interface RegisterComponentProps {
    children: React.ReactNode
}

export default function RegisterComponent({ children }: RegisterComponentProps) {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [useErros, setErros] = useState<string>('')
    const [propsRegister, setPropsRegister] = useState<DialogType>()

    const { schemaRegister, useSetFormRegister } = FormDataRegister()
    const { Register } = useAuth()

    async function onSubmit(values: z.infer<typeof schemaRegister>) {
        setPropsRegister({ ...propsRegister, open: false })

        Register(values)
            .then((token) => {
                router.push('/home')
            })
            .catch((error) => {
                setLoading(false)
                setPropsRegister({
                    title: 'Registro sem sucesso!',
                    description: JSON.stringify(error, null, 2),
                    cancel: () => setPropsRegister({ ...propsRegister, open: false }),
                    cancelText: 'OK',
                    cancelButton: true,
                    open: true
                })
            })
    }

    return <Form {...useSetFormRegister} >
        <AlertDialogComponent {...propsRegister} />
        <form onSubmit={useSetFormRegister.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-3 h-full max-w-md mx-auto justify-between " >
            <Image src={logo} alt="w" className="w-full" />

            <div className='flex flex-col justify-center bg-white p-5 rounded-xl w-full gap-y-5 my-10'>

                <FormField
                    control={useSetFormRegister.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nome"
                                    required
                                    className="border p-2 rounded"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-md text-red-700' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={useSetFormRegister.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Login</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Login"
                                    required
                                    className="border border-accent outline-sky-50 p-2 rounded"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-red' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={useSetFormRegister.control}
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
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
            </div>
            {children}

        </form>
    </Form >

}
