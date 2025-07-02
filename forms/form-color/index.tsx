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
		return useColorData.map(({ idColor, description, createdAt, createdBy, updatedAt, updatedBy }: Color) => (
			<TableRow key={idColor}>
				<TableCell className="hidden md:table-cell">{idColor}</TableCell>
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
						className="hover:bg-destructive/10 text-destructive"
						// onClick={() => handleDelete(idColor)}
					>
						<Trash2 className="w-4 h-4" />
					</Button>
				</TableCell>
			</TableRow>
		));
	}


	return <Form {...useSetFormColor}>
		<Toaster />
		<div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
			<div className="text-center">
				<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Cadastro de Cores
				</h2>
				<p className="mt-2 text-muted-foreground text-sm sm:text-base">
					Gerencie as cores disponíveis no sistema
				</p>
			</div>

			<form onSubmit={useSetFormColor.handleSubmit(onSubmit)}>
				<Card className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
						<FormField
							control={useSetFormColor.control}
							name="description"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input
											placeholder="Nome da cor (ex: Azul Royal)"
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
						Lista de cores cadastradas
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden md:table-cell">ID</TableHead>
							<TableHead>Descrição</TableHead>
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
