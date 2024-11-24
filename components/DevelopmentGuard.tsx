import { ReactNode } from 'react'
import {isDevelopment } from '@/app/utils/environment'

interface DevelopmentGuardProps {
    children: ReactNode
    fallback?: ReactNode
}

export const DevelopmentGuard = ({ children, fallback }: DevelopmentGuardProps) => {
    if (!isDevelopment) {
        return fallback || (
            <div className="flex items-center justify-center h-screen bg-custom-radial from-hrqColors-sunsetOrange-100 to-hrqColors-sunsetOrange-400 p-6">
                <div className="text-center text-black">
                    <h2 className="text-2xl font-bold mb-2">Development Mode Only</h2>
                    <p>This feature is only available in development mode.</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}