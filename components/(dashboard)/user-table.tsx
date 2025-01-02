import React from 'react'
import { User } from '@/hooks/useUsers'
import { SortConfig } from '@/hooks/useSortableData'
import { Button } from '@/components/ui/button'

interface UserTableProps {
    currentItems: User[]
    handleSort: (key: keyof User) => void
    handleUsernameClick: (user: User) => void
    handleBanUser: (user: User) => void
    sortConfig: SortConfig<User> | null
    isClient: boolean
}

export const UserTable: React.FC<UserTableProps> = ({
    currentItems,
    handleSort,
    handleUsernameClick,
    handleBanUser,
    sortConfig,
}) => {
    const userFields: (keyof User)[] = [
        'username',
        'email',
        'paid_rq',
        'paid_cq',
        'banned',
        'testCompleted',
        'summedTotal',
    ]

    const formatHeader = (key: string): string => {
        if (key === 'testCompleted') return 'Test Completed'
        if (key === 'summedTotal') return 'Summed Total'
        if (key === 'email') return 'Email Address'
        if (key === 'paid_rq') return 'Paid RQ'
        if (key === 'paid_cq') return 'Paid CQ'
        return key.charAt(0).toUpperCase() + key.slice(1)
    }

    const handleBanClick = async (user: User) => {
        try {
            await handleBanUser(user)
        } catch (error) {
            console.error('Failed to ban user:', error)
        }
    }

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {userFields.map((key) => (
                            <th
                                key={key}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort(key)}
                            >
                                {formatHeader(key)}
                                {sortConfig && sortConfig.key === key && (
                                    <span>
                                        {sortConfig.direction === 'ascending'
                                            ? ' ▲'
                                            : ' ▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((user) => (
                        <tr key={user.externalUserId}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                    className="text-sm font-medium text-gray-900 cursor-pointer"
                                    onClick={() => handleUsernameClick(user)}
                                >
                                    {user.username || 'N/A'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {user.email || 'N/A'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {user.paid_rq ? 'Yes' : 'No'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {user.paid_cq ? 'Yes' : 'No'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {user.banned ? 'Yes' : 'No'}
                                </div>
                            </td>
                            <td
                                className={`px-6 py-4 whitespace-nowrap ${
                                    !user.testCompleted &&
                                    user.testResponse.length > 0
                                        ? 'bg-yellow-100'
                                        : ''
                                }`}
                            >
                                <div className="text-sm text-gray-500">
                                    {user.testCompleted ? 'Yes' : 'No'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {user.summedTotal ?? 0}
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Button
                                    onClick={() => handleBanClick(user)}
                                    className={`px-3 py-1 rounded ${
                                        user.banned
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                    } text-white`}
                                >
                                    {user.banned ? 'Unban' : 'Ban'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center text-xs text-gray-500 mt-4">
            Yellow background indicates User has started but not yet finished the Test
            </div>
        </div>
    )
}
