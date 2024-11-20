import { arimo, laila, nunito, telex } from '@/app/ui/fonts'
import { ClerkProvider } from '@clerk/nextjs'

import { Providers } from './providers'
import Footer from '@/components/common/Footer/footer'
import Header from '@/components/common/Header/header'
import ScrollToTop from '@/components/common/ScrollToTop'
import '@/styles/index.css'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'

import Toaster from '@/components/ui/toast'
import React from 'react'

export const metadata: Metadata = {
    metadataBase: new URL('https://hrq.vercel.app'),
    keywords: ['hrq', 'HRQ', 'HighRQ', 'RQ', 'CQ', 'cq', 'High Relationship Quotient', 'relationships', 'relationship skills', 'personality', 'behavior', 'good catch', 'test', 'analysis', 'psychology', 'dating'],
    title: {
        default:
            'High Relationship Quotient (Hi ghRQ)- Improve your relationships. Life is a balancing act. Find out how to get yours in balance and improve all of your relationships, work, social, romance.',
        template: '%s - High Relationship Quotient',
    },
    alternates: {
        canonical: '/',
    },
    description:
        'Life is a balancing act. Find out how to get yours in balance and improve all of your relationships, work, social, romance.',
    openGraph: {
        title: 'High Relationship Quotient',
        description:
            'Life is a balancing act. Find out how to get yours in balance and improve all of your relationships, work, social, romance.',
        url: 'https://hrq.vercel.app',
        siteName: 'High Relationship Quotient',
        images: [
            {
                url: 'https://hrq.vercel.app/og-image.jpg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'High Relationship Quotient',
        description:
            'Life is a balancing act. Find out how to get yours in balance and improve all of your relationships, work, social, romance.',
        images: ['https://hrq.vercel.app/twitter-image.jpg'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            appearance={{
                signIn: {
                    variables: {
                        colorPrimary: 'blue',
                        colorText: 'black',
                    },
                },
                signUp: {
                    variables: {
                        colorPrimary: 'blue',
                        colorText: 'black',
                    },
                },
            }}
        >
            <html
                lang="en"
                className={`${arimo.variable} ${laila.variable} ${telex.variable} ${nunito.variable}`}
            >
            <head>
                <meta name="msvalidate.01" content="F02FCA37DF842444933379AF9833B97C" />
                <meta
                    name="google-site-verification"
                    content="-cj0V0hW2yNJy0UyKps6po3aC4vhP9WxfnwAKubM_54"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link
                    rel="alternate"
                    href="https://hrq.vercel.app/"
                    hrefLang="en"
                />
                <meta name="robots" content="all" />
                <title>
                    High Relationship Quotient - Life is a balancing act.
                </title>
            </head>
            <body className="min-h-screen flex flex-col">
            <Providers>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <ScrollToTop />
                        <Analytics />
                        <SpeedInsights />
                        <GoogleAnalytics gaId="G-Y8VHLZ4JB8" />

                        <Toaster />
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    )
}