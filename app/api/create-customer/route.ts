import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST() {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { externalUserId: userId }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (user.stripeCustomerId) {
            return NextResponse.json({ customerId: user.stripeCustomerId });
        }

        // Create new stripe customer
        const customer = await stripe.customers.create({
            metadata: {
                userId: user.id,
                clerkId: userId
            }
        });

        // Update user with stripe customer id
        const updatedUser = await db.user.update({
            where: { id: user.id },
            data: { stripeCustomerId: customer.id }
        });

        return NextResponse.json({ customerId: customer.id });
    } catch (error) {
        console.error("[STRIPE_CREATE_CUSTOMER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}