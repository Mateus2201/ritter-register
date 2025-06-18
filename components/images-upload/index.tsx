"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableImage from "../sortable-images";
import Optionals from "../optionals";
import { Card } from "../ui/card";
import { v4 as uuidv4 } from "uuid";

interface VehicleProps {
    idVehicle?: string
}

export default function UploadImages({ idVehicle }: VehicleProps) {
    const [idVehicleState] = useState<number>(idVehicle ? Number(idVehicle) : 0)

    const [images, setImages] = useState<{ id: string, file: File; name: string }[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                id: uuidv4(),
                file,
                name: file.name,
            }));
            setImages((prev) => [...prev, ...newFiles]);
        }
    };

    const handleRemove = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRename = (index: number, newName: string) => {
        setImages((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], name: newName };
            return updated;
        });
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img, i) => img.name + i === active.id);
            const newIndex = images.findIndex((img, i) => img.name + i === over?.id);
            setImages((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };

    return <Card className="shadow-md border mt-5 bg-[#f8f8f8] p-5">
        <div className="p-5 ">
            <h2 className="text-xl font-medium mb-2">Imagens do Veículo</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <Input
                    type="file"
                    className="w-full md:w-auto"
                    multiple
                    onChange={handleFileChange}
                    onPointerDown={(e) => e.stopPropagation()}
                />
            </div>

            {images.length > 0 && (
                <SortableContext
                    items={images.map((file) => file.id)} // Agora usando id fixo
                    strategy={verticalListSortingStrategy}
                >
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <ul className="mt-4 space-y-2">
                            {images.map((file, index) => (
                                <SortableImage
                                    key={file.id}
                                    file={file}
                                    index={index}
                                    onRemove={handleRemove}
                                    onRename={handleRename}
                                />
                            ))}
                        </ul>
                    </DndContext>
                </SortableContext>
            )}
        </div>
    </Card>
}
