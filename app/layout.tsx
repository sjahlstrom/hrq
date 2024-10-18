import { arimo, laila, nunito, telex } from '@/app/ui/fonts'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Providers } from './providers'
import Footer from '@/components/Common/Footor/Footer'
import Header from '@/components/Common/Header/Header'
import ScrollToTop from 'components/Common/ScrollToTop'
import '@/styles/index.css'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
    metadataBase: new URL('http://hrq.vercel.app'),
    keywords: ['hrq', 'RQ', 'High Relationship Quotient', 'test', 'analysis', 'psychology', 'dating'],
    title: {
        default: 'HRQ',
        template: '%s | HRQ'
    },
    openGraph: {
        description: 'Life is a balancing act. Find out how to get yours in balance and improve all of your relationships.'
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html
                lang="en"
                className={`${arimo.variable} ${laila.variable} ${telex.variable} ${nunito.variable}`}
            >
            <head>
                <title>Human Relationship Quotient</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </head>
            <body>
            <Providers>
                <Header />
                {children}
                <Analytics />
                <SpeedInsights />
                <Footer />
                <ScrollToTop />
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    )
}