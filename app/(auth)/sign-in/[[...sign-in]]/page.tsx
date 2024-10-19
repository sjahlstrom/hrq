import { SignIn } from '@clerk/nextjs'
import AuthLayout from '@/app/(auth)/_components/AuthLayout'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Sign In"
}


export default function SignInPage() {
    return (
        <AuthLayout>
            <SignIn />
        </AuthLayout>
    );
}
