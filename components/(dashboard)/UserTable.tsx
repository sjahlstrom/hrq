// import React, { useMemo } from 'react'
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { ChevronUp, ChevronDown } from "lucide-react"
//
// interface User {
//     username: string
//     email: string
//     paid_rq: boolean
//     banned: boolean
//     testCompleted: boolean
//     summedTotal: number
//     externalUserId: string
//     testResponse?: number[]
// }
//
// interface UserTableProps {
//     currentItems: User[]
//     handleSort: (key: keyof User) => void
//     handleUsernameClick: (user: User) => void
//     handleBanUser: (user: User) => void
//     sortConfig: { key: keyof User; direction: 'ascending' | 'descending' } | null
//     isClient: boolean
// }
//
// export default function UserTable({
//                                       currentItems,
//                                       handleSort,
//                                       handleUsernameClick,
//                                       handleBanUser,
//                                       sortConfig,
//                                       isClient
//                                   }: UserTableProps) {
//     const tableHeaders = useMemo(
//         () => [
//             { key: 'username', label: 'Username' },
//             { key: 'email', label: 'Email' },
//             { key: 'paid_rq', label: 'Paid RQ' },
//             { key: 'testCompleted', label: 'Test Completed' },
//             { key: 'banned', label: 'Banned' },
//         ],
//         []
//     )
//
//     return (
//         <div className="overflow-x-auto">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         {tableHeaders.map((header) => (
//                             <TableHead
//                                 key={header.key}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
//                             >
//                                 <button
//                                     className="flex items-center space-x-1"
//                                     onClick={() => handleSort(header.key as keyof User)}
//                                 >
//                                     <span>{header.label}</span>
//                                     {isClient &&
//                                         sortConfig?.key === header.key &&
//                                         sortConfig.direction && (
//                                             sortConfig.direction === 'ascending' ? (
//                                                 <ChevronUp className="h-4 w-4" />
//                                             ) : (
//                                                 <ChevronDown className="h-4 w-4" />
//                                             )
//                                         )}
//                                 </button>
//                             </TableHead>
//                         ))}
//                         <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                             Actions
//                         </TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {currentItems.map((user) => (
//                         <TableRow
//                             key={user.externalUserId}
//                             className="border-2"
//                         >
//                             <TableCell className="px-6 py-0 whitespace-nowrap">
//                                 <button
//                                     className="text-gray-700 hover:text-blue-900"
//                                     onClick={() => handleUsernameClick(user)}
//                                 >
//                                     {user.username}
//                                 </button>
//                             </TableCell>
//                             <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
//                                 {user.email}
//                             </TableCell>
//                             <TableCell className="px-6 py-2 text-gray-700 whitespace-nowrap">
//                                 {user.paid_rq ? 'Yes' : 'No'}
//                             </TableCell>
//                             <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
//                                 {user.testCompleted ? 'Yes' : 'No'}
//                             </TableCell>
//                             <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
//                                 {user.banned ? 'Yes' : 'No'}
//                             </TableCell>
//                             <TableCell className="px-6 py-0 text-red-900 whitespace-nowrap">
//                                 <Button
//                                     onClick={() => handleBanUser(user)}
//                                     variant={user.banned ? 'outline' : 'destructive'}
//                                     size="sm"
//                                 >
//                                     {user.banned ? 'Unban' : 'Ban'}
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

import React, { useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface User {
    username: string
    email: string
    paid_rq: boolean
    banned: boolean
    testCompleted: boolean
    summedTotal: number
    externalUserId: string
    testResponse?: number[]
}

type SortConfig = {
    key: keyof User
    direction: 'ascending' | 'descending'
} | null

// interface UserTableProps {
//     currentItems: User[]
//     handleSort: (key: keyof User) => void
//     handleUsernameClick: (user: User) => void
//     handleBanUser: (user: User) => void
//     sortConfig: SortConfig
// }
interface UserTableProps {
    currentItems: User[]
    handleSort: (key: keyof User) => void
    handleUsernameClick: (user: User) => void
    handleBanUser: (user: User) => Promise<void>
    sortConfig: {
        key: keyof User
        direction: 'ascending' | 'descending'
    }
    isClient: boolean // Add this line
}

// export default function UserTable({
//                                       currentItems,
//                                       handleSort,
//                                       handleUsernameClick,
//                                       handleBanUser,
//                                       sortConfig,
//                                   }: UserTableProps) {
export function UserTable({
    currentItems,
    handleSort,
    handleUsernameClick,
    handleBanUser,
    sortConfig,
    isClient, // Add this line
}: UserTableProps) {
    const tableHeaders = useMemo(
        () => [
            { key: 'username', label: 'Username' },
            { key: 'email', label: 'Email' },
            { key: 'paid_rq', label: 'Paid RQ' },
            { key: 'testCompleted', label: 'Test Completed' },
            { key: 'banned', label: 'Banned' },
        ],
        []
    )

    const shouldHighlight = (user: User) => {
        return !user.testCompleted && (user.testResponse?.length ?? 0) > 0
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableHeaders.map((header) => (
                            <TableHead
                                key={header.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                            >
                                <button
                                    className="flex items-center space-x-1"
                                    onClick={() =>
                                        handleSort(header.key as keyof User)
                                    }
                                >
                                    <span>{header.label}</span>
                                    {sortConfig?.key === header.key &&
                                        (sortConfig.direction ===
                                        'ascending' ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        ))}
                                </button>
                            </TableHead>
                        ))}
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((user) => (
                        <TableRow
                            key={user.externalUserId}
                            className={`border-2 ${shouldHighlight(user) ? 'bg-red-300' : ''}`}
                        >
                            <TableCell className="px-6 py-0 whitespace-nowrap">
                                <button
                                    className="text-gray-700 hover:text-blue-900"
                                    onClick={() => handleUsernameClick(user)}
                                >
                                    {user.username}
                                </button>
                            </TableCell>
                            <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
                                {user.email}
                            </TableCell>
                            <TableCell className="px-6 py-2 text-gray-700 whitespace-nowrap">
                                {user.paid_rq ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
                                {user.testCompleted ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
                                {user.banned ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell className="px-6 py-0 text-red-900 whitespace-nowrap">
                                <Button
                                    onClick={() => handleBanUser(user)}
                                    variant={
                                        user.banned ? 'outline' : 'destructive'
                                    }
                                    size="sm"
                                >
                                    {user.banned ? 'Unban' : 'Ban'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
