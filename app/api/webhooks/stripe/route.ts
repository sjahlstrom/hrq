import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
    typescript: true,
})

export async function POST(req: Request) {
    try {
        const { price } = await req.json()

        // Ensure price is a valid number and convert to cents
        const unitAmount = Math.round(parseFloat(price) * 100)
        if (isNaN(unitAmount) || unitAmount <= 0) {
            throw new Error('Invalid price')
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Test Results',
                            description: 'Comprehensive test analysis and personalized improvement suggestions',
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/cancel`,
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (err) {
        console.error('Error creating checkout session:', err)
        return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
    }
}