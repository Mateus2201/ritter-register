"use client"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SortableImage from "../sortable-images";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useVehicleImage } from "@/hooks/use-vehicle-images";
import { AlertDialogComponent } from "../alert";
import DialogType from "@/types/dialogs";

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
    verticalListSortingStrategy,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

interface VehicleProps {
    idVehicle?: string
}

export default function UploadImages({ idVehicle }: VehicleProps) {
    const [idVehicleState] = useState<number>(idVehicle ? Number(idVehicle) : 0);
    const [reloadImages, setReloadImages] = useState<boolean>(true);
    const [propsRegister, setPropsRegister] = useState<DialogType>();
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
    }[]>([]);

    const { createVehicleImage, getAllVehicleImage, deleteVehicleImage } = useVehicleImage();

    useEffect(() => {
        if (!idVehicleState || !reloadImages) return;

        getAllVehicleImage(idVehicleState)
            .then((response) => {
                setImages(
                    (response ?? []).map(({ idVehicleImage, isActive, name, secureURL }) => ({
                        id: idVehicleImage.toString(),
                        file: null as any,
                        name,
                        isActive,
                        isRenamed: false,
                        isExisting: true,
                        previewUrl: secureURL,
                    }))
                );

                setReloadImages(false);
            })
            .catch(toast.error)
    }, [reloadImages])


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const maxId = images.reduce((max, img) => {
                const idNumber = Number(img.id);
                return isNaN(idNumber) ? max : Math.max(max, idNumber);
            }, 0);

            const newFiles = Array.from(e.target.files).map((file, index) => ({
                id: (maxId + index + 1).toString(),
                file,
                name: file.name,
                isActive: true,
                isExisting: false,
                isRenamed: false,
                previewUrl: URL.createObjectURL(file),
                order: images.length + index + 1,
            }));

            setImages((prev) => [...prev, ...newFiles]);
        }
    };

    const handleRemove = async (imageId: number) => {

        setPropsRegister({
            title: 'Deseja excluir a foto?',
            description: 'Excluindo essa imagem, não poderá ser revertida posteriormente',
            confirm: async () => {
                const imageToDelete = images.find((m) => m.id === imageId.toString());

                if (!imageToDelete) {
                    toast.error("Imagem não encontrada.");
                    setPropsRegister({ ...propsRegister, open: false })
                    return;
                }

                if (!imageToDelete.isExisting) {
                    setImages((prev) => prev.filter((img) => img.id !== imageId.toString()));
                    toast.success("Imagem removida com sucesso!");
                    setPropsRegister({ ...propsRegister, open: false })
                    return;
                }

                try {
                    await deleteVehicleImage(Number(imageToDelete.id));
                    setImages((prev) => prev.filter((img) => img.id !== imageId.toString()));
                    toast.success("Imagem removida com sucesso!");
                    setPropsRegister({ ...propsRegister, open: false })
                } catch (error) {
                    setPropsRegister({ ...propsRegister, open: false })
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
        setImages(images.map(m => {
            if (index == Number(m.id)) {
                m.name = newName
                m.isRenamed = true
            }
            return m;
        }));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img, i) => img.name + i === active.id);
            const newIndex = images.findIndex((img, i) => img.name + i === over?.id);
            setImages((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const handleSubmit = async () => {
        if (images.length === 0) return;

        const renamedExisting = images
            .filter(
                img => img.isExisting && img.isRenamed && img.file instanceof File
            );

        await Promise
            .all(renamedExisting
                .map(img => deleteVehicleImage(Number(img.id)))
            );

        const imagesToUpload = images
            .filter((img) =>
                (!img.isExisting && img.file instanceof File) ||
                (img.isRenamed && img.file instanceof File)
            )
            .map(({ id, file, name }, index) => ({
                id, file, name, order: index + 1,
            }));


        if (imagesToUpload.length === 0) {
            toast("Nenhuma nova imagem para enviar.");
            return;
        }

        createVehicleImage(imagesToUpload, idVehicleState)
            .then(() => {
                toast.success("Imagens enviadas com sucesso!");
                setReloadImages(true);
            })
            .catch((err) => {
                console.error("Erro ao criar imagens:", err);
                toast.error("Erro ao salvar imagens.");
            });
    };

    return <div className="grid gap-5">
        <AlertDialogComponent {...propsRegister} />

        <Card className="shadow-md border mt-5 bg-[#f8f8f8] p-5 ">
            <div className="p-5">
                <h2 className="text-xl font-medium mb-2">Imagens do Veículo</h2>
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
                                    index={Number(file.id)}
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
        <Button type="submit" className="border text-lg text-white bg-background hover:bg-white hover:text-background transition-colors duration-300" onClick={handleSubmit}>
            Salvar Imagens
        </Button>
    </div>

}
