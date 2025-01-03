import { arimo, laila, nunito, telex } from '@/app/ui/fonts';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from './providers';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import ScrollToTop from '@/components/common/ScrollToTop';
import { ClientSideFeatures } from '@/app/ClientSideFeatures';

import '@/styles/index.css';

export const metadata = {
    metadataBase: new URL('https://hrq.vercel.app'),
    title: 'High Relationship Quotient - Find Your Ideal Partner',
    description: 'Ready to find your ideal partner? Learn more about gaining a High Relationship Quotient.',
    openGraph: {
        title: 'High Relationship Quotient',
        description: 'Ready to find your ideal partner? Learn more about gaining a High Relationship Quotient.',
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
        description: 'Ready to find your ideal partner? Learn more about gaining a High Relationship Quotient.',
        images: ['https://hrq.vercel.app/twitter-image.jpg'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html
                lang="en"
                className={`${arimo.variable} ${laila.variable} ${telex.variable} ${nunito.variable}`}
            >
            <body className="min-h-screen flex flex-col">
            <Providers>
                <Header />
                <main className="flex-1" role="main" aria-label="Main content">
                    {children}
                </main>
                <Footer />
                <ScrollToTop />
                <ClientSideFeatures />
            </Providers>
            </body>
            </html>
        </ClerkProvider>
    );
}
