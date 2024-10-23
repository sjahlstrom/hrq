import ScrollUp from '@/components/Common/scroll-up'
import Hero from '@/components/Hero/hero'
import CTA from '@/components/CTA/cta'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Home - High Relationship Quotient",
    description: "Discover how to improve your relationships and find balance in life with High Relationship Quotient.",
}

export default function Home() {
    return (
        <>
            <Hero />
            <CTA />
            <ScrollUp />
        </>
    )
}