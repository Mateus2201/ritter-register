import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'

interface Option {
    value: number | string
    description: string
}

interface SelectComponentProps {
    label: string
    id: string
    onChange?: (value: string) => void
    value: string | number
    dataValue?: Option[]
    className?: string
}

export default function SelectComponent({
    label,
    id,
    onChange,
    value,
    dataValue,
    className
}: SelectComponentProps) {
    return <Select onValueChange={onChange} value={value !== undefined && value !== null ? String(value) : undefined}>
        <SelectTrigger className={`w-full ${className}`} id={id}>
            <SelectValue placeholder={label} ></SelectValue>
        </SelectTrigger>
        <SelectContent className="z-10 bg-white max-h-60 overflow-auto">
            {dataValue?.map((item) => (
                <SelectItem key={item.value} value={String(item.value)}>
                    {item.description}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
}
