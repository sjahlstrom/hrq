// app/api/items/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import type { Item } from '@prisma/client'

const itemSchema = z.object({
    productName: z.string(),
    price: z.number(),
    itemType: z.string()
})

interface ApiResponse {
    error?: string;
    details?: any;
    data?: Item | Item[];
}

export async function POST(request: Request) {
    try {
        const rawData = await request.json()

        // Validate and parse the incoming data
        const data = itemSchema.parse(rawData)

        // Check if RQ Test item already exists
        if (data.productName === 'RQ Test') {
            const existingTest = await db.item.findFirst({
                where: { productName: 'RQ Test' }
            });

            if (existingTest) {
                return NextResponse.json(
                    { error: 'RQ Test item already exists' },
                    { status: 400 }
                );
            }
        }

        const item = await db.item.create({
            data: {
                productName: data.productName,
                price: data.price,
                itemType: data.itemType.toLowerCase()
            }
        })

        return NextResponse.json({ data: item })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data format', details: error.errors },
                { status: 400 }
            )
        }

        console.error('Failed to create item:', error)
        return NextResponse.json(
            { error: 'Failed to create item' },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    try {
        // Get search parameters
        const { searchParams } = new URL(request.url);
        const filter = searchParams.get('filter');

        // Base query
        let where = {};

        // If filtering for RQ Test specifically
        if (filter === 'rq_test') {
            where = { productName: 'RQ Test' };
        }

        const items = await db.item.findMany({ where })
        return NextResponse.json({ data: items })
    } catch (error) {
        console.error('Failed to fetch items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch items' },
            { status: 500 }
        )
    }
}