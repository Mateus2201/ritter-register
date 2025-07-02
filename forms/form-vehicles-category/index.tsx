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
		return useVehicleCategoryData.map(
			({
				idVehicleCategory,
				description,
				createdAt,
				createdBy,
				updatedAt,
				updatedBy,
			}: VehicleCategory) => (
				<TableRow key={idVehicleCategory}>
					<TableCell className="hidden md:table-cell">{idVehicleCategory}</TableCell>
					<TableCell>{description}</TableCell>
					<TableCell className="hidden lg:table-cell">{createdBy}</TableCell>
					<TableCell className="hidden lg:table-cell">
						{createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""}
					</TableCell>
					<TableCell className="hidden xl:table-cell">{updatedBy}</TableCell>
					<TableCell className="hidden xl:table-cell">
						{updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""}
					</TableCell>
					<TableCell className="text-center">
						<Button
							variant="ghost"
							size="icon"
							className="text-destructive hover:bg-destructive/10"
							// onClick={() => handleDelete(idVehicleCategory)}
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</TableCell>
				</TableRow>
			)
		);
	};


	return <Form {...useSetFormVehicleCategory}>
		<Toaster />

		<div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
			<div className="text-center">
				<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Cadastro de Categoria de Veículos
				</h2>
				<p className="mt-2 text-muted-foreground text-sm sm:text-base">
					Adicione e gerencie as categorias disponíveis
				</p>
			</div>

			<form onSubmit={useSetFormVehicleCategory.handleSubmit(onSubmit)}>
				<Card className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
						<FormField
							control={useSetFormVehicleCategory.control}
							name="description"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input
											placeholder="Descrição da categoria"
											{...field}
											className="rounded-lg"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full sm:w-auto h-full">
							<Plus className="w-4 h-4 mr-2" />
							Adicionar
						</Button>
					</div>
				</Card>
			</form>

			<Card className="rounded-xl border bg-card shadow-sm p-4">
				<Table>
					<TableCaption className="text-muted-foreground text-sm">
						Lista das categorias cadastradas
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden md:table-cell">ID</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className="hidden lg:table-cell">Criado por</TableHead>
							<TableHead className="hidden lg:table-cell">Criado em</TableHead>
							<TableHead className="hidden xl:table-cell">Alterado por</TableHead>
							<TableHead className="hidden xl:table-cell">Alterado em</TableHead>
							<TableHead className="text-center">Excluir</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<MakeTableRow />
					</TableBody>
				</Table>
			</Card>
		</div>
	</Form>

}
