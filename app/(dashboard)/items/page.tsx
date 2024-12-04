'use client'

import { useRef } from 'react'
import CheckUserRole from '@/components/check-user-role'
import { AddItem } from '@/components/(dashboard)/items/add-item'
import { ItemsList, type ItemsListRef } from '@/components/(dashboard)/items/edit-items'

export default function Page() {
    const itemsListRef = useRef<ItemsListRef>(null)

    const handleItemAdded = async () => {
        await itemsListRef.current?.fetchItems()
    }

    return (
        <div className="container mx-auto">
            <div className="py-8">
                <h1 className="text-2xl font-bold mb-8">Items Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AddItem onItemAdded={handleItemAdded} />
                    <ItemsList ref={itemsListRef} />
                </div>
            </div>
        </div>
    )
}