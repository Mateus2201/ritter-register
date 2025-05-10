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
        <Checkbox id={id} checked={isChecked} onCheckedChange={onChange} className='text-white'/>
        <Label htmlFor={id} className="text-sm text-white">{label}</Label>
    </div>
}
