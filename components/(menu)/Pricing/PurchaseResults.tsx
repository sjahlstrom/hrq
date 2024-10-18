'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/(stripe)/CheckoutPage'
import convertToSubcurrency from '@/lib/convertToSubcurrency'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const PurchaseResults = () => {
    const amount = 9.95
    return (
        <main className="max-w-6xl mx-auto p-20 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">

            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertToSubcurrency(amount),
                    currency: 'usd',
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>{' '}
        </main>
    )
}

export default PurchaseResults