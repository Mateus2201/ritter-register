"use client"

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Optionals from "../optionals";
import UploadImages from "../images-upload";
import { Label } from "../ui/label";

import CheckboxComponent from "../checkbox-component";
import SelectComponent from "../select-component";

import Color from "@/types/Color";
import Manufacturer from "@/types/Manufacturer";

import { useManufacturer } from "@/hooks/use-manufacturer";
import { useColors } from "@/hooks/use-colors";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const schema = z.object({
    licensePlate: z.string().min(7, "Placa inválida"),
    licensePlateDisplay: z.boolean().optional(),
    featured: z.boolean().optional(),
    sold: z.boolean().optional(),

    model: z.string().min(2, "Informe o modelo"),
    manufacturingYear: z.number().min(1900, "Ano inválido"),
    modelYear: z.number().min(1900, "Ano inválido"),
    fuel: z.string().nonempty("Informe o combustível"),

    engine: z.string().optional(),
    doorCount: z.number().min(1, "Mínimo 1 porta"),
    seatCount: z.number().min(1, "Mínimo 1 lugar"),

    mileage: z.number().int().min(-1, "Valor inválido"),
    price: z.number().nonnegative("Valor inválido"),
    priceDisplay: z.boolean().optional(),
    prestacoes: z.number().optional(),
    installmentValue: z.number().optional(),

    allowsProposal: z.boolean().optional(),
    allowsTrade: z.boolean().optional(),

    notes: z.string().optional(),

    color: z.string().nonempty("Informe a cor"),
    manufacturer: z.string().nonempty("Selecione o fabricante"),
    vehicleType: z.string().nonempty("Informe o tipo"),


    // Extras podem ser adicionados depois: opcionais e imagens
})

type FormData = z.infer<typeof schema>

export default function FormRegister() {
    const { getAllColors } = useColors();
    const { getAllManufacturer } = useManufacturer();
    const [useColor, setUseColor] = useState<Color[]>([])
    const [selectedColor, setSelectedColor] = useState<Color | null>()

    const [useManufacturers, setManufacturer] = useState<Manufacturer[]>([])
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>()

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            licensePlate: "",
            model: "",
            manufacturer: "",
            manufacturingYear: new Date().getFullYear(),
            modelYear: new Date().getFullYear(),
            fuel: "",
            engine: "",
            color: "",
            vehicleType: "",
            doorCount: 4,
            seatCount: 5,
            mileage: 0,
            price: 0,
            prestacoes: 0,
            installmentValue: 0,
            notes: "",
        },
    })

    function onSubmit(data: FormData) {
        console.log("Dados:", data)
    }

    const fetchColors = async () => {
        try {
            const colors = await getAllColors({});
            setUseColor(colors)
        } catch (error) {
            console.error('Erro ao buscar cores:', error)
        }
    }

    const resetForm = () => {
        form.reset({
            licensePlate: "",
            model: "",
            manufacturer: "",
            manufacturingYear: new Date().getFullYear(),
            modelYear: new Date().getFullYear(),
            fuel: "",
            engine: "",
            color: "",
            vehicleType: "",
            doorCount: 4,
            seatCount: 5,
            mileage: 0,
            price: 0,
            prestacoes: 0,
            installmentValue: 0,
            notes: "",
        })
    }

    const fetchManufacturer = async () => {
        try {
            const manufacturer = await getAllManufacturer({});
            setManufacturer(manufacturer)
        } catch (error) {
            console.error('Erro ao buscar cores:', error)
        }
    }

    useEffect(() => {
        fetchColors();
        fetchManufacturer();
    }, [])

    const handleColorChange = (value: string) => {
        const selected = useColor.find(color => color.description === value);
        setSelectedColor(selected || null);
    }

    const handleManufacturerChange = (value: string) => {
        const selected = useManufacturers.find(manufacturer => manufacturer.name === value);
        setSelectedManufacturer(selected || null);
    }

    const handleCheckboxChange = (checked: boolean) => {
        console.log(checked)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
            <div className="container max-w-4xl mx-auto p-6 space-y-6 h-min-screen">
                <h1 className="text-2xl font-semibold">Novo Veículo</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="licensePlate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Placa</FormLabel>
                                <FormControl>
                                    <Input placeholder="ABC1D23" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <CheckboxComponent label="Exibe placa" id="exibePlaca" isChecked />
                    <CheckboxComponent label="Vendido" id="Vendido" isChecked />


                    <Input placeholder="Placa" />

                    <div className="grid grid-cols-2 gap-2">
                        <Input type="number" placeholder="Ano Fab." />
                        <Input placeholder="Modelo" />
                    </div>

                    <SelectComponent
                        label="Cor"
                        id="cor"
                        onChange={handleColorChange}
                        value={selectedColor?.description || ""}
                        dataValue={useColor.map(color => ({
                            value: color.idColor,
                            description: color.description
                        }))}
                    />

                    <SelectComponent
                        label="Fabricante"
                        id="fabricante"
                        onChange={handleManufacturerChange}
                        value={selectedManufacturer?.name || ""}
                        dataValue={useManufacturers.map(manufacturer => ({
                            value: manufacturer.idManufacturer,
                            description: manufacturer.name
                        }))}
                    /> */}



                    {/* 

            {/*

            <Select>
                <SelectTrigger className="w-full"><SelectValue placeholder="Combustível" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="gasolina">Gasolina</SelectItem>
                    <SelectItem value="alcool">Álcool</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                </SelectContent>
            </Select>

            <Input placeholder="Motor" />

            <Select>
                <SelectTrigger className="w-full"><SelectValue placeholder="Cor" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="preto">Preto</SelectItem>
                    <SelectItem value="branco">Branco</SelectItem>
                    <SelectItem value="vermelho">Vermelho</SelectItem>
                    <SelectItem value="azul">Azul</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger><SelectValue placeholder="Tipo do Veículo" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="caminhao">Caminhão</SelectItem>
                </SelectContent>
            </Select>

            <Input placeholder="Portas" type="number" />
            <Input placeholder="Lugares" type="number" />
            <Input placeholder="Quilometragem" type="number" />

            <div className="col-span-2 flex flex-col md:flex-row gap-2 items-center">
                <Input placeholder="Valor" className="w-full md:w-auto" />
                <span>+</span>
                <Input placeholder="Prestações" className="w-full md:w-auto" />
                <span>de R$</span>
                <Input placeholder="Valor prestação" className="w-full md:w-auto" />
                <Checkbox id="exibeValor" defaultChecked className="ml-2" /> <label htmlFor="exibeValor">Exibe valor</label>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="aceitaPropostas" defaultChecked />
                    <Label htmlFor="aceitaPropostas">Aceita propostas</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="aceitaTroca" defaultChecked />
                    <Label htmlFor="aceitaTroca">Aceita troca</Label>
                </div>
            </div>

            <div className="col-span-2">
                <Textarea placeholder="Observações do Vendedor" />
            </div>
        <Optionals />
        <UploadImages />
        <Button className="mt-6">Salvar Veículo</Button> */}
                </div>

            </div>

        </form>
    </Form >
}
