'use client'

import { useRef } from 'react'
import { AddItem } from '@/components/(dashboard)/items/add-item'
import { ItemsList, type ItemsListRef } from '@/components/(dashboard)/items/edit-items'

export default function ItemsManagement() {
    const itemsListRef = useRef<ItemsListRef>(null)

    const handleItemAdded = async () => {
        await itemsListRef.current?.fetchItems()
    }

    return (
        <div className="space-y-6 p-6">
            <AddItem onItemAdded={handleItemAdded} />
            <ItemsList ref={itemsListRef} />
        </div>
    )
}