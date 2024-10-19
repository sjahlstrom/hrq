import React from 'react'
import { User } from '@/hooks/useUsers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface UserCardProps {
    selectedUser: User
    closeUserCard: () => void
}

const UserCard: React.FC<UserCardProps> = ({ selectedUser, closeUserCard }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">User Details</CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeUserCard}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Username</h3>
                            <p>{selectedUser.username || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p>{selectedUser.email || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Paid RQ</h3>
                            <p>{selectedUser.paid_rq ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Banned</h3>
                            <p>{selectedUser.banned ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Test Completed</h3>
                            <p>{selectedUser.testCompleted ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Summed Total</h3>
                            <p>{selectedUser.summedTotal !== null ? selectedUser.summedTotal : 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">External User ID</h3>
                            <p>{selectedUser.externalUserId}</p>
                        </div>
                        {selectedUser.testResponse && (
                            <div>
                                <h3 className="text-lg font-semibold">Test Response</h3>
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