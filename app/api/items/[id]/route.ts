import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import type { Item } from '@prisma/client'

const updateItemSchema = z.object({
    productName: z.string(),
    price: z.number(),
    itemType: z.string()
})

interface ApiResponse {
    error?: string;
    details?: any;
    data?: Item;
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const rawData = await request.json()

        // Validate and parse the incoming data
        const data = updateItemSchema.parse(rawData)

        // Check if item exists
        const existingItem = await db.item.findUnique({
            where: { id }
        })

        if (!existingItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            )
        }

        // Update the item
        const updatedItem = await db.item.update({
            where: { id },
            data: {
                productName: data.productName,
                price: data.price,
                itemType: data.itemType.toLowerCase()
            }
        })

        return NextResponse.json({ data: updatedItem })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data format', details: error.errors },
                { status: 400 }
            )
        }

        console.error('Failed to update item:', error)
        return NextResponse.json(
            { error: 'Failed to update item' },
            { status: 500 }
        )
    }
}