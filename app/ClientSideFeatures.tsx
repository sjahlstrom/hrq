'use client';

import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';

export function ClientSideFeatures() {
    const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if analytics consent has already been given
        const consent = localStorage.getItem('analyticsConsent');
        setAnalyticsConsent(consent === 'true');
    }, []);

    const handleConsent = () => {
        localStorage.setItem('analyticsConsent', 'true');
        setAnalyticsConsent(true);
    };

    // Don't render anything until we know the consent state
    if (analyticsConsent === null) {
        return null;
    }

    return (
        <>
            {analyticsConsent ? (
                <>
                    <Analytics />
                    <SpeedInsights />
                </>
            ) : (
                <button
                    onClick={handleConsent}
                    className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Accept Analytics
                </button>
            )}
            <Toaster position="top-center" richColors closeButton offset="80px" duration={3000} />
        </>
    );
}
