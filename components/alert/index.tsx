import DialogType from "@/@types/dialogs"
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
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                {cancelButton && <AlertDialogCancel onClick={cancel}>{cancelText}</AlertDialogCancel>}
                {confirmButton && <AlertDialogAction onClick={confirm}>{confirmText}</AlertDialogAction>}
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
