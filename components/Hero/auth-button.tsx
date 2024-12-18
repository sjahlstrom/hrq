'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return null
    }

    // return (
    //     <div className="-mt-[340px] w-full">
    //         <div className="justify-center">
    //             <Button asChild size="lg" variant="outline" className="border-4 rounded-xl font-extrabold w-full text-hrqColors-sunsetOrange-600">
    //                 <Link href="/sign-in">LET&apos;S GET STARTED</Link>
    //             </Button>
    //         </div>
    //     </div>
    // )
}