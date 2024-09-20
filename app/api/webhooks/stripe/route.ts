import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const testId = session?.metadata?.testId;
    const amount = session?.metadata?.amount;

    if (event.type === "checkout.session.completed") {
        if(!userId || !testId) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }

        const amount = parseFloat(session?.metadata?.amount) || 0;

        await db.purchase.create({
            data: {
                testId: testId,
                userId: userId,
                amount: amount
            }
        });
    } else {
        return new NextResponse(`Webhook Error: Unsupported event type ${event.type}`, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
}