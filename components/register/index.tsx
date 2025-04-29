'use client'

import { useState } from 'react'
import publicApi from '@/src/services/publicApi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AlertComponent from '@/components/alert'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import DialogType from '@/@types/dialogs'

const formSchema = z.object({
    name: z.string().min(6, {
        message: "Nome deve ter pelo menos 2 caracteres",
    }).max(20, {
        message: "Nome deve ter no máximo 20 caracteres",
    }),

    login: z.string().min(6, {
        message: "Login deve ter pelo menos 2 caracteres",
    }).max(20, {
        message: "Login deve ter no máximo 20 caracteres",
    }),

    password: z.string().min(6, {
        message: "Senha deve ter pelo menos 6 caracteres",
    }).max(20, {
        message: "Senha deve ter no máximo 20 caracteres",
    }),
})

export default function RegisterComponent() {
    const [loading, setLoading] = useState<boolean>(false)
    const [propsRegister, setPropsRegister] = useState<DialogType>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "", login: "", password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, login, password } = values;

        setLoading(true)
        setPropsRegister({ ...propsRegister, open: false })

        publicApi.post("/auth/register", { name, login, password, })
            .then((res) => {
                const { token } = res.data

                console.log(token);

                setPropsRegister({
                    title: 'Cadastro realizado com sucesso!',
                    description: 'Faça login agora!',
                    confirm: () => setPropsRegister({ ...propsRegister, open: false }),
                    confirmText: 'OK',
                    confirmButton: true,
                    open: true,
                })
            }).catch(() => {
                setPropsRegister({
                    title: 'Cadastro sem sucesso!',
                    description: 'Tente Novamente...',
                    cancel: () => setPropsRegister({ ...propsRegister, open: false }),
                    cancelText: 'OK',
                    cancelButton: true,
                    open: true
                })
            }).finally(() => {
                setLoading(false)
            })
    }

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 h-screen max-w-md mx-auto ">
            <h1 className="text-2xl font-bold text-center">Cadastro</h1>
            <AlertComponent {...propsRegister} />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
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
            <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Login</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Nome de usuário"
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
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
        </form>
    </Form>

}
