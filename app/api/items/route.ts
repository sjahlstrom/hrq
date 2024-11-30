// app/api/items/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import type { Item } from '@prisma/client'  // Update type import

const purchaseItemSchema = z.object({
    productName: z.string(),
    price: z.number(),
    itemType: z.string()
})

interface ApiResponse {
    error?: string;
    details?: any;
    data?: Item;  // Update type
}

export async function POST(request: Request) {
    try {
        const rawData = await request.json()

        // Validate and parse the incoming data
        const data = purchaseItemSchema.parse(rawData)

        // Use Item model instead of purchaseItem
        const purchaseItem = await db.item.create({
            data: {
                productName: data.productName,
                price: data.price,
                itemType: data.itemType.toLowerCase()
            }
        })

        return NextResponse.json({ data: purchaseItem })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data format', details: error.errors },
                { status: 400 }
            )
        }

        console.error('Failed to create purchase item:', error)
        return NextResponse.json(
            { error: 'Failed to create purchase item' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        // Use Item model instead of purchaseItem
        const purchaseItems = await db.item.findMany()
        return NextResponse.json({ data: purchaseItems })
    } catch (error) {
        console.error('Failed to fetch purchase items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch purchase items' },
            { status: 500 }
        )
    }
}