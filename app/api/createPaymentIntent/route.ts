// app/api/createPaymentIntent/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server'
import { db } from "@/lib/db/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { amount } = await request.json();

        // Get user from database with paid_rq status
        const user = await db.user.findUnique({
            where: { externalUserId: userId },
            select: {
                id: true,
                stripeCustomerId: true,
                paid_rq: true
            }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Check if user has already paid for RQ
        if (user.paid_rq) {
            return new NextResponse(
                JSON.stringify({
                    error: "You have already purchased this item.",
                    code: "ALREADY_PURCHASED"
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
        }

        // Create or get Stripe customer
        let stripeCustomerId = user.stripeCustomerId;

        if (!stripeCustomerId) {
            try {
                const customer = await stripe.customers.create({
                    metadata: {
                        userId: user.id,
                        clerkId: userId
                    }
                });

                await db.user.update({
                    where: { id: user.id },
                    data: { stripeCustomerId: customer.id }
                });

                stripeCustomerId = customer.id;
            } catch (error) {
                console.error('Error creating Stripe customer:', error);
                return new NextResponse(
                    "Failed to create Stripe customer",
                    { status: 500 }
                );
            }
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            customer: stripeCustomerId,
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            customerId: stripeCustomerId
        });

    } catch (error) {
        console.error("[PAYMENT_INTENT]", error);
        return new NextResponse(
            "Internal Error",
            { status: 500 }
        );
    }
}