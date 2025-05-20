'use client'

import Color from "@/types/Color";
import UploadImages from "../images-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useColors } from "@/hooks/use-colors";
import Manufacturer from "@/types/Manufacturer";
import { Button } from "@/components/ui/button";
import SelectComponent from "../select-component";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormDataCar } from "@/schema-forms/form-car";
import { useManufacturer } from "@/hooks/use-manufacturer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export default function FormRegister() {
    const { getAllColors } = useColors();
    const { getAllManufacturer } = useManufacturer();
    const [useColor, setUseColor] = useState<Color[]>([]);
    const [useManufacturers, setManufacturer] = useState<Manufacturer[]>([]);

    const { useSetForm, schemaCar } = FormDataCar()

    function onSubmit(data: any) {
        // Replace 'any' with the actual type, e.g. FormDataCarType
        console.log("Dados:", data);
    }

    useEffect(() => {
        getAllColors({})
            .then(setUseColor)
            .catch(console.error);
        getAllManufacturer({})
            .then(setManufacturer)
            .catch(console.error);
    }, []);

    return <div className="min-h-screen w-screen bg-gradient-to-br flex items-center justify-center from-[#464646] via-[#626464] to-[#6f6f6f] py-16">
        <div className="max-w-7xl mx-auto px-6 w-3/4">
            <Form {...useSetForm}>
                <form onSubmit={useSetForm.handleSubmit(onSubmit)} className="grid gap-12">
                    <Card className="shadow-lg border border-blue-200 bg-[#f8f8f8]">
                        <CardHeader className="bg-indigo-50">
                            <CardTitle className="text-3xl text-center text-[#626464]">CADASTRO DE VEICULO</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-10 md:grid-cols-2 p-8">
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-[#626464]">INFORMAÇÕES BÁSICAS</h2>
                                <FormField control={useSetForm.control} name="licensePlate" render={({ field }) => (
                                    <FormItem>
                                        <Label>Placa</Label>
                                        <FormControl><Input placeholder="Placa" {...field} /></FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                                <FormField control={useSetForm.control} name="model" render={({ field }) => (
                                    <FormItem>
                                        <Label>Modelo</Label>
                                        <FormControl><Input placeholder="Modelo" {...field} /></FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                                <FormField control={useSetForm.control} name="manufacturer" render={({ field }) => (
                                    <FormItem>
                                        <Label>Fabricante</Label>
                                        <FormControl>
                                            <SelectComponent
                                                label="Fabricante"
                                                id="fabricante"
                                                onChange={field.onChange}
                                                value={field.value}
                                                dataValue={useManufacturers.map((m) => ({ value: m.idManufacturer, description: m.name }))}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                                <FormField control={useSetForm.control} name="color" render={({ field }) => (
                                    <FormItem>
                                        <Label>Cor</Label>
                                        <FormControl>
                                            <SelectComponent
                                                label="Cor"
                                                id="cor"
                                                onChange={field.onChange}
                                                value={field.value}
                                                dataValue={useColor.map((c) => ({ value: c.idColor, description: c.description }))}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-[#626464]">CARACTERÍSTICA</h2>
                                <FormField control={useSetForm.control} name="fuel" render={({ field }) => (
                                    <FormItem>
                                        <Label>Combustível</Label>
                                        <FormControl>
                                            <SelectComponent
                                                label="Combustível"
                                                id="combustivel"
                                                onChange={field.onChange}
                                                value={field.value}
                                                dataValue={[
                                                    { value: 1, description: "Gasolina" },
                                                    { value: 2, description: "Álcool" },
                                                    { value: 3, description: "Flex" },
                                                    { value: 4, description: "Diesel" },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                                <FormField control={useSetForm.control} name="vehicleType" render={({ field }) => (
                                    <FormItem>
                                        <Label>Tipo de Veículo</Label>
                                        <FormControl>
                                            <SelectComponent
                                                label="Tipo de Veículo"
                                                id="tipoVeiculo"
                                                onChange={field.onChange}
                                                value={field.value}
                                                dataValue={[
                                                    { value: 1, description: "Carro" },
                                                    { value: 2, description: "Moto" },
                                                    { value: 3, description: "Caminhão" },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                                <FormField control={useSetForm.control} name="engine" render={({ field }) => (
                                    <FormItem>
                                        <Label>Motor</Label>
                                        <FormControl><Input placeholder="Motor" {...field} /></FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
                        <CardHeader className="bg-indigo-50">
                            <CardTitle className="text-xl text-[#626464]">ESPECIFICAÇÕES TÉCNICAS</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 p-8">
                            <FormField key={'manufacturingYear'} control={useSetForm.control} name={'manufacturingYear'} render={({ field }) => (
                                <FormItem>
                                    <Label>Ano de Fabricação</Label>
                                    <FormControl><Input type="number" placeholder={'manufacturingYear'} {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField key={'modelYear'} control={useSetForm.control} name={'modelYear'} render={({ field }) => (
                                <FormItem>
                                    <Label>Ano do Modelo</Label>
                                    <FormControl><Input type="number" placeholder={'modelYear'} {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField key={'doorCount'} control={useSetForm.control} name={'doorCount'} render={({ field }) => (
                                <FormItem>
                                    <Label>Portas</Label>
                                    <FormControl><Input type="number" placeholder={'Portas'} {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField key={'seatCount'} control={useSetForm.control} name={'seatCount'} render={({ field }) => (
                                <FormItem>
                                    <Label>Assentos</Label>
                                    <FormControl><Input type="number" placeholder={'Assentos'} {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField control={useSetForm.control} name="mileage" render={({ field }) => (
                                <FormItem>
                                    <Label>Quilometragem</Label>
                                    <FormControl><Input type="number" placeholder="Quilometragem" {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField control={useSetForm.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <Label>Preço</Label>
                                    <FormControl><Input type="number" placeholder="Preço" {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField control={useSetForm.control} name="prestacoes" render={({ field }) => (
                                <FormItem>
                                    <Label>Parcelas</Label>
                                    <FormControl><Input type="number" placeholder="Parcelas" {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <FormField control={useSetForm.control} name="installmentValue" render={({ field }) => (
                                <FormItem>
                                    <Label>Valor da Parcela</Label>
                                    <FormControl><Input type="number" placeholder="Valor da Parcela" {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                        </CardContent>
                    </Card>
                    <Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
                        <CardHeader className="bg-indigo-50">
                            <CardTitle className="text-xl text-[#626464]">OBSERVAÇÕES</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <FormField control={useSetForm.control} name="notes" render={({ field }) => (
                                <FormItem>
                                    <FormControl><Textarea rows={5} placeholder="Observações do vendedor" {...field} /></FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button type="submit" className="px-10 py-4 text-lg bg-[#626464] hover:bg-[#626464] text-white">Salvar Veículo</Button>
                    </div>
                    <Card className="shadow-md border mt-5 border-blue-200 bg-[#f8f8f8]">
                        <UploadImages />
                    </Card>
                </form>
            </Form>

        </div>
    </div>
}
