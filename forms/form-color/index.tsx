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
import Color from "@/types/Color";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useColors } from "@/hooks/use-colors";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FormDataColor } from "@/schema-forms/form-colors";
import { z } from "zod";

export default function FormColor() {
	const [useColorData, setColorData] = useState<Color[]>([]);

	const { getAllColors, createColor } = useColors();

	const { useSetFormColor, schemaColor } = FormDataColor();

	function onSubmit(data: z.infer<typeof schemaColor>) {
		const { description } = data;

		const newColor: Color = { description };

		createColor(newColor)
			.then((response) => {
				if (response) {
					console.log("Cor criada com sucesso:", response);

					setColorData((prev) => [...prev, response]);

					toast("Cor incluída com sucesso!", {
						description: new Date().toLocaleDateString("pt-BR"),
						action: {
							label: "Fechar",
							onClick: () => console.log("Undo"),
						},
					})
				}
			})
			.catch(({ error }) => {
				console.error("Erro ao criar Cor:", error);

				toast("Erro ao criar Cor:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => { },
					},
				})
			}).finally(() => {
				SetUpdateListAllColors();

				useSetFormColor.reset();
			})
	}

	const SetUpdateListAllColors = () => {
		getAllColors()
			.then((response) => {
				setColorData(response);

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
		SetUpdateListAllColors();
	}, []);

	const MakeTableRow = () => {
		return useColorData.map(
			({ idColor, description, createdAt, createdBy, updatedAt, updatedBy }: Color) => (
				<TableRow key={idColor} className="hover:bg-muted/50 transition">
					<TableCell className="text-center not-md:hidden text-gray-600">{idColor}</TableCell>
					<TableCell className="text-center font-medium text-gray-800">{description}</TableCell>
					<TableCell className="text-center not-md:hidden text-gray-600">{createdBy}</TableCell>
					<TableCell className="text-center not-md:hidden text-gray-600">
						{createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : "-"}
					</TableCell>
					<TableCell className="text-center not-md:hidden text-gray-600">{updatedBy}</TableCell>
					<TableCell className="text-center not-md:hidden text-gray-600">
						{updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : "-"}
					</TableCell>
					<TableCell className="text-center">
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-red-50 hover:text-red-500"
							aria-label="Excluir"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</TableCell>
				</TableRow>
			)
		);
	};

	return (
		<Form {...useSetFormColor}>
			<Toaster />
			<form
				onSubmit={useSetFormColor.handleSubmit(onSubmit)}
				className="max-w-6xl mx-auto p-4 space-y-8"
			>
				<Card className="shadow-lg border border-gray-200 rounded-2xl bg-white">
					<CardHeader className="bg-gray-50 border-b border-gray-200 rounded-t-2xl px-6 py-4">
						<CardTitle className="text-2xl font-semibold text-gray-800">
							🎨 Cadastro de Cores
						</CardTitle>
					</CardHeader>
					<CardContent className="px-6 py-8 space-y-6">
						<div className="grid md:grid-cols-2 gap-4 items-end">
							<FormField
								control={useSetFormColor.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Descrição da cor"
												{...field}
												className="h-12 text-base"
											/>
										</FormControl>
										<FormMessage className="text-red-500 text-sm" />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-12 w-full md:w-auto px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium rounded-md shadow"
							>
								<Plus className="w-4 h-4 mr-2" /> Adicionar
							</Button>
						</div>

						<div className="overflow-x-auto border rounded-xl">
							<Table className="min-w-full text-sm">
								<TableCaption className="text-gray-500 mt-2">
									Lista de cores cadastradas
								</TableCaption>
								<TableHeader className="bg-gray-100 sticky top-0 z-10">
									<TableRow>
										<TableHead className="text-center not-md:hidden">ID</TableHead>
										<TableHead className="text-center">Descrição</TableHead>
										<TableHead className="text-center not-md:hidden">Criado por</TableHead>
										<TableHead className="text-center not-md:hidden">Criado em</TableHead>
										<TableHead className="text-center not-md:hidden">Alterado por</TableHead>
										<TableHead className="text-center not-md:hidden">Alterado em</TableHead>
										<TableHead className="text-center">Ações</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<MakeTableRow />
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
