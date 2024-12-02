'use client'

import { ReactNode, useEffect, useState } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // Ensure the window object is available (client-side)
        if (typeof window !== 'undefined') {
            setIsMounted(true)
            // Scroll to the top when the component mounts
            window.scrollTo({ top: 0, behavior: 'auto' })
        }
    }, [])

    if (!isMounted) return null // Prevent rendering until the client is mounted

    return (
        <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
            {children}
        </div>
    )
}

export default AuthLayout
