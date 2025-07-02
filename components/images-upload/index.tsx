"use client"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SortableImage from "../sortable-images";
import { Card } from "../ui/card";
import { v4 as uuidv4 } from "uuid";

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
import { Button } from "../ui/button";
import { toast } from "sonner";
import publicApi from "@/lib/api";
import { useVehicleImage } from "@/hooks/use-vehicle-images";

interface VehicleProps {
    idVehicle?: string
}

export default function UploadImages({ idVehicle }: VehicleProps) {
    const [idVehicleState] = useState<number>(idVehicle ? Number(idVehicle) : 0)
    const [reloadImages, setReloadImages] = useState<boolean>(true);
    const sensors = useSensors(useSensor(PointerSensor));

    const [images, setImages] = useState<{
        id: string,
        file: File;
        name: string,
        isActive: boolean,
        isExisting: boolean,
        previewUrl: string | null,
        order?: number;
    }[]>([]);

    const { createVehicleImage, getAllVehicleImage } = useVehicleImage();

    useEffect(() => {
        if (!idVehicleState || !reloadImages) return;

        getAllVehicleImage(idVehicleState).then((response) => {
            setImages(
                (response ?? []).map(({ idVehicleImage, isActive, name, secureURL }) => ({
                    id: idVehicleImage.toString(),
                    file: null as any,
                    name,
                    isActive,
                    isExisting: true,
                    previewUrl: secureURL,
                }))
            );

            setReloadImages(false);
        }).catch(toast.error)
    }, [reloadImages])


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                id: uuidv4(),
                file,
                name: file.name,
                isActive: true,
                isExisting: false,
                previewUrl: null,
                order: images.length + 1
            }));
            setImages((prev) => [...prev, ...newFiles])
        }
    }

    const handleRemove = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleRename = (index: number, newName: string) => {
        setImages((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], name: newName }
            return updated;
        })
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img, i) => img.name + i === active.id);
            const newIndex = images.findIndex((img, i) => img.name + i === over?.id);
            setImages((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    }

    const handleSubmit = async () => {
        if (images.length === 0) return;

        const onlyNewImages = images
            .map(({ id, file, name, isExisting }, index) => ({ id, file, name, order: index + 1, isExisting }))
            .filter(img => !img.isExisting)

        if (onlyNewImages.length === 0) {
            toast("Nenhuma nova imagem para enviar.");
            return;
        }

        createVehicleImage(onlyNewImages, idVehicleState).then((response) => {
            toast.success("Imagens enviadas com sucesso!");
            setImages([]);
            setReloadImages(true);
        }).catch(toast.error)
    };

    return <div className="grid gap-5">
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
                                <SortableImage key={file.id} file={file} index={index} onRemove={handleRemove} onRename={handleRename} />
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
