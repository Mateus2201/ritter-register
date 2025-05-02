import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

interface CheckboxComponentProps {
    label: string
    id: string
    onChange?: (checked: boolean) => void
    isChecked?: boolean
}

export default function CheckboxComponent({ label, id, onChange, isChecked }: CheckboxComponentProps) {
    return <div className="flex items-center space-x-2 mt-2">
        <Checkbox id={id} checked={isChecked} onCheckedChange={onChange} />
        <Label htmlFor={id} className="text-sm">{label}</Label>
    </div>


    // return <div>
    //     <Input placeholder="Placa" />
    //     <div className="flex items-center space-x-2 mt-2">
    //         <Checkbox id="exibePlaca" />
    //         <Label htmlFor="exibePlaca" className="text-sm">Exibe placa</Label>
    //     </div>
    // </div>
}
