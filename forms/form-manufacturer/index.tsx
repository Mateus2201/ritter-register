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
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FormDataColor } from "@/schema-forms/form-colors";
import Manufacturer from "@/types/Manufacturer";
import { useManufacturer } from "@/hooks/use-manufacturer";
import { FormDataManufacturer } from "@/schema-forms/form-manufacturer";

export default function FormManufacturer() {
	const [useManufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);

	const { createManufacturer, getAllManufacturer } = useManufacturer();

	const { useSetFormManufacturer } = FormDataManufacturer();

	function onSubmit(data: { name: string }) {
		const { name } = data;

		const newManufacturer: Manufacturer = { name };

		createManufacturer(newManufacturer)
			.then((response) => {
				if (response) {
					toast("Fabricante incluída com sucesso!", {
						description: new Date().toLocaleDateString("pt-BR"),
						action: {
							label: "Fechar",
							onClick: () => console.log("Undo"),
						},
					})
				}
			})
			.catch(({ error }) => {
				toast("Erro ao criar Fabricante:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => { },
					},
				})
			}).finally(() => {
				SetUpdateListAllManufacturer();

				useSetFormManufacturer.reset();
			})
	}

	const SetUpdateListAllManufacturer = () => {
		getAllManufacturer()
			.then((response) => {
				setManufacturerData(response);

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
		return useManufacturerData.map(({ idManufacturer, name, createdAt, createdBy, updatedAt, updatedBy }: Manufacturer) => (
			<TableRow key={idManufacturer}>
				<TableCell className="text-center not-md:hidden">{idManufacturer}</TableCell>
				<TableCell className="text-center">{name}</TableCell>
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

	return <Form {...useSetFormManufacturer}>
		<Toaster />
		<form onSubmit={useSetFormManufacturer.handleSubmit(onSubmit)} className="grid gap-12 mt-8">
			<Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
				<CardHeader className="bg-indigo-50">
					<CardTitle className="text-xl text-[#626464]"> CADASTRO DE CORES</CardTitle>
				</CardHeader>
				<CardContent className="grid md:grid-cols-2 gap-6">
					<FormField control={useSetFormManufacturer.control} name="name" render={({ field }) => (
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
							<TableCaption>Lista das categorias adicionadas.</TableCaption>
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
