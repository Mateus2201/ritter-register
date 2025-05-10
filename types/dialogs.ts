type DialogType  = {
    title?: string
    description?: string
    cancel?: () => void
    confirm?: () => void
    cancelText?: string
    confirmText?: string
    cancelButton?: boolean | false
    confirmButton?: boolean | false
    defaultOpen?: boolean | false
    open?: boolean | false
 }
 
 export default DialogType;
 