'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return null
    }

    return (
        <div className="mt-auto w-full">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                <Button asChild size="lg" variant="outline" className="border-4 rounded-xl font-extrabold w-1/2 text-[#D64E30]">
                    <Link href="/sign-in">LET&apos;S GET STARTED</Link>
                </Button>
            </div>
        </div>
    )
}