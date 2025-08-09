'use client'

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SortableImage from "@/components/sortable-images";
import publicApi from "@/lib/api";
import { v4 as uuidv4 } from 'uuid';

import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import {
	arrayMove,
	SortableContext,
	horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { AlertDialogComponent } from "@/components/alert";
import DialogType from "@/types/dialogs";



export default function FormConfig() {
	const [selectedTab, setSelectedTab] = useState<string>("carousel");
	const [propsRegister, setPropsRegister] = useState<DialogType>()
	const [reloadImages, setReloadImages] = useState<boolean>(true);
	const sensors = useSensors(useSensor(PointerSensor));
	const [images, setImages] = useState<{
		id: string,
		file: File;
		name: string,
		isActive: boolean,
		isExisting: boolean,
		isRenamed: boolean,
		previewUrl: string,
		order?: number;
		publicId: string;
	}[]>([]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files).map((file) => ({
				id: uuidv4(),
				file,
				name: file.name,
				isActive: true,
				isExisting: false,
				isRenamed: false,
				previewUrl: URL.createObjectURL(file),
				order: images.length + 1,
				publicId: file.name
			}));

			setImages((prev) => [...prev, ...newFiles]);
		}
	};

	const handleRemove = async (index: number) => {

		setPropsRegister({
			title: 'Deseja excluir a foto?',
			description: 'Excluindo essa imagem, não poderá ser revertida posteriormente',
			confirm: async () => {
				const imageToDelete = images[index];

				if (!imageToDelete) {
					toast.error("Imagem não encontrada.");
					return;
				}

				if (!imageToDelete.isExisting) {
					setImages(prev => prev.filter((_, i) => i !== index));
					toast.success("Imagem removida com sucesso!");
					setPropsRegister({ ...propsRegister, open: false })
					return;
				}

				try {
					await publicApi.delete("/site-image", {
						data: {
							publicId: imageToDelete.publicId,
							folder: "registro-site",
						},
					});

					setImages(prev => prev.filter((_, i) => i !== index));
					toast.success("Imagem removida com sucesso!");
					setPropsRegister({ ...propsRegister, open: false })
				} catch (error) {
					console.error("Erro ao remover imagem:", error);
					toast.error("Erro ao remover imagem.");
				}

			},
			cancel: () => setPropsRegister({ ...propsRegister, open: false }),
			cancelText: 'cancelar',
			confirmText: 'excluir',
			cancelButton: true,
			confirmButton: true,
			open: true
		})
	};

	const handleRename = (index: number, newName: string) => {
		setImages(prev =>
			prev.map((img, i) =>
				i === index ? { ...img, name: newName, isRenamed: true } : img
			)
		);
	};

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		console.log(active, over);


		if (active.id !== over?.id) {
			const oldIndex = images.findIndex((img, i) => img.name + i === active.id);
			const newIndex = images.findIndex((img, i) => img.name + i === over?.id);
			setImages((prev) => arrayMove(prev, oldIndex, newIndex));
		}
	};

	const handleSubmit = async () => {
		if (images.length === 0) {
			toast("Nenhuma imagem selecionada.");
			return;
		}

		const formData = new FormData();

		images.forEach((img, index) => {
			if (img.file instanceof File && !img.isExisting) {
				formData.append("images", img.file, img.name);
			}
		});

		formData.append("folder", "registro-site");
		publicApi.post("/upload-site", formData)
			.then(({ data }) => {
				setReloadImages(!reloadImages)
				toast.success("Imagens enviadas com sucesso!");
			}).catch((error) => {
				console.error("Erro ao enviar imagens:", error);
				toast.error("Erro ao enviar imagens.");
			});

	};

	useEffect(() => {
		publicApi.get("/site-images")
			.then(({ data }) => {
				console.log(data);
				setImages(data.map((img: any) => ({
					id: img.publicId,
					file: new File([], img.name),
					name: img.name,
					isActive: true,
					isExisting: true,
					isRenamed: false,
					previewUrl: img.url,
					order: img.order,
					publicId: img.publicId
				})));

			}).catch((error) => {
				console.error("Erro ao enviar imagens:", error);
				toast.error("Erro ao enviar imagens.");
			});
	}, [reloadImages])

	return <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
		<Toaster />
		<AlertDialogComponent {...propsRegister} />

		<div className="text-center">
			<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
				Configurações
			</h2>
			<p className="mt-2 text-muted-foreground text-sm sm:text-base">
				Gerencie seu sistema
			</p>
		</div>

		<div className="grid gap-5">
			<Tabs defaultValue="dados" value={selectedTab} onValueChange={setSelectedTab}>

				<Card className="shadow-md border mt-5 bg-[#f8f8f8] p-5 ">
					<div className="p-5">
						<h2 className="text-xl font-medium mb-2">Imagens do Carrosel</h2>
						<div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
							<Input
								type="file"
								multiple className="w-full md:w-auto"
								onChange={handleFileChange}
								onPointerDown={(e) => e.stopPropagation()}
							/>
						</div>
						{images.length > 0 && <SortableContext items={images.map((file) => file.id)} strategy={horizontalListSortingStrategy}>
							<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
								<ul className="mt-4 space-y-2">
									{images.map((file, index) =>
										<SortableImage
											key={file.id}
											file={file}
											index={index}
											onRemove={handleRemove}
											onRename={handleRename}
											isExisting={file.isExisting}
										/>
									)}
								</ul>
							</DndContext>
						</SortableContext>}
					</div>
				</Card>
			</Tabs>
			<Button type="submit" className="border text-lg text-white bg-background hover:bg-white hover:text-background transition-colors duration-300" onClick={handleSubmit}>
				Salvar Imagens
			</Button>
		</div>
	</div>
}
