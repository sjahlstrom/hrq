import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Providers } from './providers'
import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import '../styles/index.css'

// app/layout.tsx or app/layout.jsx
import { Roboto } from '@next/font/google';

// Configure the font by specifying weights, subsets, etc.
const roboto = Roboto({
    subsets: ['latin'], // Include the subset for the font
    weight: ['400', '500', '700'], // Choose the font weights you need
    display: 'swap', // Set the font display to swap to prevent layout shift
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html suppressHydrationWarning lang="en" className={roboto.className}>
                <head>
                    {/* Add Google Font link */}
                    {/*             <link*/}
                    {/*                 href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"*/}
                    {/*                 rel="stylesheet"*/}
                    {/*             />*/}
                    <title>Human Relationship Quotient</title>
                </head>

                <body className="dark:bg-gray-700">
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

// app/layout.tsx or pages/_app.tsx depending on your project structure
// import Head from 'next/head';
// import './globals.css'; // Import global CSS if needed
//
// export const metadata = {
//     title: 'Your App Title',
//     description: 'Your App Description',
// };
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <html lang="en">
//         <Head>
//             {/* Add Google Font link */}
//             <link
//                 href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
//                 rel="stylesheet"
//             />
//         </Head>
//         <body className="font-roboto">{/* Apply font class to the body if needed */}
//         {children}
//         </body>
//         </html>
//     );
// }
