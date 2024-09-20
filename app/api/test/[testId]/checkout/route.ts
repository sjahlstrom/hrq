import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(
    req: Request,
    { params }: { params: { testId: string } }
) {
    try {
        const user = await currentUser()
        if (!user || !user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const test = await db.test.findUnique({
            where: {
                id: params.testId,
            },
        })

        const purchase = await db.purchase.findFirst({
            where: {
                userId: user.id,
                testId: params.testId,
            },
        });

        if (purchase) {
            return new NextResponse('Already purchased', { status: 400 })
        }

        if (!test) {
            return new NextResponse('Course not found', { status: 404 })
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: test.title,
                    },
                    unit_amount: Math.round(test.price! * 995),
                },
            },
        ]

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
            },
        })

        if (!stripeCustomer) {
            // might get error for this email call
            const customer = await stripe.customers.create({
                email: user.primaryEmailAddressId,
            })

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                },
            })
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${test.id}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
            metadata: {
                courseId: test.id,
                userId: user.id,
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.log('[COURSE_ID_CHECKOUT]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
