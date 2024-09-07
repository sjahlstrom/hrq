import { SignIn } from '@clerk/nextjs';
import AuthLayout from '@/app/(auth)/_components/AuthLayout'

export default function SignInPage() {
    return (
        <AuthLayout>
            <SignIn />
        </AuthLayout>
    );
}
