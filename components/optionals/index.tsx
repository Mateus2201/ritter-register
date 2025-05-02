import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useVehicle } from '@/hooks/use-vehicle'

const vehicleSchema = z.object({
    placa: z.string().min(1, 'Placa obrigatória'),
    modelo: z.string().min(1, 'Modelo obrigatório'),
    fabricante: z.string(),
    anoFabricacao: z.string().min(4),
    anoModelo: z.string().min(4),
    combustivel: z.string(),
    motor: z.string(),
    cor: z.string(),
    tipo: z.string(),
    portas: z.coerce.number(),
    lugares: z.coerce.number(),
    quilometragem: z.coerce.number(),
    valor: z.coerce.number(),
    prestacoes: z.coerce.number().optional(),
    valorPrestacao: z.coerce.number().optional(),
    exibeValor: z.boolean(),
    exibePlaca: z.boolean(),
    vendido: z.boolean(),
    aceitaPropostas: z.boolean(),
    aceitaTroca: z.boolean(),
    observacoes: z.string().optional(),
})

type VehicleFormData = z.infer<typeof vehicleSchema>

export default function VehicleForm() {
    const { createVehicle } = useVehicle()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            exibeValor: true,
            exibePlaca: false,
            vendido: false,
            aceitaPropostas: true,
            aceitaTroca: true,
        },
    })

    const onSubmit = async (data: VehicleFormData) => {
        try {
            await createVehicle(data)
            alert('Veículo cadastrado com sucesso!')
        } catch (err) {
            console.error(err)
            alert('Erro ao salvar veículo.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Input placeholder="Placa" {...register('placa')} />
                <div className="flex items-center space-x-2 mt-2">
                    <Checkbox {...register('exibePlaca')} />
                    <Label className="text-sm">Exibe placa</Label>
                </div>
            </div>

            <div>
                <Input placeholder="Modelo" {...register('modelo')} />
                <div className="flex items-center space-x-2 mt-2">
                    <Checkbox {...register('vendido')} />
                    <Label className="text-sm">Vendido</Label>
                </div>
            </div>

            <Select onValueChange={(val) => setValue('fabricante', val)}>
                <SelectTrigger><SelectValue placeholder="Fabricante" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="fabricante-a">Fabricante A</SelectItem>
                    <SelectItem value="fabricante-b">Fabricante B</SelectItem>
                </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Ano Fab." {...register('anoFabricacao')} />
                <Input placeholder="Ano Modelo" {...register('anoModelo')} />
            </div>

            <Select onValueChange={(val) => setValue('combustivel', val)}>
                <SelectTrigger><SelectValue placeholder="Combustível" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="gasolina">Gasolina</SelectItem>
                    <SelectItem value="alcool">Álcool</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                </SelectContent>
            </Select>

            <Input placeholder="Motor" {...register('motor')} />

            <Select onValueChange={(val) => setValue('cor', val)}>
                <SelectTrigger><SelectValue placeholder="Cor" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="preto">Preto</SelectItem>
                    <SelectItem value="branco">Branco</SelectItem>
                    <SelectItem value="vermelho">Vermelho</SelectItem>
                    <SelectItem value="azul">Azul</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(val) => setValue('tipo', val)}>
                <SelectTrigger><SelectValue placeholder="Tipo do Veículo" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="caminhao">Caminhão</SelectItem>
                </SelectContent>
            </Select>

            <Input type="number" placeholder="Portas" {...register('portas', { valueAsNumber: true })} />
            <Input type="number" placeholder="Lugares" {...register('lugares', { valueAsNumber: true })} />
            <Input type="number" placeholder="Quilometragem" {...register('quilometragem', { valueAsNumber: true })} />

            <div className="col-span-2 flex flex-col md:flex-row gap-2 items-center">
                <Input placeholder="Valor" {...register('valor', { valueAsNumber: true })} />
                <span>+</span>
                <Input placeholder="Prestações" {...register('prestacoes', { valueAsNumber: true })} />
                <span>de R$</span>
                <Input placeholder="Valor prestação" {...register('valorPrestacao', { valueAsNumber: true })} />
                <Checkbox {...register('exibeValor')} /> <label>Exibe valor</label>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Checkbox {...register('aceitaPropostas')} />
                    <Label>Aceita propostas</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox {...register('aceitaTroca')} />
                    <Label>Aceita troca</Label>
                </div>
            </div>

            <div className="col-span-2">
                <Textarea placeholder="Observações do Vendedor" {...register('observacoes')} />
            </div>

            {/* Você pode incluir <Optionals /> e <UploadImages /> aqui, fora do hook */}

            <Button type="submit" className="mt-6">Salvar Veículo</Button>
        </form>
    )
}
