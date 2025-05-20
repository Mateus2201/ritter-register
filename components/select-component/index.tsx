import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'

interface Option {
    value: number
    description: string
}

interface SelectComponentProps {
    label: string
    id: string
    onChange?: (value: string) => void
    value: string
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
    return <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full ">
            <SelectValue placeholder={label} /> {/* usa o label como placeholder */}
        </SelectTrigger>
        <SelectContent className='z-10 bg-gray-300'>
            {dataValue?.map((item) => (
                <SelectItem key={item.value} value={item.description}>
                    {item.description}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>

}
