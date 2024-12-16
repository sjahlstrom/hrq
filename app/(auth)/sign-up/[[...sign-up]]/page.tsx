'use client'

import { SignUp } from '@clerk/nextjs';
import AuthLayout from '@/app/(auth)/_components/AuthLayout';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignUpPage() {
    const [hasAttemptedSignup, setHasAttemptedSignup] = useState(false);
    const [tosAccepted, setTosAccepted] = useState(false);

    const appearance = {
        elements: {
            rootBox: {
                pointerEvents: tosAccepted ? 'auto' : 'none',
                opacity: tosAccepted ? 1 : 0.5,
            }
        },
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="tos"
                        checked={tosAccepted}
                        onCheckedChange={(checked) => {
                            setTosAccepted(checked as boolean);
                            setHasAttemptedSignup(false);
                        }}
                    />
                    <Label htmlFor="tos" className="text-sm text-white">
                        I have read and agree to the{' '}
                        <a
                            href="/tos"
                            className="text-hrqColors-sunsetOrange-300 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Terms of Service
                        </a>
                    </Label>
                </div>

                {!tosAccepted && hasAttemptedSignup && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            You must accept the Terms of Service before proceeding
                        </AlertDescription>
                    </Alert>
                )}

                <div
                    onClick={() => !tosAccepted && setHasAttemptedSignup(true)}
                    className={!tosAccepted ? 'cursor-not-allowed' : ''}
                >
                    <SignUp appearance={appearance} />
                </div>
            </div>
        </AuthLayout>
    );
}