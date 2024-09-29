import { nunito, palanquin, arimo, laila, telex, inter } from '@/app/ui/fonts'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Providers } from './providers'
import React from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import ScrollToTop from '@/components/ScrollToTop'
import '../styles/index.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html
                lang="en"
                className={`${inter.variable} ${arimo.variable} ${laila.variable} ${telex.variable} ${nunito.variable}`}
            >
                <head>
                    <title>Human Relationship Quotient</title>
                </head>

                <body>
                    <Providers>
                        <Header />
                        {children}
                        <Footer />
                        <ScrollToTop />
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    )
}
