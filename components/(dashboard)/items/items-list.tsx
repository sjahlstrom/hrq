'use client'

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { ITEM_TYPES } from '@/lib/constants'

interface Item {
    id: string
    productName: string
    price: number
    itemType: string
}

export const ItemsList = forwardRef((props, ref) => {
    const [items, setItems] = useState<Item[]>([])
    const [editingItem, setEditingItem] = useState<Item | null>(null)

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items')
            if (!response.ok) throw new Error('Failed to fetch items')
            const { data } = await response.json()
            setItems(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching items:', error)
            toast.error('Failed to load items')
            setItems([])
        }
    }

    useImperativeHandle(ref, () => ({
        fetchItems
    }))

    useEffect(() => {
        fetchItems()
    }, [])

    const handleEdit = (item: Item) => {
        setEditingItem(item)
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editingItem) return

        try {
            const response = await fetch(`/api/items/${editingItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem),
            })

            if (!response.ok) throw new Error('Failed to update item')

            const { data: updatedItem } = await response.json()
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === editingItem.id ? updatedItem : item
                )
            )

            toast.success('Item updated successfully')
            setEditingItem(null)
        } catch (error) {
            console.error('Error updating item:', error)
            toast.error('Failed to update item')
        }
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingItem) return
        const { name, value } = e.target
        setEditingItem(prev => ({
            ...prev!,
            [name]: name === 'price' ? parseFloat(value) : value,
        }))
    }

    const handleEditTypeChange = (value: string) => {
        if (!editingItem) return
        setEditingItem(prev => ({
            ...prev!,
            itemType: value,
        }))
    }

    return (
        <Card className="w-full bg-gray-500">
            <CardHeader>
                <CardTitle>Edit Items</CardTitle>
            </CardHeader>
            <CardContent>
                {Array.isArray(items) && items.length > 0 ? (
                    <div className="space-y-2">
                        {/* Header */}
                        <div className="grid grid-cols-4 gap-4 py-2 px-4 bg-gray-600 rounded-md font-semibold">
                            <div>Name</div>
                            <div>Type</div>
                            <div>Amount</div>
                            <div className="text-right">Actions</div>
                        </div>

                        {/* Items */}
                        {items.map((item) => (
                            editingItem?.id === item.id ? (
                                <form key={item.id} onSubmit={handleUpdate} className="bg-gray-700 p-4 rounded-md">
                                    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
                                        <div className="w-full">
                                            <Label htmlFor={`edit-name-${item.id}`}>Name</Label>
                                            <Input
                                                id={`edit-name-${item.id}`}
                                                name="productName"
                                                value={editingItem.productName}
                                                onChange={handleEditChange}
                                                className="bg-gray-600"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor={`edit-type-${item.id}`}>Type</Label>
                                            <Select
                                                value={editingItem.itemType}
                                                onValueChange={handleEditTypeChange}
                                            >
                                                <SelectTrigger className="bg-gray-600">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-500">
                                                    {ITEM_TYPES.map((type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type.toLowerCase()}
                                                        >
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor={`edit-price-${item.id}`}>Price</Label>
                                            <Input
                                                id={`edit-price-${item.id}`}
                                                name="price"
                                                type="number"
                                                step="0.01"
                                                value={editingItem.price}
                                                onChange={handleEditChange}
                                                className="bg-gray-600"
                                            />
                                        </div>
                                        <div className="flex justify-center space-x-2 mt-4">
                                            <Button type="submit" size="sm">
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setEditingItem(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div key={item.id} className="grid grid-cols-4 gap-4 py-2 px-4 bg-gray-700 rounded-md items-center">
                                    <div>{item.productName}</div>
                                    <div>{item.itemType}</div>
                                    <div>${item.price.toFixed(2)}</div>
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={() => handleEdit(item)}
                                            size="sm"
                                            variant="ghost"
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-300">No items found</p>
                )}
            </CardContent>
        </Card>
    )
})

ItemsList.displayName = 'ItemsList'