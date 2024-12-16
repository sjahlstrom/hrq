'use client';

import { ChangeEvent, FormEvent, useState } from 'react'
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

interface FormData {
    productName: string;
    price: string;
    itemType: string;
}

interface FormErrors {
    productName?: string;
    price?: string;
    itemType?: string;
}

interface AddItemProps {
    onItemAdded: () => Promise<void>;
}

const initialFormState: FormData = {
    productName: '',
    price: '0.00',
    itemType: '',
};

export function AddItem({ onItemAdded }: AddItemProps) {
    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.productName.trim()) {
            newErrors.productName = 'Product name is required';
        }

        if (!formData.price && formData.price !== '0' && formData.price !== '0.00') {
            newErrors.price = 'Price is required';
        } else if (isNaN(Number(formData.price))) {
            newErrors.price = 'Price must be a valid number';
        } else if (parseFloat(formData.price) < 0) {
            newErrors.price = 'Price cannot be negative';
        }

        if (!formData.itemType) {
            newErrors.itemType = 'Item type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        const item = {
            productName: formData.productName,
            price: parseFloat(formData.price),
            itemType: formData.itemType,
        };

        // Prevent duplicate `rq_test`
        if (formData.itemType === 'rq_test') {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error('Failed to fetch existing items');
                }

                const existingItems = await response.json();
                const duplicate = existingItems.some(
                    (existingItem: { itemType: string }) =>
                        existingItem.itemType === 'rq_test'
                );

                if (duplicate) {
                    toast.error("An item with 'rq_test' type already exists.");
                    resetForm();
                    return;
                }
            } catch (error) {
                toast.error('Failed to check for duplicates. Please try again.');
                resetForm();
                return;
            }
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save item');
            }

            toast.success('Item added successfully');
            resetForm();
            await onItemAdded();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred'
            );
            resetForm();
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleTypeChange = (value: string) => {
        setFormData((prev) => ({ ...prev, itemType: value }));
        if (errors.itemType) {
            setErrors((prev) => ({ ...prev, itemType: '' }));
        }
    };

    return (
        <Card className="border-hrqColors-sunsetOrange-500 bg-hrqColors-coolGray-600 shadow-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-dark text-2xl">Add Item</CardTitle>
                <CardDescription className="text-dark">
                    Add a new item to your inventory
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="productName"
                            className="text-dark text-sm font-medium"
                        >
                            Product Name
                        </Label>
                        <Input
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className={`h-10 ${
                                errors.productName ? 'border-destructive' : 'border-dark'
                            }`}
                            placeholder="Enter product name"
                        />
                        {errors.productName && (
                            <p className="text-sm font-medium text-destructive">
                                {errors.productName}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="itemType"
                            className="text-dark text-sm font-medium"
                        >
                            Item Type
                        </Label>
                        <Select
                            value={formData.itemType}
                            onValueChange={handleTypeChange}
                        >
                            <SelectTrigger
                                className={`h-10 ${
                                    errors.itemType
                                        ? 'border-destructive'
                                        : 'border-dark'
                                }`}
                            >
                                <SelectValue placeholder="Select item type" />
                            </SelectTrigger>
                            <SelectContent className="bg-hrqColors-coolGray-700 border-dark shadow-md">
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
                        {errors.itemType && (
                            <p className="text-sm font-medium text-destructive">
                                {errors.itemType}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="price"
                            className="text-dark text-sm font-medium"
                        >
                            Price
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">
                                $
                            </span>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className={`pl-6 h-10 ${
                                    errors.price ? 'border-destructive' : 'border-dark'
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.price && (
                            <p className="text-sm font-medium text-destructive">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 bg-dark text-white text-lg font-medium py-2 px-4 rounded-full hover:bg-gray-700"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center space-x-2">
                                <span className="animate-pulse">Adding item...</span>
                            </span>
                        ) : (
                            'Add Item'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
