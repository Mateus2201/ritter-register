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

export default function FormColor() {
	const [useColorData, setColorData] = useState<Color[]>([]);

	const { getAllColors, createColor } = useColors();

	const { useSetFormColor } = FormDataColor();

	function onSubmit(data: { description: string }) {
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
				<TableCell className="text-center not-md:hidden">{idColor}</TableCell>
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

	return <Form {...useSetFormColor}>
		<Toaster />
		<form onSubmit={useSetFormColor.handleSubmit(onSubmit)} className="grid gap-12 mt-8">
			<Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
				<CardHeader className="bg-indigo-50">
					<CardTitle className="text-xl text-[#626464]"> CADASTRO DE CORES</CardTitle>
				</CardHeader>
				<CardContent className="grid md:grid-cols-2 gap-6">
					<FormField control={useSetFormColor.control} name="description" render={({ field }) => (
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
							<TableCaption>Lista das cores adicionadas.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center text-md not-md:hidden">Id</TableHead>
									<TableHead className="text-center text-md">Descrição</TableHead>
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
