'use client'

import React, { useEffect, useMemo, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toaster, toast } from "sonner";

import { useOptional } from "@/hooks/use-optional";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import { useVehicleOptional } from "@/hooks/use-vehicle-optional";
import { FormDataVehiclesOptional } from "@/schema-forms/form-vehicles-optionals";

import Optional from "@/types/Optional";
import OptionalCategory from "@/types/OptionalCategory";
import VehicleOptional from "@/types/VehicleOptional";
import { Input } from "@/components/ui/input";

interface VehicleProps {
    idVehicle?: string;
}

export default function FormVehicleOptional({ idVehicle }: VehicleProps) {
    const idVehicleNum = Number(idVehicle || 0);

    const { getAllOptional } = useOptional();
    const { getAllOptionalCategory } = useOptionalCategory();
    const { getVehicleOptionalByIdVehicle, createVehicleOptional, deleteVehicleOptional } = useVehicleOptional();

    const { useSetFormVehiclesOptional } = FormDataVehiclesOptional();
    const [optionals, setOptionals] = useState<Optional[]>([]);
    const [categories, setCategories] = useState<OptionalCategory[]>([]);
    const [search, setSearch] = useState<string>("");
    const [onlySelected, setOnlySelected] = useState<boolean>(false);

    const selectedIds = useSetFormVehiclesOptional.watch("optionals") || [];

    const loadData = async () => {
        try {
            const [optionalList, categoryList, selectedOptionals] = await Promise.all([
                getAllOptional({}),
                getAllOptionalCategory({}),
                getVehicleOptionalByIdVehicle(idVehicleNum),
            ]);

            setOptionals(optionalList);
            setCategories(categoryList);

            useSetFormVehiclesOptional.reset({
                optionals: selectedOptionals.map(o => o.idOptional),
            });
        } catch (err) {
            toast.error("Erro ao carregar opcionais");
        }
    };

    useEffect(() => {
        loadData();
    }, [idVehicleNum]);

    const groupedFilteredData = useMemo(() => {
        const lowerSearch = search.toLowerCase();

        return categories
            .map((category) => {
                const filtered = optionals.filter((opt) => {
                    const matchesSearch = opt.description.toLowerCase().includes(lowerSearch);
                    const matchesSelected = onlySelected ? selectedIds.includes(opt.idOptional) : true;
                    return opt.idOptionalCategory === category.idOptionalCategory && matchesSearch && matchesSelected;
                });

                return filtered.length > 0
                    ? { ...category, optionals: filtered }
                    : null;
            })
            .filter(Boolean) as (OptionalCategory & { optionals: Optional[] })[];
    }, [search, onlySelected, selectedIds, categories, optionals]);


    const onSubmit = async (data: any) => {
        const { optionals } = data;
        const vehicleOptionalList: VehicleOptional[] = optionals.map((idOptional: number) => ({
            idOptional,
            idVehicle: idVehicleNum,
        }));

        try {
            await deleteVehicleOptional(idVehicleNum);
            const response = await createVehicleOptional(vehicleOptionalList)

            handleSuccess(response);
        } catch (error) {
            handleError("Erro ao gerar os opcionais do veículo!", error)
        }
    };

    const handleSuccess = (vehicleOptionals: VehicleOptional[]) => {
        loadData();

        toast("Veículo incluído/alterado com sucesso!", {
            description: new Date().toLocaleDateString("pt-BR"),
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar toast"),
            },
        });
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

    return <Form {...useSetFormVehiclesOptional}>
        <Toaster />
        <form onSubmit={useSetFormVehiclesOptional.handleSubmit(onSubmit)} className="grid gap-5">
            <Card className="p-5 bg-[#f8f8f8] border shadow-sm">
                <div className="mb-4 flex ">
                    <div className="flex w-2/3">
                        <Label htmlFor="search">Filtrar opcionais:</Label>
                        <Input
                            id="search"
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Digite para filtrar..."
                            className="w-full  mt-1 p-2 border rounded text-sm"
                        />
                    </div>
                    <div className="flex w-full md:w-1/3 items-center justify-end ml-auto gap-4 mb-4">
                        <Label htmlFor="filter-selected" className="text-sm">Somente Selecionados:</Label>
                        <Switch
                            id="filter-selected"
                            checked={onlySelected}
                            onCheckedChange={setOnlySelected}
                            className="data-[state=checked]:bg-[#626464] data-[state=unchecked]:bg-gray-300"
                        />
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {groupedFilteredData.length ? (
                        groupedFilteredData.map(category => (
                            <div key={category.idOptionalCategory}>
                                <h3 className="text-lg font-semibold mb-3 border-b pb-1 text-[#3d3d3d]">
                                    {category.description}
                                </h3>
                                <div className="space-y-2">
                                    {category.optionals.map(optional => (
                                        <FormField
                                            key={optional.idOptional}
                                            control={useSetFormVehiclesOptional.control}
                                            name="optionals"
                                            render={({ field }) => {
                                                const isChecked = field.value?.includes(optional.idOptional);
                                                return (
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <Switch
                                                                checked={isChecked}
                                                                onCheckedChange={(checked) => {
                                                                    const current = field.value || [];
                                                                    if (checked && !current.includes(optional.idOptional)) {
                                                                        field.onChange([...current, optional.idOptional]);
                                                                    } else {
                                                                        field.onChange(current.filter(id => id !== optional.idOptional));
                                                                    }
                                                                }}
                                                                className="data-[state=checked]:bg-[#626464] data-[state=unchecked]:bg-gray-300"
                                                            />
                                                        </FormControl>
                                                        <Label className="text-sm">{optional.description}</Label>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm col-span-2">Nenhum opcional encontrado...</p>
                    )}
                </div>
            </Card>

            <Button
                type="submit"
                className="bg-background text-white hover:bg-white hover:text-background border text-lg transition-colors duration-300"
            >
                Salvar Opcionais
            </Button>
        </form>
    </Form>
}
