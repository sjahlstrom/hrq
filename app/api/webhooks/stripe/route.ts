import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        // Parse the request payload
        const payload = await req.text();
        const response = JSON.parse(payload);

        // Get Stripe signature from headers
        const sig = req.headers.get("Stripe-Signature");

        // Convert timestamps to human-readable date strings
        const dateTime = new Date(response?.created * 1000).toLocaleDateString();
        const timeString = new Date(response?.created * 1000).toLocaleDateString();

        // Construct the Stripe webhook event
        const event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        // Log the event type and return a success response
        console.log("event", event.type);
        return NextResponse.json({ status: "Success", eventType: event.type });
    } catch (error) {
        // Handle any errors that occur during processing
        console.error("Error processing webhook", error);
        return NextResponse.json({ status: "Failed", error: error.message });
    }
}

export const runtime = "edge";
