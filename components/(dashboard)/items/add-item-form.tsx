'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { ITEM_TYPES } from '@/lib/constants'

interface FormData {
    productName: string
    price: string
    itemType: string
}

interface FormErrors {
    productName?: string
    price?: string
    itemType?: string
}

interface AddItemFormProps {
    onItemAdded: () => void
}

export function AddItemForm({ onItemAdded }: AddItemFormProps) {
    const [formData, setFormData] = useState<FormData>({
        productName: '',
        price: '0.00',
        itemType: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.productName.trim()) {
            newErrors.productName = 'Product name is required'
        }

        if (!formData.price && formData.price !== '0' && formData.price !== '0.00') {
            newErrors.price = 'Price is required'
        } else if (isNaN(Number(formData.price))) {
            newErrors.price = 'Price must be a valid number'
        } else if (parseFloat(formData.price) < 0) {
            newErrors.price = 'Price cannot be negative'
        }

        if (!formData.itemType) {
            newErrors.itemType = 'Item type is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) return

        const item = {
            productName: formData.productName,
            price: parseFloat(formData.price),
            itemType: formData.itemType,
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save item')
            }

            toast.success('Item has been added successfully')
            onItemAdded()
            resetForm()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to add item'
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            productName: '',
            price: '0.00',
            itemType: '',
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleTypeChange = (value: string) => {
        setFormData(prev => ({ ...prev, itemType: value }))
        if (errors.itemType) {
            setErrors(prev => ({ ...prev, itemType: '' }))
        }
    }

    return (
        <Card className="w-full bg-gray-500">
            <CardHeader>
                <CardTitle>Add Item</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className={errors.productName ? 'border-red-500' : ''}
                            placeholder="Enter product name"
                        />
                        {errors.productName && (
                            <p className="text-sm text-red-500">{errors.productName}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="itemType">Item Type</Label>
                        <Select value={formData.itemType} onValueChange={handleTypeChange}>
                            <SelectTrigger className={errors.itemType ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select item type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-500">
                                {ITEM_TYPES.map((type) => (
                                    <SelectItem key={type} value={type.toLowerCase()}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.itemType && (
                            <p className="text-sm text-red-500">{errors.itemType}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className={errors.price ? 'border-red-500' : ''}
                            placeholder="Enter price"
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500">{errors.price}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Item'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}