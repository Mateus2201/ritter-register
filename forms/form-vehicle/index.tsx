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
import { Switch } from "@radix-ui/react-switch";
import { useVehicleCategory } from "@/hooks/use-vehicle-category";
import VehicleCategory from "@/types/VehicleCategory";
import Vehicle from "@/types/Vehicle";
import { useVehicle } from "@/hooks/use-vehicle";
import { toast, Toaster } from "sonner";

interface VehicleProps {
    idVehicle?: string
}

export default function FormVehicle({ idVehicle }: VehicleProps) {
    const [useIdVehicle, setIdVehicle] = useState<string>(idVehicle ?? '')

    const { getAllColors } = useColors();
    const { getAllManufacturer } = useManufacturer();
    const { getAllOptional } = useOptional();
    const { getAllOptionalCategory } = useOptionalCategory();
    const { getAllVehicleCategory } = useVehicleCategory();
    const { getVehicleById, createVehicle } = useVehicle();

    const [useColorData, setUseColorData] = useState<Color[]>([]);
    const [useManufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);
    const [useOptionalData, setOptionalData] = useState<Optional[]>([]);
    const [useOptionalCategoryData, setOptionalCategoryData] = useState<OptionalCategory[]>([]);
    const [useVehicleCategoryData, setVehicleCategoryData] = useState<VehicleCategory[]>([]);

    const { useSetForm } = FormDataCar()

    function onSubmit(data: any) {
        const Vehicle: Vehicle = data;

        Vehicle.idVehicle = 0; // Defina o ID como 0 para criar um novo veículo

        createVehicle(Vehicle)
            .then((response: Vehicle) => {
                if (response) {
                    console.log(response);
                    
                    setIdVehicle(response.idVehicle.toString())

                    useSetForm.reset();

                    toast("Veículo incluído com sucesso!", {
                        description: new Date().toLocaleDateString("pt-BR"),
                        action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            })
            .catch((error) => {
                toast.error("Erro ao criar Veículo!", {
                    description: error,
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                    },
                });
            });
    }

    useEffect(() => {
        if (useIdVehicle) {
            console.log('id', useIdVehicle);
            
            getVehicleById({ id: useIdVehicle })
                .then((vehicle) => {

                    if (vehicle) {
                        console.log(vehicle);

                        useSetForm.reset(vehicle);
                    }
                })
                .catch(console.error);
        }
    }, [useIdVehicle, useSetForm]);

    useEffect(() => {
        Promise.all([getAllOptionalCategory({}), getAllOptional({})]).then(([categories, optional]) => {

            const categoriesWithOptionals = categories.map((category: OptionalCategory) => ({
                idOptionalCategory: category.idOptionalCategory,
                description: category.description,
                optional: optional.filter(opt => opt.idOptionalCategory == category.idOptionalCategory)
            }));

            setOptionalCategoryData(categoriesWithOptionals);
        }).catch(console.error);

        getAllColors({})
            .then(setUseColorData)
            .catch(console.error);

        getAllManufacturer({})
            .then(setManufacturerData)
            .catch(console.error);

        getAllOptional({})
            .then(setOptionalData)
            .catch(console.error);

        getAllVehicleCategory({})
            .then(setVehicleCategoryData)
            .catch(console.error);
    }, []);

    return <Form {...useSetForm}>
        <Toaster />
        <form onSubmit={useSetForm.handleSubmit(onSubmit)} className="grid gap-12">
            <Card className="shadow-lg border border-blue-200 bg-[#f8f8f8]">
                <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-3xl text-center text-[#626464]">CADASTRO DE VEICULO</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-10 md:grid-cols-2 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <FormField control={useSetForm.control} name="licensePlateDisplay" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Mostrar Placa
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="priceDisplay" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Mostrar Valor
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="armored" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Destaque
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="classic" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Destaque
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <FormField control={useSetForm.control} name="featured" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Destaque
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="allowsProposal" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Aceita Proposta
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="allowsTrade" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Aceita troca
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="sold" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Label className="flex items-center space-x-2">
                                        <Checkbox checked={!!field.value} className="h-9 w-9" onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                        Vendido
                                    </Label>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                    </div>
                    <div className="space-y-6">
                        <FormField control={useSetForm.control} name="licensePlate" render={({ field }) => (
                            <FormItem>
                                <Label>Placa/ Mostrar Placa</Label>
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
                        <FormField control={useSetForm.control} name="idManufacturer" render={({ field }) => (
                            <FormItem>
                                <Label>Fabricante</Label>
                                <FormControl>
                                    <SelectComponent
                                        label="Fabricante"
                                        id="fabricante"
                                        onChange={field.onChange}
                                        value={field.value.toString()}
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
                        <FormField control={useSetForm.control} name="idColor" render={({ field }) => (
                            <FormItem>
                                <Label>Cor</Label>
                                <FormControl>
                                    <SelectComponent
                                        label="Cor"
                                        id="cor"
                                        onChange={field.onChange}
                                        value={field.value.toString()}
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
                                            { value: "Gasolina", description: "Gasolina" },
                                            { value: "Álcool", description: "Álcool" },
                                            { value: "Flex", description: "Flex" },
                                            { value: "Diesel", description: "Diesel" },
                                        ]}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )} />
                        <FormField control={useSetForm.control} name="idVehicleCategory" render={({ field }) => (
                            <FormItem>
                                <Label>Tipo de Veículo</Label>
                                <FormControl>
                                    <SelectComponent
                                        label="Tipo de Veículo"
                                        id="tipoVeiculo"
                                        onChange={field.onChange}
                                        value={field.value.toString()}
                                        dataValue={useVehicleCategoryData
                                            .filter((m) => m.idVehicleCategory !== undefined)
                                            .map((m) => ({
                                                value: m.idVehicleCategory!,
                                                description: m.description ?? ""
                                            }))}
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
                    <FormField control={useSetForm.control} name="installmentCount" render={({ field }) => (
                        <FormItem>
                            <Label>Parcelas</Label>
                            <FormControl><Input type="number" placeholder="Quantidade de Parcelas" {...field} /></FormControl>
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

            {/* <Card className="shadow-md border mt-5 bg-[#f8f8f8] p-5">
                <Card className="w-full p-5 space-y-6 grid gap-10 md:grid-cols-2">
                    {useOptionalCategoryData.map((category) =>
                        category.optional.length > 0 ? (
                            <div key={category.idOptionalCategory}>
                                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-4 border-b pb-2">
                                    {category.description}
                                </h3>
                                <div className="">
                                    {category.optional.map((optional) => (
                                        <div key={optional.idOptional} className="flex p-3">
                                            <Label htmlFor={`optional-${optional.idOptional}`} className="text-sm text-[#4a4a4a]">
                                                <Checkbox
                                                    className="data-[state=checked]:bg-[#626464] data-[state=unchecked]:bg-gray-300 "
                                                    id={`optional-${optional.idOptional}`}
                                                // checked={...}
                                                // onCheckedChange={...}
                                                />
                                                {optional.description}

                                            </Label>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    )}
                </Card>
            </Card> */}

            {/* <Card className="shadow-md border mt-5 border-blue-200 bg-[#f8f8f8]">
                <UploadImages />
            </Card> */}
        </form>
    </Form>

}
