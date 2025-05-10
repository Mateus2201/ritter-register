import DialogType from "@/types/dialogs"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React from 'react'



export default function AlertComponent({ title, description, cancel, cancelButton, cancelText, confirm, confirmButton, confirmText, defaultOpen, open }: DialogType) {
    return <AlertDialog defaultOpen={defaultOpen} open={open} >
        <AlertDialogContent className="bg-gray-200">
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                {cancelButton && <AlertDialogCancel className="bg-red-500 text-white rounded-md hover:bg-red-600" onClick={cancel}>{cancelText}</AlertDialogCancel>}
                {confirmButton && <AlertDialogAction className="bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={confirm}>{confirmText}</AlertDialogAction>}
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
