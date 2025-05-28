'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { toast, Toaster } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Manufacturer from "@/types/Manufacturer";
import VehicleCategory from "@/types/VehicleCategory";
import { FormDataVehicleCategory } from "@/schema-forms/form-vehicle-category";
import { useVehicleCategory } from "@/hooks/use-vehicle-category";

export default function FormVehicleCategory() {
	const [useVehicleCategoryData, setVehicleCategoryData] = useState<VehicleCategory[]>([]);

	const { createVehicleCategory, getAllVehicleCategory } = useVehicleCategory();

	const { useSetFormVehicleCategory } = FormDataVehicleCategory();

	function onSubmit(data: { description: string }) {
		const { description } = data;

		const newVehicleCategory: VehicleCategory = {
			description
		};

		console.log("Dados do formulário:", newVehicleCategory);


		createVehicleCategory(newVehicleCategory)
			.then((response) => {
				if (response) {
					toast("Categoria de Veículo incluída com sucesso!", {
						description: new Date().toLocaleDateString("pt-BR"),
						action: {
							label: "Fechar",
							onClick: () => console.log("Undo"),
						},
					})
				}
			})
			.catch(({ error }) => {
				toast("Erro ao criar Categoria de Veículo:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => { },
					},
				})
			}).finally(() => {
				SetUpdateListAllManufacturer();

				useSetFormVehicleCategory.reset();
			})
	}

	const SetUpdateListAllManufacturer = () => {
		getAllVehicleCategory()
			.then((response) => {
				setVehicleCategoryData(response);

			}).catch((error) => {
				toast("Erro ao buscar dados da API:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			})
	}

	useEffect(() => {
		SetUpdateListAllManufacturer();
	}, []);

	const MakeTableRow = () => {
		return useVehicleCategoryData.map(({ idVehicleCategory, description, createdAt, createdBy, updatedAt, updatedBy }: VehicleCategory) => (
			<TableRow key={idVehicleCategory}>
				<TableCell className="text-center not-md:hidden">{idVehicleCategory}</TableCell>
				<TableCell className="text-center">{description}</TableCell>
				<TableCell className="text-center not-md:hidden">{createdBy}</TableCell>
				<TableCell className="text-center not-md:hidden">{createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""}</TableCell>
				<TableCell className="text-center not-md:hidden">{updatedBy}</TableCell>
				<TableCell className="text-center not-md:hidden">{updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""}</TableCell>
				<TableCell className="text-center">
					<div className="flex justify-center items-center">
						<Trash2 />
					</div>
				</TableCell>
			</TableRow>
		));
	}

	return <Form {...useSetFormVehicleCategory}>
		<Toaster />
		<form onSubmit={useSetFormVehicleCategory.handleSubmit(onSubmit)} className="grid gap-12 mt-8">
			<Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
				<CardHeader className="bg-indigo-50">
					<CardTitle className="text-xl text-[#626464]"> CADASTRO DE CATEGORIA DE VEÍCULOS</CardTitle>
				</CardHeader>
				<CardContent className="grid md:grid-cols-2 gap-6">
					<FormField control={useSetFormVehicleCategory.control} name="description" render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Descrição" {...field} />
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)} />
					<Button type="submit" className="px-10 py-4 border text-[#626464] hover:bg-[#626464] hover:text-white bg-white">
						<Plus className="w-4 h-4 mr-2" /> Adicionar
					</Button>
				</CardContent>
				<div className="overflow-x-auto rounded-md border border-gray-200 m-5">
					<div className=" max-h-[400px] overflow-x-scroll overflow-y-scroll">
						<Table className="w-full text-sm text-left text-gray-500">
							<TableCaption>Lista das fabricantes adicionadas.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center text-md not-md:hidden">Id</TableHead>
									<TableHead className="text-center text-md">Nome</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Criado por</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Criado em</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Alterado por</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Alterado em</TableHead>
									<TableHead className="text-center text-md ">Excluir</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<MakeTableRow />
							</TableBody>
						</Table>
					</div>
				</div>
			</Card>
		</form>
	</Form>
}
