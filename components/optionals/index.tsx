import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

export default function Optionals() {
    return <div className="pt-6 border-t">
        <h2 className="text-xl font-medium mb-2">Opcionais do Veículo</h2>
        <div className="flex gap-2">
            <Select>
                <SelectTrigger><SelectValue placeholder="Tipo Opcional" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="ar">Ar Condicionado</SelectItem>
                    <SelectItem value="som">Som</SelectItem>
                    <SelectItem value="abs">Freios ABS</SelectItem>
                    <SelectItem value="airbag">Airbag</SelectItem>
                </SelectContent>
            </Select>
            <Button>Adicionar</Button>
        </div>
    </div>
}
