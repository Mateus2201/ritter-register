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
import { useManufacturer } from "@/hooks/use-manufacturer";
import { FormDataManufacturer } from "@/schema-forms/form-manufacturer";
import { error } from "console";

export default function FormManufacturer() {
	const [useManufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);
	const [reload, serReload] = useState<boolean>(false);

	const { createManufacturer, getAllManufacturer, deleteManufacturer } = useManufacturer();

	const { useSetFormManufacturer } = FormDataManufacturer();

	function onSubmit(data: { name: string }) {
		const { name } = data;

		const newManufacturer: Manufacturer = { name, idManufacturer: 0 };

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
	}, [reload]);

	const handleDelete = (Manufacturer: Manufacturer) => {
		if (!Manufacturer) return;

		deleteManufacturer(Manufacturer.idManufacturer)
			.then(() => {
				serReload(!reload);
				toast("Fabricante deletado com sucesso!", {
						description: new Date().toLocaleDateString("pt-BR"),
						action: {
							label: "Fechar",
							onClick: () => console.log("Undo"),
						},
					})
			}).catch((error) => {
				toast.error("Erro ao deletar fabricante:", {
					description: error,
					action: {
						label: "Fechar",
						onClick: () => console.log("Undo"),
					},
				});
			});
	}

	const MakeTableRow = () => {
		return useManufacturerData.map(
			({
				idManufacturer,
				name,
				createdAt,
				createdBy,
				updatedAt,
				updatedBy,
			}: Manufacturer) => (
				<TableRow key={idManufacturer}>
					<TableCell className="hidden md:table-cell text-center">{idManufacturer}</TableCell>
					<TableCell className="text-center">{name}</TableCell>
					<TableCell className="hidden lg:table-cell text-center">{createdBy}</TableCell>
					<TableCell className="hidden lg:table-cell text-center">
						{createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""}
					</TableCell>
					<TableCell className="hidden xl:table-cell text-center">{updatedBy}</TableCell>
					<TableCell className="hidden xl:table-cell text-center">
						{updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""}
					</TableCell>
					<TableCell className="text-center">
						<Button
							variant="ghost"
							size="icon"
							className="text-destructive hover:bg-gray-500"
							onClick={() => handleDelete({ idManufacturer, name })}
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</TableCell>
				</TableRow>
			)
		);
	};


	return <Form {...useSetFormManufacturer}>
		<Toaster />

		<div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
			<div className="text-center">
				<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Cadastro de Fabricantes
				</h2>
				<p className="mt-2 text-muted-foreground text-sm sm:text-base">
					Adicione e gerencie fabricantes no sistema
				</p>
			</div>

			<form onSubmit={useSetFormManufacturer.handleSubmit(onSubmit)}>
				<Card className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
						<FormField
							control={useSetFormManufacturer.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input
											placeholder="Nome do fabricante"
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
						Lista das fabricantes cadastradas
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="hidden md:table-cell text-center">ID</TableHead>
							<TableHead className="text-center">Nome</TableHead>
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
