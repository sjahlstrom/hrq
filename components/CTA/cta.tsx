'use client'

import React from 'react'
import { User } from '@/hooks/useUsers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { setUserAdmin } from '@/app/api/users'
import { toast } from "sonner"
import { UserRole } from '@prisma/client'

interface ExtendedUser extends User {
    role?: UserRole | null;
}

interface UserCardProps {
    selectedUser: ExtendedUser
    closeUserCard: () => void
    onUpdate?: () => void
}

const UserCard: React.FC<UserCardProps> = ({ selectedUser, closeUserCard, onUpdate }) => {
    const [isUpdating, setIsUpdating] = React.useState(false)

    const handleAdminToggle = async (checked: boolean) => {
        try {
            setIsUpdating(true)
            await setUserAdmin(selectedUser.externalUserId, checked)

            toast.success('Success', {
                description: `Admin status ${checked ? 'granted' : 'removed'} successfully`,
            })

            // Trigger refresh of user list if callback provided
            if (onUpdate) {
                onUpdate()
            }
        } catch (error) {
            toast.error('Error', {
                description: 'Failed to update admin status',
            })
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-sky-300/80 text-2xl w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-bold">User Details</CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeUserCard}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Username</h3>
                            <p>{selectedUser.username || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Email</h3>
                            <p>{selectedUser.email || 'N/A'}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <h3 className="text-dark text-lg font-semibold">Admin</h3>
                            <Checkbox
                                checked={selectedUser.role === UserRole.ADMIN}
                                disabled={isUpdating}
                                onCheckedChange={handleAdminToggle}
                                aria-label="Toggle admin status"
                            />
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Paid RQ</h3>
                            <p>{selectedUser.paid_rq ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Paid CQ</h3>
                            <p>{selectedUser.paid_cq ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Banned</h3>
                            <p>{selectedUser.banned ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Test Completed</h3>
                            <p>{selectedUser.testCompleted ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Summed Total</h3>
                            <p>{selectedUser.summedTotal !== null ? selectedUser.summedTotal : 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">External User ID</h3>
                            <p className="text-sm">{selectedUser.externalUserId}</p>
                        </div>
                        {selectedUser.testResponse && (
                            <div>
                                <h3 className="text-dark text-lg font-semibold">Test Response</h3>
                                <p>{selectedUser.testResponse.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserCard