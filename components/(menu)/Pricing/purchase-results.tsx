"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import CheckoutPage from "@/components/(stripe)/checkout"
import convertToSubcurrency from "@/lib/convert-to-subcurrency"
import { getRQTestItem } from "@/lib/price-utils"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PurchaseResults({ amount }: { amount: number }) {
    const [itemId, setItemId] = useState<string>('');

    useEffect(() => {
        const fetchItem = async () => {
            const testItem = await getRQTestItem();
            if (testItem) {
                setItemId(testItem.id);
            }
        };

        fetchItem();
    }, []);

    if (!itemId) {
        return <div>Loading...</div>; // Or your preferred loading state
    }

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
                            itemId: itemId,
                            quantity: 1
                        }
                    ]}
                />
            </Elements>
        </main>
    )
}