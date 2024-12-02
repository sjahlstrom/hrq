import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const item = await db.item.findUnique({
            where: { id },
            select: {
                id: true,
                productName: true,
                itemType: true,
                price: true
            }
        });

        if (!item) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: item });
    } catch (error) {
        console.error('Failed to fetch item:', error);
        return NextResponse.json(
            { error: 'Failed to fetch item' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const data = await request.json();

        const updatedItem = await db.item.update({
            where: { id },
            data: {
                productName: data.productName,
                price: data.price,
                itemType: data.itemType,
            },
        });

        return NextResponse.json({ data: updatedItem });
    } catch (error) {
        console.error('Failed to update item:', error);
        return NextResponse.json(
            { error: 'Failed to update item' },
            { status: 500 }
        );
    }
}

// app/api/items/[id]/route.ts - Update the DELETE handler

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // First check if this is an RQ Test item
        const item = await db.item.findUnique({
            where: { id },
            select: {
                productName: true,
                itemType: true
            }
        });

        if (!item) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        // Prevent deletion of RQ Test items
        if (item.itemType.toLowerCase() === 'rq_test') {
            return NextResponse.json(
                { error: 'RQ Test items cannot be deleted' },
                { status: 403 }
            );
        }

        await db.item.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: 'Item deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Failed to delete item:', error);
        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        );
    }
}