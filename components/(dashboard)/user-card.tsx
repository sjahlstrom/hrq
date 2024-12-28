import React, { useEffect, useState } from 'react'
import { User } from '@/hooks/useUsers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Loader2 } from "lucide-react"
import { setUserAdmin } from '@/lib/actions/users'
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
    const [currentRole, setCurrentRole] = useState<UserRole | null>(selectedUser.role || null)

    const handleAdminToggle = async (checked: boolean) => {
        const action = checked ? 'grant' : 'remove';
        const confirmed = window.confirm(
            `Are you sure you want to ${action} admin rights for ${selectedUser.username}?`
        );

        if (!confirmed) return;

        try {
            setIsUpdating(true)
            await setUserAdmin(selectedUser.externalUserId, checked)

            setCurrentRole(checked ? UserRole.ADMIN : UserRole.USER)

            toast.success('Success', {
                description: `${selectedUser.username}'s admin status ${checked ? 'granted' : 'removed'} successfully`,
                duration: 3000,
            })

            if (onUpdate) {
                onUpdate()
            }
        } catch (error) {
            toast.error('Error', {
                description: `Failed to ${action} admin rights for ${selectedUser.username}. Please try again.`,
                duration: 5000,
            })
        } finally {
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        setCurrentRole(selectedUser.role || null)
    }, [selectedUser])

    const isAdmin = currentRole === UserRole.ADMIN

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="bg-sky-300/80 text-2xl w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-bold">User Details</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeUserCard}
                        disabled={isUpdating}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-dark font-semibold">Username</h3>
                            <p className="text-sm">{selectedUser.username || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Email</h3>
                            <p className="text-sm">{selectedUser.email || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Paid RQ</h3>
                            <p className="text-sm">{selectedUser.paid_rq ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Paid CQ</h3>
                            <p className="text-sm">{selectedUser.paid_cq ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Banned</h3>
                            <p className="text-sm">{selectedUser.banned ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Test Completed</h3>
                            <p className="text-sm">{selectedUser.testCompleted ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-dark text-lg font-semibold">Summed Total</h3>
                            <p className="text-sm">{selectedUser.summedTotal !== null ? selectedUser.summedTotal : 'N/A'}</p>
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
                        <div className="flex items-center space-x-2">
                            <h3 className="text-dark text-lg font-semibold">Admin</h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={isAdmin}
                                        disabled={isUpdating}
                                        onCheckedChange={handleAdminToggle}
                                        aria-label="Toggle admin status"
                                    />
                                    {isUpdating ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span className="text-sm text-muted-foreground">
                                                Updating...
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-sm">
                                            Current role: {currentRole || 'USER'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserCard