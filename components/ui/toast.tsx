'use client'

import { Toaster as SonnerToaster } from 'sonner'

export default function Toaster() {
    return (
        <SonnerToaster
            position="bottom-right"
            toastOptions={{
                classNames: {
                    toast: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg',
                    title: 'font-semibold text-base',
                    description: 'text-sm',
                    actionButton: 'bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md text-sm font-medium',
                    cancelButton: 'bg-muted text-muted-foreground hover:bg-muted/90 px-3 py-2 rounded-md text-sm font-medium',
                    closeButton: 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400',
                },
            }}
        />
    )
}

export { toast } from 'sonner'