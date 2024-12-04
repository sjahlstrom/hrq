'use client'

import { useRef } from 'react'
import { AddItem } from '@/components/(dashboard)/items/add-item'
import { EditItems } from '@/components/(dashboard)/items/edit-items'
import type { ItemsListRef } from '@/components/(dashboard)/items/edit-items'

export default function ItemsManagement() {
    const itemsListRef = useRef<ItemsListRef>(null)

    const handleItemAdded = () => {
        itemsListRef.current?.fetchItems()
    }

    return (
        <div className="space-y-6 p-6">
            <AddItem onItemAdded={handleItemAdded} />
            <EditItems ref={itemsListRef} />
        </div>
    )
}