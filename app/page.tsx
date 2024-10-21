import ScrollUp from '@/components/Common/scroll-up'
import Hero from '@/components/Hero/hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Home Page"
}

export default async function Home() {

    return (
        <>
            <head>
                <meta name="google-site-verification" content="-cj0V0hW2yNJy0UyKps6po3aC4vhP9WxfnwAKubM_54" />
                <title>High Relationship Quotient</title>
                <ScrollUp />
                <Hero />
            </head>
        </>
    )
}
