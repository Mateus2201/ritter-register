'use client'

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FormDataOptional } from "@/schema-forms/form-optionals";
import { Plus, Trash2 } from "lucide-react";
import Optional from "@/types/Optional";
import { useOptional } from "@/hooks/use-optional";
import SelectComponent from "../../components/select-component";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import OptionalCategory from "@/types/OptionalCategory";
import { toast, Toaster } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";


import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function FormOptional() {
	const [useOptionalData, setOptionalData] = useState<Optional[]>([]);
	const [reload, serReload] = useState<boolean>(false);

	const [useOptionalCategoryData, setOptionalCategoryData] = useState<OptionalCategory[]>([{
		description: "Categoria Opcional",
		idOptionalCategory: 0,
		optional: []
	}]);

	const { getAllOptionalCategory } = useOptionalCategory();
	const { getAllOptional, createOptional, deleteOptional } = useOptional();

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
	}, [reload]);

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
	}, [reload]);

	const handleDelete = (Optional: Optional) => {
		if (!Optional) return;

		deleteOptional(Optional.idOptional)
			.then(() => {
				serReload(!reload);
				toast("Opcional deletado com sucesso!", {
					description: new Date().toLocaleDateString("pt-BR"),
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				})
			}).catch((error) => {
				toast.error("Erro ao deletar opcional:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			});
	}

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
					<TableCell className="hidden md:table-cell text-center min-w-[80px]">
						{idOptional}
					</TableCell>
					<TableCell
						className="text-center truncate max-w-[200px]"
						title={description}
					>
						{description}
					</TableCell>
					<TableCell
						className="hidden lg:table-cell text-center min-w-[150px]"
						title={OptionalCategory?.description}
					>
						{OptionalCategory?.description}
					</TableCell>
					<TableCell className="hidden lg:table-cell text-center min-w-[120px]">
						{createdBy}
					</TableCell>
					<TableCell className="hidden lg:table-cell text-center min-w-[130px]">
						{createdAt
							? new Date(createdAt).toLocaleDateString("pt-BR")
							: ""}
					</TableCell>
					<TableCell className="hidden xl:table-cell text-center min-w-[120px]">
						{updatedBy}
					</TableCell>
					<TableCell className="hidden xl:table-cell text-center min-w-[130px]">
						{updatedAt
							? new Date(updatedAt).toLocaleDateString("pt-BR")
							: ""}
					</TableCell>
					<TableCell className="text-center">
						<Button
							variant="ghost"
							size="icon"
							className="text-destructive hover:bg-destructive/10 flex-shrink-0"
							onClick={() =>
								handleDelete({ idOptional, description })
							}
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</TableCell>
				</TableRow>
			)
		)
	};

	return <Form {...useSetFormOptional}>
		<Toaster />
		<div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
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
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<FormField
							control={useSetFormOptional.control}
							name="idOptionalCategory"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<SelectComponent
											label="Categoria Opcional"
											id="categoryOptional"
											onChange={(value) =>
												field.onChange(Number(value))
											}
											value={field.value?.toString()}
											dataValue={useOptionalCategoryData
												.filter(
													(m) =>
														m.idOptionalCategory !==
														undefined
												)
												.map((m) => ({
													value:
														m.idOptionalCategory!,
													description:
														m.description,
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
										<Input
											placeholder="Descrição"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-red-500" />
								</FormItem>
							)}
						/>
						<div className="flex items-stretch">
							<Button
								type="submit"
								className="w-full sm:w-auto h-full flex items-center justify-center"
							>
								<Plus className="w-4 h-4 mr-2" />
								Adicionar
							</Button>
						</div>
					</div>
				</Card>
			</form>

			<Card className="rounded-xl border bg-card shadow-sm p-4">
				<div className="overflow-x-auto">
					<Table className="table-fixed w-full">
						<TableCaption className="text-muted-foreground text-sm">
							Lista dos opcionais cadastrados
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden md:table-cell text-center min-w-[80px]">
									ID
								</TableHead>
								<TableHead className="text-center min-w-[150px]">
									Descrição
								</TableHead>
								<TableHead className="text-center hidden lg:table-cell min-w-[150px]">
									Categoria
								</TableHead>
								<TableHead className="hidden lg:table-cell text-center min-w-[120px]">
									Criado por
								</TableHead>
								<TableHead className="hidden lg:table-cell text-center min-w-[130px]">
									Criado em
								</TableHead>
								<TableHead className="hidden xl:table-cell text-center min-w-[120px]">
									Alterado por
								</TableHead>
								<TableHead className="hidden xl:table-cell text-center min-w-[130px]">
									Alterado em
								</TableHead>
								<TableHead className="text-center min-w-[80px]">
									Excluir
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<MakeTableRow />
						</TableBody>
					</Table>
				</div>
			</Card>
		</div>
	</Form>

}
