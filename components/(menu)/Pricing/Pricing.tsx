"use client"

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PurchaseResults() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePurchase = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: '9.95' }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'An error occurred during checkout')
            }

            const { sessionId } = await response.json()
            const stripe = await stripePromise

            if (!stripe) {
                throw new Error('Failed to load Stripe')
            }

            const { error } = await stripe.redirectToCheckout({ sessionId })
            if (error) {
                throw error
            }
        } catch (error) {
            console.error('Error during checkout:', error)
            setError(error instanceof Error ? error.message : 'An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get Your Test Results</h1>
                <p className="text-gray-600 mb-6 text-center">
                    Access your comprehensive test analysis and personalized improvement suggestions for just $9.95.
                </p>
                <ul className="list-disc list-inside mb-6 text-gray-600">
                    <li>Detailed performance breakdown</li>
                    <li>Instant access to results</li>
                    <li>Downloadable PDF report</li>
                    <li>24/7 customer support</li>
                </ul>
                <div className="text-center">
                    <button
                        onClick={handlePurchase}
                        disabled={isLoading}
                        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Processing...' : 'Get Your Results ($9.95)'}
                    </button>
                    {error && (
                        <p className="mt-4 text-red-500">{error}</p>
                    )}
                </div>
            </div>
        </div>
    )
}