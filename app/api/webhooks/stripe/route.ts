import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {

    const payload = await req.text()
    const res = JSON.parse(payload)
    const sig = req.headers.get('Stripe-Signature')

    const dateTime = new Date(res?.created * 1000).toLocaleDateString()
    const timeString = new Date(res?.created * 1000).toLocaleDateString()


    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        console.log(event, event.type)
        // charge.succeeded
        // payment_intent.succeeded
        // payment_intent.created

        // crete methods to handle the different events
        // and save data to the database

        return NextResponse.json({ status: 'success', event: event.type })
    // } catch (error) {
    //     return NextResponse.json({ status: 'error', error: error.message })
    // }
    } catch (error) {
        // Type guard to check if error is an Error object
        if (error instanceof Error) {
            return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
        } else {
            // If it's not an Error object, return a generic error message
            return NextResponse.json({ status: 'error', error: 'An unknown error occurred' }, { status: 500 })
        }
    }
}
