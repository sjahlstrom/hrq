import AuthLayout from '@/app/(auth)/_components/AuthLayout'
import { SignUp } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <AuthLayout>
            <SignUp />
        </AuthLayout>
    );
}
