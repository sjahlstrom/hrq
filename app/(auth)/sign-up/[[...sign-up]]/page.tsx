'use client'

import {SignUp } from '@clerk/nextjs'
import AuthLayout from '@/app/(auth)/_components/AuthLayout'

export default function SignUpPage() {

    return (
        <AuthLayout>
            <SignUp />
        </AuthLayout>
    )
}
