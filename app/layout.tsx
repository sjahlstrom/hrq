// import { ClerkProvider } from '@clerk/nextjs'
// import { dark } from '@clerk/themes'
import { arimo, laila, telex, inter } from '@/app/ui/fonts'
// import { Providers } from '@/app/providers'
// import Header from '@/components/Header/Header'
// import Footer from '@/components/Footer/Footer'
// import ScrollToTop from '@/components/ScrollToTop'
//
// export const metadata = {
//     title: 'Human Relationship Quotient',
//     description:
//         'Discover your relationship quotient and improve your dating life',
// }
//
// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     return (
//         <ClerkProvider appearance={{ baseTheme: dark }}>
//             <html
//                 lang="en"
//                 className={`${inter.variable} ${arimo.variable} ${laila.variable} ${telex.variable}`}
//             >
//                 <body className="dark:bg-green-950">
//                     <Providers>
//                         <Header />
//                         <main>{children}</main>
//                         <Footer />
//                         <ScrollToTop />
//                     </Providers>
//                 </body>
//             </html>
//         </ClerkProvider>
//     )
// }

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
                className={`${inter.variable} ${arimo.variable} ${laila.variable} ${telex.variable}`}
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
