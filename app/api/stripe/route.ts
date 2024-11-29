// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
    try {
        const { items } = await request.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: `${request.nextUrl.origin}/success`,
            cancel_url: `${request.nextUrl.origin}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error) {
        // Explicitly name the error object
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
