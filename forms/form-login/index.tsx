'use client'

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useOptional } from "@/hooks/use-optional";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import OptionalCategory from "@/types/OptionalCategory";
import { toast, Toaster } from "sonner";
import { FormDataVehiclesOptional } from "@/schema-forms/form-vehicles-optionals";
import VehicleOptional from "@/types/VehicleOptional";
import { useVehicleOptional } from "@/hooks/use-vehicle-optional";

interface VehicleProps {
    idVehicle?: string
}

export default function FormVehicleOptional({ idVehicle }: VehicleProps) {
    const [idVehicleState] = useState<number>(idVehicle ? Number(idVehicle) : 0)

    const { getAllOptional } = useOptional();
    const { getAllOptionalCategory } = useOptionalCategory();
    const { createVehicleOptional, deleteVehicleOptional, getVehicleOptionalByIdVehicle } = useVehicleOptional();

    const [useOptionalCategoryData, setOptionalCategoryData] = useState<OptionalCategory[]>([]);

    const { useSetFormVehiclesOptional } = FormDataVehiclesOptional()

    const handleSuccess = (vehicleOptionals: VehicleOptional[]) => {
        fetchInitialData();

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

    const onSubmit = async (data: any) => {
        const { optionals } = data;
        const vehicleOptionalList: VehicleOptional[] = optionals.map((idOptional: number) => ({
            idOptional,
            idVehicle: idVehicleState,
        }));

        try {
            await deleteVehicleOptional(idVehicleState);
            const response = await createVehicleOptional(vehicleOptionalList)

            handleSuccess(response);
        } catch (error) {
            handleError("Erro ao gerar os opcionais do veículo!", error)
        }
    };

    const fetchInitialData = async () => {
        try {
            const [categories, optionalsList, selectedOptionals] = await Promise.all([
                getAllOptionalCategory({}),
                getAllOptional({}),
                getVehicleOptionalByIdVehicle(idVehicleState),
            ]);

            const enrichedCategories = categories.map((category) => ({
                ...category,
                optional: optionalsList.filter(
                    (opt) => opt.idOptionalCategory === category.idOptionalCategory
                ),
            }));

            setOptionalCategoryData(enrichedCategories);

            const selectedIds = selectedOptionals.map((item) => item.idOptional);

            useSetFormVehiclesOptional.reset({
                optionals: selectedIds,
            });

        } catch (error) {
            handleError("Erro ao carregar dados iniciais:", error);
        }
    };
    useEffect(() => {
        fetchInitialData();
    }, [idVehicleState]);


    return <Form {...useSetFormVehiclesOptional}>
        <Toaster />
        <form onSubmit={useSetFormVehiclesOptional.handleSubmit(onSubmit)} className="grid gap-12">
            <Card className="shadow-md border mt-5 bg-[#f8f8f8] p-5">
                <Card className="w-full p-5 space-y-6 grid gap-10 md:grid-cols-2">
                    {useOptionalCategoryData.map((category) =>
                        category.optional.length > 0 ? (
                            <div key={category.idOptionalCategory}>
                                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-4 border-b pb-2">
                                    {category.description}
                                </h3>
                                <div className="space-y-3">
                                    {category.optional.map((optional) => (
                                        <FormField
                                            key={optional.idOptional}
                                            control={useSetFormVehiclesOptional.control}
                                            name="optionals"
                                            render={({ field }) => {
                                                const isChecked = field.value?.includes(optional.idOptional) ?? false;
                                                return (
                                                    <FormItem
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                        key={optional.idOptional}
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                id={`optional-${optional.idOptional}`}
                                                                checked={isChecked}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        field.onChange([...(field.value || []), optional.idOptional]);
                                                                    } else {
                                                                        field.onChange(
                                                                            (field.value || []).filter((id) => id !== optional.idOptional)
                                                                        );
                                                                    }
                                                                }}
                                                                className="data-[state=checked]:bg-[#626464] data-[state=unchecked]:bg-gray-300"
                                                            />
                                                        </FormControl>
                                                        <Label htmlFor={`optional-${optional.idOptional}`} className="text-sm text-[#4a4a4a]">
                                                            {optional.description}
                                                        </Label>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null
                    )}
                </Card>
            </Card>
            <div className="flex justify-end">
                <Button type="submit" className="px-10 py-4 text-lg bg-[#626464] hover:bg-[#626464] text-white">Salvar Opcionais</Button>
            </div>
        </form>
    </Form>

}
