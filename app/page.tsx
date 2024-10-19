import ScrollUp from '@/components/Common/ScrollUp'
import Hero from '@/components/Hero/Hero'
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
