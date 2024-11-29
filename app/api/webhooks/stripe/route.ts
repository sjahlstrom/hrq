import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        const payload = await req.text();
        const sig = req.headers.get('stripe-signature')!;

        let event;

        try {
            // Verify the webhook signature
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            );

            // console.log("----------------------------------------------------------")
            // // Log the full event
            // console.log('Stripe webhook event:', JSON.stringify(event, null, 2));
            // // Log specific parts of the event
            // console.log('Event type:', event.type);
            // console.log('Event data:', event.data.object);

            // Handle different event types
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object as Stripe.PaymentIntent;
                    // console.log('PaymentIntent details:', {
                    //     id: paymentIntent.id,
                    //     amount: paymentIntent.amount,
                    //     status: paymentIntent.status,
                    //     customer: paymentIntent.customer,
                    // });
                    break;

                case 'checkout.session.completed':
                    const session = event.data.object as Stripe.Checkout.Session;
                    // console.log('Checkout session details:', {
                    //     id: session.id,
                    //     customer: session.customer,
                    //     amount_total: session.amount_total,
                    //     payment_status: session.payment_status,
                    // });
                    break;
            }

            return new Response(JSON.stringify({ received: true }), {
                status: 200,
            });

        } catch (err) {
            console.error('Error verifying webhook:', err);
            return new Response(
                JSON.stringify({ error: 'Webhook signature verification failed' }),
                { status: 400 }
            );
        }

    } catch (err) {
        console.error('Error processing webhook:', err);
        return new Response(
            JSON.stringify({ error: 'Error processing webhook' }),
            { status: 400 }
        );
    }
}