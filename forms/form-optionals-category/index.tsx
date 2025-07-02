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
		return useOptionalCategorys.map(
			({
				idOptionalCategory, description, createdAt, createdBy, updatedAt, updatedBy
			}: OptionalCategory) => (
				<TableRow key={idOptionalCategory}>
					<TableCell className="hidden md:table-cell text-center">
						{idOptionalCategory}
					</TableCell>
					<TableCell className="text-center">{description}</TableCell>
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

	return <Form {...useSetFormOptionalCategory}>
		<Toaster />
		<div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
			<div className="text-center">
				<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Cadastro de Categoria de Opcionais
				</h2>
				<p className="mt-2 text-muted-foreground text-sm sm:text-base">
					Adicione e gerencie as categorias no sistema
				</p>
			</div>
			<form onSubmit={useSetFormOptionalCategory.handleSubmit(onSubmit)}>
				<Card className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
					<div className="grid lg:grid-cols-2 gap-4">
						<FormField
							control={useSetFormOptionalCategory.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Descrição da categoria" {...field} />
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
						Lista das categorias adicionadas
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
