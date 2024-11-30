// app/api/payment-success/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface PurchaseItem {
    itemId: string;
    quantity: number;
}

export async function POST(req: Request) {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        console.log('Received request body:', body); // Debug log

        const { paymentIntentId, amount, items } = body;

        // Validate required fields
        if (!paymentIntentId || !amount || !items || !Array.isArray(items)) {
            console.error('Missing or invalid required fields:', { paymentIntentId, amount, items });
            return new NextResponse(
                "Missing required fields",
                { status: 400 }
            );
        }

        // Get the internal user ID from the external user ID
        const user = await db.user.findUnique({
            where: { externalUserId: clerkUserId }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Start a transaction to ensure all database operations succeed or fail together
        const result = await db.$transaction(async (tx) => {
            console.log('Creating purchase for items:', items); // Debug log

            // Create the purchase record
            const purchase = await tx.purchase.create({
                data: {
                    userId: user.id,
                    amount,
                    paymentIntentId,
                    status: "completed",
                    purchaseDate: new Date(),
                }
            });

            // Create purchase item relations
            if (items.length > 0) {
                await Promise.all(items.map(async (item: PurchaseItem) => {
                    const dbItem = await tx.item.findUnique({
                        where: { id: item.itemId }
                    });

                    if (!dbItem) {
                        throw new Error(`Item ${item.itemId} not found`);
                    }

                    return tx.purchaseItemRelation.create({
                        data: {
                            purchaseId: purchase.id,
                            itemId: item.itemId,
                            quantity: item.quantity,
                            price: dbItem.price
                        }
                    });
                }));
            }

            // Update user's paid status based on purchased items
            const purchasedItems = await tx.item.findMany({
                where: {
                    id: {
                        in: items.map((item: PurchaseItem) => item.itemId)
                    }
                }
            });

            const updateData: Record<string, boolean> = {};

            for (const item of purchasedItems) {
                if (item.itemType === 'RQ') {
                    updateData.paid_rq = true;
                }
                if (item.itemType === 'CQ') {
                    updateData.paid_cq = true;
                }
            }

            if (Object.keys(updateData).length > 0) {
                await tx.user.update({
                    where: { id: user.id },
                    data: updateData
                });
            }

            return purchase;
        });

        return NextResponse.json({
            success: true,
            purchaseId: result.id
        });
    } catch (error) {
        console.error("Error processing successful payment:", error);
        // Add more detailed error logging
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
        }
        return new NextResponse(
            "Internal Server Error",
            { status: 500 }
        );
    }
}