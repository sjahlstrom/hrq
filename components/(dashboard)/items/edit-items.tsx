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

export interface ItemsListRef {
    fetchItems: () => Promise<void>
}

export const ItemsList = forwardRef<ItemsListRef, {}>((_, ref) => {
    const [items, setItems] = useState<Item[]>([])
    const [editingItem, setEditingItem] = useState<Item | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const fetchItems = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/items')
            if (!response.ok) throw new Error('Failed to fetch items')
            const { data } = await response.json()
            setItems(Array.isArray(data) ? data : [])
        } catch (error) {
            toast.error('Failed to load items')
            setItems([])
        } finally {
            setIsLoading(false)
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
            // For RQ_TEST items, only allow price updates
            const updateData = editingItem.itemType.toLowerCase() === 'rq_test'
                ? {
                    id: editingItem.id,
                    price: editingItem.price,
                    productName: editingItem.productName,
                    itemType: editingItem.itemType
                }
                : editingItem

            const response = await fetch(`/api/items/${editingItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update item')
            }

            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === editingItem.id ? data.data : item
                )
            )

            toast.success('Item updated successfully')
            setEditingItem(null)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update item'
            toast.error(errorMessage)
        }
    }

    const handleDelete = async (itemId: string) => {
        if (isDeleting) return

        setIsDeleting(true)
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete item')
            }

            setItems(prevItems => prevItems.filter(item => item.id !== itemId))
            toast.success('Item deleted successfully')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete item'
            toast.error(errorMessage)
        } finally {
            setIsDeleting(false)
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

    const isRQTestItem = (item: Item) => item.itemType.toLowerCase() === 'rq_test'

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Items List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-32 flex items-center justify-center">
                        <p className="text-muted-foreground">Loading items...</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Items List</CardTitle>
            </CardHeader>
            <CardContent>
                {items.length > 0 ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-4 py-2 px-4 bg-secondary/50 rounded-md font-semibold">
                            <div>Name</div>
                            <div>Type</div>
                            <div>Price</div>
                            <div className="text-right">Actions</div>
                        </div>

                        {items.map((item) => (
                            editingItem?.id === item.id ? (
                                <form
                                    key={item.id}
                                    onSubmit={handleUpdate}
                                    className="bg-secondary/20 p-4 rounded-md"
                                >
                                    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
                                        <div>
                                            <Label htmlFor={`edit-name-${item.id}`}>Name</Label>
                                            <Input
                                                id={`edit-name-${item.id}`}
                                                name="productName"
                                                value={editingItem.productName}
                                                onChange={handleEditChange}
                                                disabled={isRQTestItem(item)}
                                                title={isRQTestItem(item) ? "RQ Test items' names cannot be modified" : ""}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`edit-type-${item.id}`}>Type</Label>
                                            <Select
                                                value={editingItem.itemType}
                                                onValueChange={handleEditTypeChange}
                                                disabled={isRQTestItem(item)}
                                            >
                                                <SelectTrigger
                                                    title={isRQTestItem(item) ? "RQ Test items' types cannot be modified" : ""}
                                                >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                        <div>
                                            <Label htmlFor={`edit-price-${item.id}`}>Price</Label>
                                            <Input
                                                id={`edit-price-${item.id}`}
                                                name="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={editingItem.price}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2 pt-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setEditingItem(null)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" size="sm">
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-4 gap-4 py-3 px-4 bg-secondary/20 rounded-md items-center"
                                >
                                    <div>{item.productName}</div>
                                    <div>{item.itemType}</div>
                                    <div>${item.price.toFixed(2)}</div>
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            onClick={() => handleEdit(item)}
                                            size="sm"
                                            variant="ghost"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(item.id)}
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10 disabled:opacity-50"
                                            disabled={isDeleting || isRQTestItem(item)}
                                            title={isRQTestItem(item) ? 'RQ Test items cannot be deleted' : ''}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <p className="text-muted-foreground">No items found</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
})

ItemsList.displayName = 'ItemsList'