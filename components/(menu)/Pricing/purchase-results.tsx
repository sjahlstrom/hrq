"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutPage from "@/components/(stripe)/checkout"
import convertToSubcurrency from "@/lib/convert-to-subcurrency"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Replace this with your actual RQ test item ID from your database
const RQ_TEST_ITEM_ID = "rq_test"

export default function PurchaseResults({ amount }: { amount: number }) {
    return (
        <main>
            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment' as const,
                    amount: convertToSubcurrency(amount),
                    currency: 'usd',
                }}
            >
                <CheckoutPage
                    amount={amount}
                    items={[
                        {
                            itemId: RQ_TEST_ITEM_ID,
                            quantity: 1
                        }
                    ]}
                />
            </Elements>{' '}
        </main>
    )
}