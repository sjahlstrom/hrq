import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import CheckoutPage from '@/components/(stripe)/checkout';
import convertToSubcurrency from '@/lib/convert-to-subcurrency';
import { getRQTestItem } from '@/lib/price-utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PriceCard = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [amount, setAmount] = useState<number>(9.95);
    const [itemId, setItemId] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const testItem = await getRQTestItem();
            if (testItem) {
                setAmount(testItem.price);
                setItemId(testItem.id);
            }
        };

        fetchData();
    }, []);

    const handleSuccess = () => {
        router.push(`/success?amount=${amount}`);
    };

    return (
        <section
            id="Pricing"
            className="bg-gradient-to-b from-hrqColors-slateBlue-400 to-hrqColors-slateBlue-200 py-16 md:py-24 lg:py-32 min-h-screen"
        >
            <div className="flex flex-col space-y-8">
                {!showCheckout ? (
                    <div className="flex flex-col mt-12 md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                        <div className="p-8 md:w-2/3">
                            <h2 className="text-3xl font-bold text-gray-900">Exclusive Offer</h2>
                            <p className="mt-4 text-gray-600">
                                Get access to your comprehensive test analysis and personalized improvement suggestions.
                                Your results will always be available to you anytime you log in.
                            </p>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-red-600 mb-3">WHAT&apos;S INCLUDED</h3>
                                <ul className="space-y-3 text-black">
                                    <li className="flex items-center">
                                        <span>Access to your in-depth test analysis</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span>Lifetime access</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span>Mobile and web access</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 md:w-1/3 flex flex-col items-center justify-center">
                            {amount !== 9.95 ? (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-900">Limited Time Offer</h3>
                                    <p className="text-sm text-gray-400 line-through mb-1">$9.95</p>
                                    <p className="text-3xl text-red-600 mb-1">${amount.toFixed(2)}</p>
                                </>
                            ) : (
                                <p className="text-3xl text-red-600 mb-1">${amount.toFixed(2)}</p>
                            )}

                            <Button
                                className="mt-4 bg-gray-900 text-white text-lg font-medium py-2 px-4 rounded-lg hover:bg-gray-700"
                                onClick={() => setShowCheckout(true)}
                            >
                                Get Exclusive Access
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-[600px]">
                        <div className="w-[700px] h-[680px] bg-white rounded-lg shadow-xl overflow-hidden">
                            <div className="w-full h-full flex flex-col">
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                                    <h2 className="text-white text-xl font-bold text-center">Complete Purchase to Access Your Results</h2>
                                </div>

                                {/* Card Content */}
                                <div className="flex-grow p-6">
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
                                            onSuccess={handleSuccess}
                                        />
                                    </Elements>
                                </div>

                                {/* Card Footer */}
                                <div className="px-6 pb-4 text-sm text-gray-500 text-center">
                                    Secure payment powered by Stripe
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PriceCard;