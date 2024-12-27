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
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface TermsOfServiceDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onProceed: () => void
}

const TermsOfService: React.FC<TermsOfServiceDialogProps> = ({
    isOpen,
    onOpenChange,
    onProceed,
}) => {
    const { user } = useUser()
    const [tosAccepted, setTosAccepted] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleCheckboxChange = async (checked: boolean) => {
        setTosAccepted(checked)
        setShowError(false)

        if (checked && user) {
            try {
                const response = await fetch('/api/users/tos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to update TOS status')
                }
            } catch (error) {
                console.error('Failed to update TOS status:', error)
                setTosAccepted(false)
            }
        }
    }

    const handleProceed = () => {
        if (!tosAccepted) {
            setShowError(true)
        } else {
            setShowError(false)
            onProceed()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-hrqColors-peach-700 sm:max-w-md">
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
                        onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="tos">
                        I have read and agree to the{' '}
                        <a
                            href="/tos"
                            className="text-yellow-300 hover:underline"
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
                    <Button onClick={handleProceed}>Proceed</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TermsOfService
