import ScrollUp from '@/components/Common/scroll-up'
import Hero from '@/components/Hero/hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Home"
}

export default async function Home() {

    return (
        <>
            <ScrollUp />
            <Hero />
        </>
    )
}
