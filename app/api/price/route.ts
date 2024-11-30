import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const rqItem = await db.item.findFirst({
            where: {
                itemType: 'rq',
            },
        });

        const price = rqItem?.price ?? 9.95;
        return NextResponse.json({ price: price });
    } catch (error) {
        console.error('Error fetching RQ price:', error);
        return NextResponse.json({ price: 9.95 });
    }
}