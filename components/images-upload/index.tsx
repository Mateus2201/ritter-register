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

export default function UploadImages() {
    const [images, setImages] = useState<{ file: File; name: string }[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => ({
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
            const newImages = [...prev];
            newImages[index].name = newName;
            return newImages;
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

    return <div className="p-5 ">
        <h2 className="text-xl font-medium mb-2">Imagens do Veículo</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <Input
                type="file"
                className="w-full md:w-auto"
                multiple
                onChange={handleFileChange}
            />
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo Imagem" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="externa">Externa</SelectItem>
                    <SelectItem value="interna">Interna</SelectItem>
                    <SelectItem value="detalhe">Detalhe</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
                <Checkbox id="destaque" />
                <label htmlFor="destaque">Destaque página inicial</label>
            </div>
        </div>

        {images.length > 0 && (
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map((file, index) => file.name + index)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="mt-4 space-y-2">
                        {images.map((file, index) => (
                            <SortableImage
                                key={file.name + index}
                                file={file}
                                index={index}
                                onRemove={handleRemove}
                                onRename={handleRename}
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        )}
    </div>
}
