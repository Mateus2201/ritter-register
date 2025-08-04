import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { X, Check, Slash, Trash } from "lucide-react";

type DialogType = {
    title?: string;
    description?: string;
    cancel?: () => void;
    cancelButton?: boolean;
    cancelText?: string;
    confirm?: () => void;
    confirmButton?: boolean;
    confirmText?: string;
    defaultOpen?: boolean;
    open?: boolean;
    loading?: boolean;
    className?: string;
};

export function AlertDialogComponent({
    title,
    description,
    cancel,
    cancelButton = true,
    cancelText = "Cancelar",
    confirm,
    confirmButton = true,
    confirmText = "Confirmar",
    defaultOpen = false,
    open,
    loading = false,
    className = "",
}: DialogType) {
    return (
        <AlertDialog defaultOpen={defaultOpen} open={open}>
            <AlertDialogContent
                className={
                    "max-w-md mx-auto rounded-2xl bg-white border border-slate-200  " +
                    className
                }
            >
                <div className="">
                    <AlertDialogHeader>
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                                <AlertDialogTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <span>{title}</span>
                                </AlertDialogTitle>
                                {description && (
                                    <AlertDialogDescription className="mt-1 text-sm text-slate-600">
                                        {description}
                                    </AlertDialogDescription>
                                )}
                            </div>
                            {cancel && (
                                <button
                                    type="button"
                                    aria-label="Fechar"
                                    onClick={cancel}
                                    className="rounded-full p-1 hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <X className="w-4 h-4 text-slate-500" />
                                </button>
                            )}
                        </div>
                    </AlertDialogHeader>
                </div>

                <AlertDialogFooter className="pt-2 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    {cancelButton && (
                        <AlertDialogCancel
                            onClick={cancel}
                            disabled={loading}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X className="w-4 h-4" />
                            <span>{cancelText}</span>
                        </AlertDialogCancel>
                    )}
                    {confirmButton && (
                        <AlertDialogAction
                            onClick={confirm}
                            disabled={loading}
                            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary text-white px-4 py-2 text-sm font-semibold hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash className="w-4 h-4" />
                            <span>{confirmText}</span>
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
