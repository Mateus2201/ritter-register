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
import { toast } from "sonner";

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
		return useOptionalData.map(({ OptionalCategory, idOptional, description, createdAt, createdBy, updatedAt, updatedBy }: Optional) => (
			<TableRow key={idOptional}>
				<TableCell className="text-center not-md:hidden">{idOptional}</TableCell>
				<TableCell className="text-center">{description}</TableCell>
				<TableCell className="text-center">{OptionalCategory?.description}</TableCell>
				<TableCell className="text-center not-md:hidden">{createdBy}</TableCell>
				<TableCell className="text-center not-md:hidden">{createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""}</TableCell>
				<TableCell className="text-center not-md:hidden">{updatedBy}</TableCell>
				<TableCell className="text-center not-md:hidden">{updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""}</TableCell>
				<TableCell className="text-center not-md:hidden">
					<div className="flex justify-center items-center">
						<Trash2 />
					</div>
				</TableCell>
			</TableRow>
		));
	}

	return <Form {...useSetFormOptional}>
		<form onSubmit={useSetFormOptional.handleSubmit(onSubmit)} className="grid gap-12 mt-8">
			<Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
				<CardHeader className="bg-indigo-50">
					<CardTitle className="text-xl text-[#626464]"> CADASTRO DE OPCIONAIS</CardTitle>
				</CardHeader>
				<CardContent className="grid md:grid-cols-3 gap-6">
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
					<FormField control={useSetFormOptional.control} name="description" render={({ field }) => (
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
							<TableCaption>Lista das opcionais adicionadas.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center text-md not-md:hidden">Id</TableHead>
									<TableHead className="text-center text-md">Descrição</TableHead>
									<TableHead className="text-center text-md">Categoria</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Criado por</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Criado em</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Alterado por</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Alterado em</TableHead>
									<TableHead className="text-center text-md not-md:hidden">Excluir</TableHead>
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
