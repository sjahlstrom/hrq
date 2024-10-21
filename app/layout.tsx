import { arimo, laila, nunito, telex } from '@/app/ui/fonts'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Providers } from './providers'
import Footer from '@/components/Common/Footor/footer'
import Header from '@/components/Common/Header/header'
import ScrollToTop from 'components/Common/ScrollToTop'
import '@/styles/index.css'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Toaster from '@/components/ui/toast'

export const metadata: Metadata = {
    metadataBase: new URL('http://hrq.vercel.app'),
    keywords: ['hrq', 'HRQ', 'HighRQ', 'RQ', 'High Relationship Quotient', 'relationships', 'relationship skills', 'personality', 'behavior', 'good catch', 'test', 'analysis', 'psychology', 'dating'],
    title: {
        default: 'High Relationship Quotient',
        template: '%s - High Relationship Quotient'
    },
    description: 'Life is a balancing act. Find out how to get yours in balance and improve all of your relationships.',
    openGraph: {
        description: 'Life is a balancing act. Find out how to get yours in balance and improve all of your relationships.'
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html
                lang="en"
                className={`${arimo.variable} ${laila.variable} ${telex.variable} ${nunito.variable}`}
            >
            <head>
                <meta name="google-site-verification" content="-cj0V0hW2yNJy0UyKps6po3aC4vhP9WxfnwAKubM_54" />
                <title>High Relationship Quotient</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </head>
            <body>
            <Providers>
                <Header />
                {children}
                        <Analytics />
                        <SpeedInsights />
                        <Toaster />
                        <Footer />
                        <ScrollToTop />
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    )
}