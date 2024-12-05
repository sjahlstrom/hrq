'use client'

import React, { useRef } from 'react'
import { AddItem } from '@/components/(dashboard)/items/add-item'
import {
    EditItemsList,
    type ItemsListRef,
} from '@/components/(dashboard)/items/edit-items'
import Breadcrumb from '@/components/common/bread-crumb'

export default function Page() {
    const itemsListRef = useRef<ItemsListRef>(null)

    const handleItemAdded = async () => {
        await itemsListRef.current?.fetchItems()
    }

    return (
        <div className="bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-800 ">
            <Breadcrumb pageName="Item Management" description="" />
            <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AddItem onItemAdded={handleItemAdded} />
                    <EditItemsList ref={itemsListRef} />
                </div>
            </div>
        </div>
    )
}
