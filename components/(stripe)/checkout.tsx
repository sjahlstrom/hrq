"use client";

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convert-to-subcurrency";
import { Button } from '@/components/ui/button';

interface CheckoutPageProps {
    amount: number;
    onSuccess?: () => void;
}

const CheckoutPage = ({ amount, onSuccess }: CheckoutPageProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/createPaymentIntent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                console.error("Error creating payment intent:", error);
                setErrorMessage("Failed to initialize payment. Please try again.");
            });
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(undefined);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/success?amount=${amount}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message);
            console.error("Payment error:", error);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment successful and no redirect was required
            onSuccess?.();
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center p-8">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Your Purchase</h2>

                {clientSecret && (
                    <div className="space-y-4">
                        <PaymentElement />

                        {errorMessage && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            disabled={!stripe || loading}
                            className="w-full p-5 bg-gray-900 hover:bg-gray-800 text-white rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            type="submit"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <span className="mr-2">Processing...</span>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                </span>
                            ) : (
                                `Pay $${amount.toFixed(2)}`
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default CheckoutPage;