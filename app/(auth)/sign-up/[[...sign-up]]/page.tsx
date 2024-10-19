import AuthLayout from '@/app/(auth)/_components/AuthLayout'
import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Sign Up"
}

export default function SignInPage() {
    return (
        <AuthLayout>
            <SignUp />
        </AuthLayout>
    );
}
