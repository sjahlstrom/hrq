'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ITEM_TYPES } from '@/lib/constants';
import { Pencil, Trash2, Loader2 } from 'lucide-react';

interface Item {
    id: string;
    productName: string;
    price: number;
    itemType: string;
}

export interface ItemsListRef {
    fetchItems: () => Promise<void>;
}

export const EditItemsList = forwardRef<ItemsListRef, {}>((_, ref) => {
    const [items, setItems] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/items');
            if (!response.ok) throw new Error('Failed to fetch items');
            const { data } = await response.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to load items');
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchItems,
    }));

    useEffect(() => {
        fetchItems();
    }, []);

    const handleEdit = (item: Item) => {
        setEditingItem(item);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingItem) return;

        try {
            const updateData =
                editingItem.itemType.toLowerCase() === 'rq_test'
                    ? {
                        id: editingItem.id,
                        price: editingItem.price,
                        productName: editingItem.productName,
                        itemType: editingItem.itemType,
                    }
                    : editingItem;

            const response = await fetch(`/api/items/${editingItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update item');
            }

            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === editingItem.id ? data.data : item
                )
            );

            toast.success('Item updated successfully');
            setEditingItem(null);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Failed to update item';
            toast.error(errorMessage);
        }
    };

    const handleDelete = async (itemId: string) => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete item');
            }

            setItems((prevItems) =>
                prevItems.filter((item) => item.id !== itemId)
            );
            toast.success('Item deleted successfully');
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Failed to delete item';
            toast.error(errorMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingItem) return;
        const { name, value } = e.target;
        setEditingItem((prev) => ({
            ...prev!,
            [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    const handleEditTypeChange = (value: string) => {
        if (!editingItem) return;
        setEditingItem((prev) => ({
            ...prev!,
            itemType: value,
        }));
    };

    const isRQTestItem = (item: Item) =>
        item.itemType.toLowerCase() === 'rq_test';

    if (isLoading) {
        return (
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Items List</CardTitle>
                    <CardDescription>Manage your inventory items</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center">
                        <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Loading items...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-hrqColors-sunsetOrange-500 bg-hrqColors-coolGray-600 shadow-md">
            <CardHeader>
                <CardTitle className="text-dark text-2xl">Items List</CardTitle>
                <CardDescription className="text-dark">Manage your inventory items</CardDescription>
            </CardHeader>
            <CardContent>
                {items.length > 0 ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-muted rounded-lg font-medium text-sm border-dark">
                            <div className="text-dark">Product</div>
                            <div className="text-dark">Type</div>
                            <div className="text-dark">Price</div>
                            <div className="text-dark text-right">Actions</div>
                        </div>

                        <div className="space-y-2">
                            {items.map((item) =>
                                editingItem?.id === item.id ? (
                                    <form
                                        key={item.id}
                                        onSubmit={handleUpdate}
                                        className="border border-dark bg-card p-4 rounded-lg shadow-sm"
                                    >
                                        <div className="flex flex-col space-y-4">
                                            <div>
                                                <Label
                                                    htmlFor={`edit-name-${item.id}`}
                                                    className="text-sm font-medium"
                                                >
                                                    Name
                                                </Label>
                                                <Input
                                                    id={`edit-name-${item.id}`}
                                                    name="productName"
                                                    value={editingItem?.productName || ''}
                                                    onChange={handleEditChange}
                                                    disabled={isRQTestItem(item)}
                                                    title={
                                                        isRQTestItem(item)
                                                            ? "RQ Test items' names cannot be modified"
                                                            : ''
                                                    }
                                                    className="h-9 mt-1.5 border-dark"
                                                    placeholder="Enter product name"
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor={`edit-type-${item.id}`}
                                                    className="text-sm font-medium"
                                                >
                                                    Type
                                                </Label>
                                                <Select
                                                    value={editingItem?.itemType || ''}
                                                    onValueChange={handleEditTypeChange}
                                                    disabled={isRQTestItem(item)}
                                                >
                                                    <SelectTrigger
                                                        className="h-9 mt-1.5 border-dark"
                                                        title={
                                                            isRQTestItem(item)
                                                                ? 'RQ Test items\' types cannot be modified'
                                                                : ''
                                                        }
                                                    >
                                                        <SelectValue placeholder="Select item type" />
                                                    </SelectTrigger>
                                                    <SelectContent
                                                        className="bg-hrqColors-coolGray-700 border-dark shadow-md">
                                                        {ITEM_TYPES.map((type) => (
                                                            <SelectItem
                                                                key={type}
                                                                value={type.toLowerCase()}
                                                                className="hover:bg-accent focus:bg-accent"
                                                            >
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor={`edit-price-${item.id}`}
                                                    className="text-sm font-medium"
                                                >
                                                    Price
                                                </Label>
                                                <div className="relative mt-1.5">
                                                    <span className="absolute left-3 top-2 text-muted-foreground">
                                                        $
                                                    </span>
                                                    <Input
                                                        id={`edit-price-${item.id}`}
                                                        name="price"
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={editingItem.price}
                                                        onChange={handleEditChange}
                                                        className="pl-6 h-9 border-dark"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-2 pt-2">
                                                <Button
                                                    className="mt-4 bg-red-700 text-white text-lg font-medium py-2 px-4 rounded-full hover:bg-gray-700"

                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setEditingItem(null)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className="mt-4 bg-green-500 text-white text-lg font-medium py-2 px-4 rounded-full hover:bg-gray-700"
                                                >

                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-4 gap-4 px-4 py-3 bg-card hover:bg-accent/5 border border-dark rounded-lg items-center transition-colors"
                                    >
                                        <div className="font-medium">{item.productName}</div>
                                        <div className="text-muted-foreground">{item.itemType}</div>
                                        <div className="text-muted-foreground">
                                            ${item.price.toFixed(2)}
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <Button
                                                onClick={() => handleEdit(item)}
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-green-600  hover:bg-transparent"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>

                                            <Button
                                                onClick={() => handleDelete(item.id)}
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-red-800 hover:text-red-600 hover:bg-transparent disabled:opacity-50"
                                                disabled={isDeleting || isRQTestItem(item)}
                                                title={
                                                    isRQTestItem(item)
                                                        ? 'RQ Test items cannot be deleted'
                                                        : ''
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="py-12 text-center bg-muted/20 rounded-lg border border-dashed border-dark">
                        <p className="text-muted-foreground">No items found</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
});

EditItemsList.displayName = 'EditItemsList';
