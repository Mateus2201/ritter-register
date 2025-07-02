'use client'

import Color from "@/types/Color";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useColors } from "@/hooks/use-colors";
import Manufacturer from "@/types/Manufacturer";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/images-upload";
import { FormDataCar } from "@/schema-forms/form-car";
import { useManufacturer } from "@/hooks/use-manufacturer";
import SelectComponent from "@/components/select-component";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Optional from "@/types/Optional";
import { useOptional } from "@/hooks/use-optional";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import OptionalCategory from "@/types/OptionalCategory";
// import { Switch } from "@radix-ui/react-switch";
import { useVehicleCategory } from "@/hooks/use-vehicle-category";
import VehicleCategory from "@/types/VehicleCategory";
import Vehicle from "@/types/Vehicle";
import { useVehicle } from "@/hooks/use-vehicle";
import { toast, Toaster } from "sonner";
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch";
import FormVehicleOptional from "../form-vehicles-optional";

interface VehicleProps {
    idVehicle?: string
}

type BooleanField =
    | "licensePlateDisplay"
    | "priceDisplay"
    | "armored"
    | "classic"
    | "featured"
    | "allowsProposal"
    | "allowsTrade"
    | "sold";

type NumericField =
    | "manufacturingYear"
    | "modelYear"
    | "doorCount"
    | "seatCount"
    | "mileage"
    | "price"
    | "installmentCount"
    | "installmentValue";

// ====================== ARRAYS DE CAMPOS ======================

const booleanFields: { name: BooleanField; label: string }[] = [
    { name: "licensePlateDisplay", label: "Mostrar Placa" },
    { name: "priceDisplay", label: "Mostrar Valor" },
    { name: "armored", label: "Blindado" },
    { name: "classic", label: "Clássico" },
    { name: "featured", label: "Destaque" },
    { name: "allowsProposal", label: "Aceita Proposta" },
    { name: "allowsTrade", label: "Aceita Troca" },
    { name: "sold", label: "Vendido" },
];

const numericFields: { name: NumericField; label: string }[] = [
    { name: "manufacturingYear", label: "Ano de Fabricação" },
    { name: "modelYear", label: "Ano do Modelo" },
    { name: "doorCount", label: "Portas" },
    { name: "seatCount", label: "Assentos" },
    { name: "mileage", label: "Quilometragem" },
    { name: "price", label: "Preço" },
    { name: "installmentCount", label: "Parcelas" },
    { name: "installmentValue", label: "Valor da Parcela" },
];

export default function FormVehicle({ idVehicle }: VehicleProps) {
    const router = useRouter()

    const [idVehicleState] = useState<string>(idVehicle ?? '')

    const { getAllColors } = useColors();
    const { getAllManufacturer } = useManufacturer();
    const { getAllOptional } = useOptional();
    const { getAllOptionalCategory } = useOptionalCategory();
    const { getAllVehicleCategory } = useVehicleCategory();
    const { getVehicleById, createVehicle, updateVehicle } = useVehicle();

    const [selectedTab, setSelectedTab] = useState<string>("dados");
    const [useColorData, setUseColorData] = useState<Color[]>([]);
    const [useManufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);
    const [useOptionalData, setOptionalData] = useState<Optional[]>([]);
    const [useOptionalCategoryData, setOptionalCategoryData] = useState<OptionalCategory[]>([]);
    const [useVehicleCategoryData, setVehicleCategoryData] = useState<VehicleCategory[]>([]);

    const { useSetForm } = FormDataCar()

    const handleSuccess = (vehicle: Vehicle) => {
        useSetForm.reset(vehicle);

        toast("Veículo incluído/alterado com sucesso!", {
            description: new Date().toLocaleDateString("pt-BR"),
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar toast"),
            },
        });

        router.push('/vehicles/' + vehicle.idVehicle.toString())
    };

    const handleError = (message: string, error: unknown) => {
        toast.error(message, {
            description: String(error),
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar toast"),
            },
        });
    };

    const onSubmit = async (data: any) => {
        const vehicle: Vehicle = {
            idVehicle: idVehicleState ? Number(idVehicleState) : 0,
            ...data,
        };

        console.log("Dados do veículo a serem salvos:", vehicle);


        try {
            const response = idVehicleState
                ? await updateVehicle(vehicle)
                : await createVehicle(vehicle);

            if (response) handleSuccess(response);
        } catch (error) {
            handleError("Erro ao salvar o veículo!", error);
        }
    };

    useEffect(() => {
        if (idVehicleState) {
            getVehicleById({ id: idVehicleState })
                .then((vehicle) => {
                    if (vehicle) useSetForm.reset(vehicle);
                });
        }
    }, [idVehicleState, useSetForm]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categories, optionalsList] = await Promise.all([
                    getAllOptionalCategory({}),
                    getAllOptional({}),
                ]);

                const enrichedCategories = categories.map((category) => ({
                    ...category,
                    optional: optionalsList.filter(
                        (opt) => opt.idOptionalCategory === category.idOptionalCategory
                    ),
                }));

                setOptionalCategoryData(enrichedCategories);
                setOptionalData(optionalsList);
            } catch (error) {
                handleError("Erro ao carregar dados iniciais!", error);

                console.error("Erro ao carregar dados iniciais:", error);
            }
        };

        fetchInitialData();
    }, []);


    useEffect(() => {
        getAllColors({})
            .then(setUseColorData)
            .catch(err => {
                handleError("Erro ao carregar cores!", err);

                console.log(err);
            })
    }, []);

    useEffect(() => {
        getAllManufacturer({})
            .then(setManufacturerData)
            .catch(err => {
                handleError("Erro ao carregar fabricantes!", err);

                console.log(err);
            })
    }, []);
    useEffect(() => {
        getAllVehicleCategory({})
            .then(setVehicleCategoryData)
            .catch(err => {
                handleError("Erro ao carregar categoria dos veiculos!", err);
                console.log(err);
            })
    }, []);

    console.log(selectedTab);

    return <Form {...useSetForm}>
        <Toaster />
        <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Cadastro de Veículos
                </h2>
                <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                    Gerencie os veículos disponíveis no sistema
                </p>
            </div>
            <div className="grid gap-5">
                <Tabs defaultValue="dados" value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className={`grid lg:grid-cols-${idVehicle ? 5 : 3} grid-cols-2  w-full not-lg:h-max space-x-5 gap-2`}>
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="dados">Dados</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="especificacoes">Especificações</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white w-full" value="observacoes">Observações</TabsTrigger>

                        {idVehicle && <>
                            <TabsTrigger className="data-[state=active]:text-white w-full" value="opcionais">Opcionais</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:text-white w-full" value="imagens">Imagens</TabsTrigger>

                        </>}
                    </TabsList>

                    <form onSubmit={useSetForm.handleSubmit(onSubmit)} >

                        {/* DADOS */}
                        <TabsContent value="dados">
                            <Card>
                                <CardContent className="grid md:grid-cols-1 gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {booleanFields.map(({ name, label }) => (
                                            <FormField key={name} control={useSetForm.control} name={name} render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                    <Label>{label}</Label>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        ))}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField control={useSetForm.control} name="licensePlate" render={({ field }) => (
                                            <FormItem>
                                                <Label>Placa</Label>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={useSetForm.control} name="model" render={({ field }) => (
                                            <FormItem>
                                                <Label>Modelo</Label>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={useSetForm.control} name="idManufacturer" render={({ field }) => (
                                            <FormItem>
                                                <Label>Fabricante</Label>
                                                <FormControl>
                                                    <SelectComponent
                                                        id="fabricante"
                                                        onChange={field.onChange}
                                                        value={String(field.value)}
                                                        dataValue={useManufacturerData.map(m => ({ value: m.idManufacturer ?? '', description: m.name }))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={useSetForm.control} name="idColor" render={({ field }) => (
                                            <FormItem>
                                                <Label>Cor</Label>
                                                <FormControl>
                                                    <SelectComponent
                                                        id="cor"
                                                        onChange={field.onChange}
                                                        value={String(field.value)}
                                                        dataValue={useColorData.map(c => ({
                                                            value: c.idColor ?? '',
                                                            description: c.description
                                                        }))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField control={useSetForm.control} name="fuel" render={({ field }) => (
                                            <FormItem>
                                                <Label>Combustível</Label>
                                                <FormControl>
                                                    <SelectComponent
                                                        id="fuel"
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
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={useSetForm.control} name="idVehicleCategory" render={({ field }) => (
                                            <FormItem>
                                                <Label>Tipo de Veículo</Label>
                                                <FormControl>
                                                    <SelectComponent
                                                        id="tipoVeiculo"
                                                        onChange={field.onChange}
                                                        value={String(field.value)}
                                                        dataValue={useVehicleCategoryData.map(vc => ({
                                                            value: vc.idVehicleCategory ?? '',
                                                            description: vc.description ?? ''
                                                        }))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={useSetForm.control} name="engine" render={({ field }) => (
                                            <FormItem>
                                                <Label>Motor</Label>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ESPECIFICAÇÕES */}
                        <TabsContent value="especificacoes">
                            <Card>
                                <CardContent className="grid md:grid-cols-2 gap-6">
                                    {numericFields.map(({ name, label }) => (
                                        <FormField key={name} control={useSetForm.control} name={name} render={({ field }) => (
                                            <FormItem>
                                                <Label>{label}</Label>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* OBSERVAÇÕES */}
                        <TabsContent value="observacoes">
                            <Card>
                                <CardContent>
                                    <FormField control={useSetForm.control} name="notes" render={({ field }) => (
                                        <FormItem>
                                            <Label>Informações adicionais</Label>
                                            <FormControl><Textarea className="w-full h-65" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {!['imagens', 'opcionais'].includes(selectedTab) &&
                            <Button type="submit" className="border mt-5 w-full text-lg text-white bg-background hover:bg-white hover:text-background transition-colors duration-300" >
                                Salvar Veículo
                            </Button>
                        }
                    </form>



                    {/* OPCIONAIS */}
                    <TabsContent value="opcionais">
                        <FormVehicleOptional idVehicle={idVehicle} />
                    </TabsContent>


                    {/* IMAGENS */}
                    <TabsContent value="imagens">
                        <UploadImages idVehicle={idVehicle} />
                    </TabsContent>


                </Tabs>

            </div>
        </div>
    </Form >


}
