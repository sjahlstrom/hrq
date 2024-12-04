'use client'

import { useRef } from 'react'
import { Toaster } from 'sonner'
import Breadcrumb from '@/components/common/bread-crumb'
import CheckUserRole from '@/components/check-user-role'
import { AddItem } from '@/components/(dashboard)/items/add-item'
import { EditItems } from '@/components/(dashboard)/items/edit-items'

export default function Page() {
    const itemsListRef = useRef<{ fetchItems: () => void } | null>(null)

    const handleItemAdded = () => {
        itemsListRef.current?.fetchItems()
    }

    return (
        <div className="min-h-screen bg-gray-800">
            <Toaster position="top-center" richColors />
            <div className="bg-gray-600">
                <Breadcrumb
                    pageName="Items Page"
                    description="Add items to be sold to the database"
                />
            </div>

            <CheckUserRole />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AddItem onItemAdded={handleItemAdded} />
                    <EditItems ref={itemsListRef} />
                </div>
            </div>
        </div>
    )
}