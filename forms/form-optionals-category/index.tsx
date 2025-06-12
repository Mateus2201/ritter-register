'use client'

import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OptionalCategory from "@/types/OptionalCategory";
import { useOptionalCategory } from "@/hooks/use-optional-category";
import { FormDataOptionalCategory } from "@/schema-forms/form-optionals-category";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

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

export default function FormOptionalCategory() {
	const [useLoading, setLoading] = useState(false);
	const [useOptionalCategorys, setOptionalCategory] = useState<OptionalCategory[]>([]);

	const { createOptionalCategory, getAllOptionalCategory } = useOptionalCategory();
	const { useSetFormOptionalCategory } = FormDataOptionalCategory();

	function onSubmit(data: { description: string }) {
		const { description } = data;
		const newOptionalCategory: OptionalCategory = { description, optional: [] };

		createOptionalCategory(newOptionalCategory)
			.then((response) => {
				if (response) {
					setOptionalCategory((prev) => [...prev, response]);
					setLoading(false);

					useSetFormOptionalCategory.reset();

					toast("Categoria incluída com sucesso!", {
						description: new Date().toLocaleDateString("pt-BR"),
						action: {
							label: "Fechar",
							onClick: () => console.log("Undo"),
						},
					})
				}
			})
			.catch((error) => {
				toast.error("Erro ao criar categoria opcional!", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
				setLoading(false);
			});
	}

	useEffect(() => {
		getAllOptionalCategory()
			.then((response) => {
				setOptionalCategory(response);
				setLoading(true);
			}).catch((error) => {
				toast.error("Erro ao buscar dados da API:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			});
	}, [useLoading]);

	const MakeTableRow = () => {
		return useOptionalCategorys.map(({ idOptionalCategory, description, createdAt, createdBy, updatedAt, updatedBy }: OptionalCategory) => (
			<TableRow key={idOptionalCategory}>
				<TableCell className="text-center not-md:hidden">{idOptionalCategory}</TableCell>
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

	return <Form {...useSetFormOptionalCategory}>
		<Toaster />
		<form onSubmit={useSetFormOptionalCategory.handleSubmit(onSubmit)} className="grid gap-12 ">
			<Card className="shadow-md border border-blue-200 bg-[#f8f8f8]">
				<CardHeader className="bg-indigo-50">
					<CardTitle className="text-xl text-[#626464]">CADASTRO DE CATEGORIA DOS OPCIONAIS</CardTitle>
				</CardHeader>
				<CardContent className="grid md:grid-cols-2 gap-6">
					<FormField control={useSetFormOptionalCategory.control} name="description" render={({ field }) => (
						<FormItem>
							<FormControl><Input placeholder="Descrição" {...field} /></FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)} />
					<Button type="submit" className="px-10 py-4 border text-[#626464] hover:bg-[#626464] hover:text-white bg-white">
						<Plus className="w-4 h-4 mr-2" /> Adicionar
					</Button>
				</CardContent>
				<div className="rounded-md border border-gray-200 m-5">
					<div className=" max-h-[400px] overflow-x-scroll overflow-y-scroll">
						<Table className="w-full text-sm text-left text-gray-500">
							<TableCaption>Lista das categorias adicionadas.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center not-md:hidden text-md">Id</TableHead>
									<TableHead className="text-center text-md">Descrição</TableHead>
									<TableHead className="text-center not-md:hidden text-md">Criado por</TableHead>
									<TableHead className="text-center not-md:hidden text-md">Criado em</TableHead>
									<TableHead className="text-center not-md:hidden text-md">Alterado por</TableHead>
									<TableHead className="text-center not-md:hidden text-md">Alterado em</TableHead>
									<TableHead className="text-center text-md">Excluir</TableHead>
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
