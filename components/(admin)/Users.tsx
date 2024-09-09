'use client'

import { useEffect, useState } from 'react'
import { getUsers } from '@/app/api/answers'

const UsersComponent = () => {
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers()
                setUsers(userData)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="ml-5 flex justify-center items-center h-screen">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  w-2/3">
                        Email
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Completed
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.paid_rq ? 'Yes' : 'No'}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.testCompleted ? 'Yes' : 'No'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default UsersComponent
