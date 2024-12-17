'use client'

import { useState } from 'react'
import { SignUp } from '@clerk/nextjs'
import AuthLayout from '@/app/(auth)/_components/AuthLayout'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SignUpPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(true)
    const [tosAccepted, setTosAccepted] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleProceed = () => {
        if (!tosAccepted) {
            setShowError(true)
            return
        }
        setIsDialogOpen(false)
    }

    const appearance = {
        elements: {
            rootBox: {
                display: !tosAccepted ? 'none' : 'block',
            },
        },
    }

    return (
        <AuthLayout>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Terms of Service Agreement</DialogTitle>
                        <DialogDescription>
                            Please review and accept our terms of service before
                            proceeding
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                            id="tos"
                            checked={tosAccepted}
                            onCheckedChange={(checked) => {
                                setTosAccepted(checked as boolean)
                                setShowError(false)
                            }}
                        />
                        <Label htmlFor="tos">
                            I have read and agree to the{' '}
                            <a
                                href="/tos"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms of Service
                            </a>
                        </Label>
                    </div>

                    {showError && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>
                                You must accept the Terms of Service before
                                proceeding
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleProceed}>
                            Proceed to Sign Up
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="w-full max-w-sm">
                <SignUp appearance={appearance} />
            </div>
        </AuthLayout>
    )
}
