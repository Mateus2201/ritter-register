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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";
import { FormDataOptional } from "@/schema-forms/form-optionals";
import { Plus, Trash2 } from "lucide-react";
import Optional from "@/types/Optional";
import { useOptional } from "@/hooks/use-optional";
import SelectComponent from "../../components/select-component";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import OptionalCategory from "@/types/OptionalCategory";
import { toast, Toaster } from "sonner";
import { Label } from "@/components/ui/label";

export default function FormOptional() {
	const [useOptionalData, setOptionalData] = useState<Optional[]>([]);
	const [useOptionalCategoryData, setOptionalCategoryData] = useState<OptionalCategory[]>([{
		description: "Categoria Opcional",
		idOptionalCategory: 0,
		optional: []
	}]);

	const { getAllOptionalCategory } = useOptionalCategory();
	const { getAllOptional, createOptional } = useOptional();

	const { useSetFormOptional } = FormDataOptional();

	function onSubmit(data: { description: string, idOptionalCategory: number }) {
		const { description, idOptionalCategory } = data;

		const newOptional: Optional = {
			idOptional: 0,
			idOptionalCategory: idOptionalCategory,
			description,
			OptionalCategory: undefined
		};

		createOptional(newOptional)
			.then((response) => {
				if (response) {
					setOptionalData((prev) => [...prev, response]);

					toast("Opcional incluída com sucesso!", {
						description: new Date().toLocaleDateString("pt-BR"),
						action: {
							label: "Fechar",
							onClick: () => console.log("Undo"),
						},
					})
				}
			})
			.catch((error) => {
				toast.error("Erro ao criar Opcional!", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			}).finally(() => {
				SetUpdateListAllOptional();

				useSetFormOptional.reset();
			})
	}

	const SetUpdateListAllOptional = () => {
		getAllOptional()
			.then((response) => {
				setOptionalData(response);
			}).catch((error) => {
				toast.error("Erro ao buscar dados da API:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			})
	}

	useEffect(() => {
		SetUpdateListAllOptional();
	}, []);

	useEffect(() => {
		getAllOptionalCategory()
			.then((response) => {
				if (response) {
					setOptionalCategoryData([useOptionalCategoryData[0], ...response]);
				}
			}).catch((error) => {
				toast.error("Erro ao buscar dados da API:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			})
	}, []);

	const MakeTableRow = () => {
		return useOptionalData.map(
			({
				OptionalCategory,
				idOptional,
				description,
				createdAt,
				createdBy,
				updatedAt,
				updatedBy,
			}: Optional) => (
				<TableRow key={idOptional}>
					<TableCell className="hidden md:table-cell text-center">
						{idOptional}
					</TableCell>
					<TableCell className="text-center">{description}</TableCell>
					<TableCell className="text-center">
						{OptionalCategory?.description}
					</TableCell>
					<TableCell className="hidden lg:table-cell text-center">
						{createdBy}
					</TableCell>
					<TableCell className="hidden lg:table-cell text-center">
						{createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""}
					</TableCell>
					<TableCell className="hidden xl:table-cell text-center">
						{updatedBy}
					</TableCell>
					<TableCell className="hidden xl:table-cell text-center">
						{updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""}
					</TableCell>
					<TableCell className="text-center">
						<Button
							variant="ghost"
							size="icon"
							className="text-destructive hover:bg-destructive/10"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</TableCell>
				</TableRow>
			)
		);
	};

	return <Form {...useSetFormOptional}>
		<Toaster />
		<div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
			<div className="text-center">
				<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Cadastro de Opcionais
				</h2>
				<p className="mt-2 text-muted-foreground text-sm sm:text-base">
					Adicione e gerencie Opcionais no sistema
				</p>
			</div>

			<form onSubmit={useSetFormOptional.handleSubmit(onSubmit)}>
				<Card className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
					<div className="grid lg:grid-cols-3 gap-4">
						<FormField
							control={useSetFormOptional.control}
							name="idOptionalCategory"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<SelectComponent
											label="Categoria Opcional"
											id="categoryOptional"
											onChange={(value) => field.onChange(Number(value))}
											value={field.value?.toString()}
											dataValue={useOptionalCategoryData
												.filter((m) => m.idOptionalCategory !== undefined)
												.map((m) => ({
													value: m.idOptionalCategory!,
													description: m.description,
												}))}
										/>
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
						<FormField
							control={useSetFormOptional.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Descrição" {...field} />
									</FormControl>
									<FormMessage className="text-red-500" />
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
						Lista dos opcionais cadastrados
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden md:table-cell text-center">ID</TableHead>
							<TableHead className="text-center">Descrição</TableHead>
							<TableHead className="hidden lg:table-cell text-center">Criado por</TableHead>
							<TableHead className="hidden lg:table-cell text-center">Criado em</TableHead>
							<TableHead className="hidden xl:table-cell text-center">Alterado por</TableHead>
							<TableHead className="hidden xl:table-cell text-center">Alterado em</TableHead>
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
