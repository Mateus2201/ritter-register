'use client'

import Color from "@/types/Color";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useColors } from "@/hooks/use-colors";
import Manufacturer from "@/types/Manufacturer";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/images-upload";
import { FormDataCar } from "@/schema-forms/form-car";
import { useManufacturer } from "@/hooks/use-manufacturer";
import SelectComponent from "@/components/select-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Optional from "@/types/Optional";
import { Separator } from "@/components/ui/separator";
import { useOptional } from "@/hooks/use-optional";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import OptionalCategory from "@/types/OptionalCategory";

export default function FormVehicle() {
    const { getAllColors } = useColors();
    const { getAllManufacturer } = useManufacturer();
    const { getAllOptional } = useOptional();
    const { getAllOptionalCategory } = useOptionalCategory();

    const [useColorData, setUseColorData] = useState<Color[]>([]);
    const [useManufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);
    const [useOptionalData, setOptionalData] = useState<Optional[]>([]);
    const [useOptionalCategoryData, setOptionalCategoryData] = useState<OptionalCategory[]>([]);

    const [selectedOptionals, setSelectedOptionals] = useState<number[]>([]);

    const [optionalCategories, setUseData] = useState<any[]>([
        {
            idOptionalCategory: 1,
            description: "Conforto",
            optionals: [
                { idOptional: 10, description: "Ar condicionado" },
                { idOptional: 11, description: "Banco de couro" }
            ]
        },
        {
            idOptionalCategory: 2,
            description: "Segurança",
            optionals: [
                { idOptional: 20, description: "Airbag" },
                { idOptional: 21, description: "ABS" }
            ]
        }
    ]);

    function handleSelectOptional(id: number, checked: boolean) {
        if (checked) {
            setSelectedOptionals(prev => [...prev, id]);
        } else {
            setSelectedOptionals(prev => prev.filter(optId => optId !== id));
        }
    }


    const { useSetForm, schemaCar } = FormDataCar()

    function onSubmit(data: any) {
        console.log("Dados:", data);
    }

    useEffect(() => {
        getAllColors({})
            .then(setUseColorData)
            .catch(console.error);
        getAllManufacturer({})
            .then(setManufacturerData)
            .catch(console.error);

        getAllOptional({})
            .then(setOptionalData)
            .catch(console.error);

        // getAllOptionalCategory({})
        //     .then((categories) => {
        //         setUseData(categories.map(category => ({
        //             idOptionalCategory: category.idOptionalCategory,
        //             description: category.description,
        //             optionals: useOptionalData.filter(opt => category.optionals.includes(opt.idOptional))
        //         })));
        //     })
        //     .catch(console.error);

}, []);

return <Form {...useSetForm}>
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
                                    dataValue={useManufacturerData
                                        .filter((m) => m.idManufacturer !== undefined)
                                        .map((m) => ({
                                            value: m.idManufacturer!,
                                            description: m.name
                                        }))}
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
                                    dataValue={useColorData
                                        .filter((m) => m.idColor !== undefined)
                                        .map((m) => ({
                                            value: m.idColor!,
                                            description: m.description,
                                        }))}
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

        <Card className="shadow-md border mt-5 border-blue-200 bg-[#f8f8f8] p-5">
            <Card className="w-full">
                {optionalCategories.map((category, index) => (
                    <CardContent key={category.idOptionalCategory}>
                        {index !== 0 && <Separator orientation="horizontal" className="bg-[#626464]" />}
                        {category.description && <h2 className="text-lg font-semibold text-[#626464] mt-5 mb-3">{category.description}</h2>}
                        {category.optionals.map((opt: Optional) =>
                            opt.idOptional !== undefined ? <>
                                <Label>{opt.description}</Label>
                                <Checkbox
                                    key={opt.idOptional}
                                    checked={selectedOptionals.includes(opt.idOptional)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => handleSelectOptional(opt.idOptional as number, checked === true)}
                                />

                            </> : null
                        )}
                    </CardContent>
                ))}
            </Card>
        </Card>

        <Card className="shadow-md border mt-5 border-blue-200 bg-[#f8f8f8]">
            <UploadImages />
        </Card>
    </form>
</Form>

}
