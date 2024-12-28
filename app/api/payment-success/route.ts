import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";

interface PurchaseItem {
    itemId: string;
    quantity: number;
}

export async function POST(req: Request) {
    try {
        // Get the auth first
        const { userId: clerkUserId } = auth();

        if (!clerkUserId) {
            console.error('Unauthorized: No clerk user ID');
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Parse and validate request body
        const body = await req.json();
        const { paymentIntentId, amount, items } = body;

        console.log('Payment success request:', {
            clerkUserId,
            paymentIntentId,
            amount,
            items,
        });

        // Validate required fields
        if (!paymentIntentId || !amount || !items || !Array.isArray(items)) {
            console.error('Missing or invalid fields:', { paymentIntentId, amount, items });
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Get internal user ID
        const user = await db.user.findUnique({
            where: { externalUserId: clerkUserId }
        });

        console.log('Found user:', user);

        if (!user) {
            console.error('User not found:', { clerkUserId });
            return new NextResponse("User not found", { status: 404 });
        }

        // Process purchase in a transaction
        const result = await db.$transaction(async (tx) => {
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

            console.log('Created purchase:', purchase);

            // Create purchase item relations
            await Promise.all(items.map(async (item: PurchaseItem) => {
                const dbItem = await tx.item.findUnique({
                    where: { id: item.itemId },
                    select: {
                        id: true,
                        price: true,
                        itemType: true
                    }
                });

                if (!dbItem) {
                    throw new Error(`Item ${item.itemId} not found`);
                }

                console.log('Found db item:', dbItem);

                return tx.purchaseItemRelation.create({
                    data: {
                        purchaseId: purchase.id,
                        itemId: item.itemId,
                        quantity: item.quantity,
                        price: dbItem.price
                    }
                });
            }));

            // Get all purchased items
            const purchasedItems = await tx.item.findMany({
                where: {
                    id: {
                        in: items.map((item: PurchaseItem) => item.itemId)
                    }
                },
                select: {
                    id: true,
                    itemType: true,
                    price: true
                }
            });

            console.log('Purchased items:', purchasedItems);

            // Prepare user updates based on purchased items
            const updateData: Record<string, boolean> = {};

            for (const item of purchasedItems) {
                console.log('Checking item type:', {
                    itemType: item.itemType,
                    lowercased: item.itemType.toLowerCase(),
                    isPaidRQ: item.itemType.toLowerCase() === 'rq'
                });

                // Check for both 'rq' and 'rq_test'
                const normalizedItemType = item.itemType.toLowerCase().trim();
                if (normalizedItemType === 'rq' || normalizedItemType === 'rq_test') {
                    updateData.paid_rq = true;
                    console.log('Setting paid_rq to true for item type:', normalizedItemType);
                }
                if (normalizedItemType === 'cq') {
                    updateData.paid_cq = true;
                }
            }

            console.log('About to update user with data:', {
                userId: user.id,
                updateData
            });

            // Update user's paid status if necessary
            if (Object.keys(updateData).length > 0) {
                const updatedUser = await tx.user.update({
                    where: { id: user.id },
                    data: updateData
                });
                console.log('User update result:', updatedUser);
            } else {
                console.log('No user updates needed');
            }

            return purchase;
        });

        // Verify the update
        const verifiedUser = await db.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                paid_rq: true,
                paid_cq: true,
                stripeCustomerId: true
            }
        });

        console.log('Final verified user status:', verifiedUser);

        return NextResponse.json({
            success: true,
            purchaseId: result.id,
            userStatus: verifiedUser
        });

    } catch (error) {
        console.error("Error processing payment:", error);
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
        return new NextResponse(
            "Internal Server Error",
            { status: 500 }
        );
    }
}