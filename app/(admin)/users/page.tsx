'use client'

import { useEffect, useState } from 'react'
import { banUser, getUsers, unBanUser } from '@/app/api/answers'
import Sidebar from '@/app/(admin)/admin/_components/Sidebar'
import { useRouter } from 'next/navigation'

interface User {
    username: string
    email: string
    paid_rq: boolean
    banned: boolean
    testCompleted: boolean
    externalUserId: string
}

const UsersComponent = () => {
    const [users, setUsers] = useState<User[]>([])
    const router = useRouter()

    const fetchUsers = async () => {
        try {
            const userData = await getUsers()
            // @ts-ignore
            setUsers(userData)
            console.log(userData)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleEdit = (user: User) => {
        console.log('Editing user:', user)
        // Add your edit logic here
    }

    const handleBanUser = async (user: User) => {
        try {
            const updatedUsers = users.map((u) =>
                u.externalUserId === user.externalUserId
                    ? { ...u, banned: !u.banned } // Toggle the banned status immediately
                    : u
            )
            setUsers(updatedUsers) // Optimistic update of the UI

            // Perform the actual ban/unban operation
            if (!user.banned) {
                console.log("Banning user with externalUserId:", user.externalUserId)
                await banUser(user.externalUserId)
            } else {
                console.log("Unbanning user with externalUserId:", user.externalUserId)
                await unBanUser(user.externalUserId)
            }

            // Refresh the page to ensure the UI is in sync with the server
            router.refresh()
        } catch (error) {
            console.error('Error banning/unbanning user:', error)
        }
    }

    return (
        <div className="flex h-screen">
            <div className="mt-24 rounded bg-pantone624 hidden md:block h-[88vh] w-[260px]">
                <Sidebar />
            </div>

            <div className="flex flex-col w-full mt-24">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Paid RQ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Test Completed
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (

                        <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ width: '50%' }}>
                                {user.email}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.paid_rq ? 'Yes' : 'No'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.testCompleted ? 'Yes' : 'No'}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/*<button*/}
                                {/*    className="text-blue-500 hover:underline mr-4"*/}
                                {/*    onClick={() => handleEdit(user)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</button>*/}
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleBanUser(user)}
                                >
                                    {user.banned ? "Unban" : " Ban"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersComponent

