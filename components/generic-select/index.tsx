import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function GenericSelect(values?: string[]) {
    return <Select>
        <SelectTrigger className="w-full"><SelectValue placeholder="Combustível" /></SelectTrigger>
        <SelectContent>
            <SelectItem value="gasolina">Gasolina</SelectItem>
            <SelectItem value="alcool">Álcool</SelectItem>
            <SelectItem value="flex">Flex</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
        </SelectContent>
    </Select>
}
