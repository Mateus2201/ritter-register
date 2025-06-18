"use client";

import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";

interface SortableImageProps {
    file: { file: File; name: string };
    index: number;
    onRemove: (index: number) => void;
    onRename: (index: number, newName: string) => void;
}

export default function SortableImage({
    file,
    index,
    onRemove,
    onRename,
}: SortableImageProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: file.name + index });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <li
        ref={setNodeRef}
        style={style}
        className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
    >
        <div className="flex items-center gap-3 w-full">
            <GripVertical
                className="text-gray-400 cursor-grab"
                {...attributes}
                {...listeners}
            />
            <img
                src={URL.createObjectURL(file.file)}
                alt="Preview"
                className="w-20 h-14 object-cover rounded"
            />
            <Input
                type="text"
                value={file.name}
                onChange={(e) => onRename(index, e.target.value)}
                onPointerDown={(e) => e.stopPropagation()}
                className="text-sm border rounded px-2 py-1 flex-1"
            />
        </div>
        <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(index)}
        >
            <X className="w-4 h-4" />
        </Button>
    </li>
}
