// 'use client'
//
// import React, { useEffect, useState, useRef } from 'react'
// import { banUser, getUsers, unBanUser } from '@/app/api/users'
// import { useRouter } from 'next/navigation'
// import CheckUserRole from '@/components/checkUserRole'
// import UserCard from "@/components/(dashboard)/user-card" // Adjust the path according to your file structure
//
// interface User {
//     username: string
//     email: string
//     paid_rq: boolean
//     banned: boolean
//     testCompleted: boolean
//     summedTotal: number
//     externalUserId: string
// }
//
// const UsersComponent = () => {
//     const [users, setUsers] = useState<User[]>([])
//     const [loading, setLoading] = useState(false)
//     const [searchQuery, setSearchQuery] = useState('')
//     const [sortConfig, setSortConfig] = useState<{
//         key: keyof User
//         direction: 'asc' | 'desc'
//     } | null>(null)
//     const [currentPage, setCurrentPage] = useState(1)
//     const [rowsPerPage] = useState(12)
//     const [selectedUser, setSelectedUser] = useState<User | null>(null)
//
//
//     const searchInputRef = useRef<HTMLInputElement | null>(null)
//     const router = useRouter()
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoading(true)
//             try {
//                 const userData: User[] = await getUsers()
//                 console.log('Fetched Users:', userData) // Log fetched data
//                 setUsers(userData)
//             } catch (error) {
//                 console.error('Error fetching users:', error)
//             } finally {
//                 setLoading(false)
//             }
//         }
//
//         fetchUsers()
//     }, [])
//
//     useEffect(() => {
//         if (searchInputRef.current) {
//             searchInputRef.current.focus()
//         }
//     }, [sortConfig])
//
//     const handleBanUser = async (user: User) => {
//         const originalUsers = [...users]
//         try {
//             const updatedUsers = users.map((u) =>
//                 u.externalUserId === user.externalUserId
//                     ? { ...u, banned: !u.banned }
//                     : u
//             )
//             setUsers(updatedUsers)
//
//             if (!user.banned) {
//                 console.log(
//                     'Banning user with externalUserId:',
//                     user.externalUserId
//                 )
//                 await banUser(user.externalUserId)
//             } else {
//                 console.log(
//                     'Unbanning user with externalUserId:',
//                     user.externalUserId
//                 )
//                 await unBanUser(user.externalUserId)
//             }
//
//             router.refresh() // Refresh after the action completes
//         } catch (error) {
//             console.error('Error banning/unbanning user:', error)
//             setUsers(originalUsers) // Rollback if the request fails
//         }
//     }
//
//     const handleSort = (key: keyof User) => {
//         let direction: 'asc' | 'desc' = 'asc'
//
//         if (sortConfig?.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc'
//         }
//
//         setSortConfig({ key, direction })
//
//         const sortedUsers = [...users].sort((a, b) => {
//             if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
//             if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
//             return 0
//         })
//
//         setUsers(sortedUsers)
//     }
//
//     const filteredUsers = users.filter((user) =>
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//
//     // Calculate pagination
//     const indexOfLastUser = currentPage * rowsPerPage
//     const indexOfFirstUser = indexOfLastUser - rowsPerPage
//     const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
//     const pageCount = Math.ceil(filteredUsers.length / rowsPerPage)
//
//     const handlePageChange = (newPage: number) => {
//         if (newPage >= 1 && newPage <= pageCount) {
//             setCurrentPage(newPage)
//
//             // Refocus the search input after changing the page
//             if (searchInputRef.current) {
//                 searchInputRef.current.focus()
//             }
//         }
//     }
//
//     const handleUsernameClick = (user: User) => {
//         setSelectedUser(user)
//     }
//
//     const closeUserCard = () => {
//         setSelectedUser(null)
//     }
//
//     return (
//         <>
//             <CheckUserRole />
//             <div className="flex h-screen">
//                 <div className="flex flex-col w-full mt-24 px-4">
//                     <div className="mb-2">
//                         <input
//                             type="text"
//                             placeholder="Search by email (flakey, but deal with it)"
//                             className="bg-pantone624 placeholder-pantone621 text-gray-700 w-full px-4 py-2 border border-gray-500 rounded-xl"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             ref={searchInputRef}
//                         />
//                     </div>
//
//                     {/* User Table */}
//                     <table className="w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 {[
//                                     'username',
//                                     'email',
//                                     'paid_rq',
//                                     'testCompleted',
//                                     'banned',
//                                 ].map((key) => (
//                                     <th
//                                         key={key}
//                                         onClick={() =>
//                                             handleSort(key as keyof User)
//                                         }
//                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                                     >
//                                         {key.charAt(0).toUpperCase() +
//                                             key.slice(1)}{' '}
//                                         {sortConfig?.key === key
//                                             ? sortConfig.direction === 'asc'
//                                                 ? '↑'
//                                                 : '↓'
//                                             : ''}
//                                     </th>
//                                 ))}
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentUsers.length === 0 ? (
//                                 <tr>
//                                     <td
//                                         colSpan={6}
//                                         className="px-6 py-4 text-center text-sm text-gray-500"
//                                     >
//                                         No results found.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 currentUsers.map((user, index) => (
//                                     <tr
//                                         key={index}
//                                         className={
//                                             index % 2 === 0
//                                                 ? 'bg-pantone621'
//                                                 : 'bg-pantone622'
//                                         }
//                                     >
//                                         <td
//                                             className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:underline"
//                                             onClick={() =>
//                                                 handleUsernameClick(user)
//                                             }
//                                         >
//                                             {user.username}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
//                                             {user.email}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {user.paid_rq ? 'Yes' : 'No'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
//                                             {user.testCompleted ? 'Yes' : 'No'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {user.banned ? 'Yes' : 'No'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             <button
//                                                 className="text-red-500 hover:underline"
//                                                 onClick={() =>
//                                                     handleBanUser(user)
//                                                 }
//                                             >
//                                                 {user.banned ? 'Unban' : 'Ban'}
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//
//                     {/* Pagination Controls */}
//                     <div className="mt-4 flex justify-between items-center">
//                         <button
//                             className={`px-4 py-2 bg-pantone621 text-gray-800 rounded-xl ${
//                                 currentPage === 1
//                                     ? 'opacity-50 cursor-not-allowed'
//                                     : 'hover:bg-pantone624'
//                             }`}
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                         >
//                             Previous
//                         </button>
//                         <span>
//                             Page {currentPage} of {pageCount}
//                         </span>
//                         <button
//                             className={`px-4 py-2 bg-pantone621 text-gray-800 rounded-xl ${
//                                 currentPage === pageCount
//                                     ? 'opacity-50 cursor-not-allowed'
//                                     : 'hover:bg-pantone624'
//                             }`}
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === pageCount}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <UserCard selectedUser={selectedUser} closeUserCard={closeUserCard} />
//         </>
//     )
// }
//
// export default UsersComponent


'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useSortableData } from '@/hooks/useSortableData'
import { useSearchableData } from '@/hooks/useSearchableData'
import { usePagination } from '@/hooks/usePagination'
import CheckUserRole from '@/components/checkUserRole'
import UserCard from "@/components/(dashboard)/user-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface User {
    username: string
    email: string
    paid_rq: boolean
    banned: boolean
    testCompleted: boolean
    summedTotal: number
    externalUserId: string
}

export default function UsersComponent() {
    const { users, loading, banUser, unBanUser } = useUsers()
    const { items: sortedUsers, requestSort, sortConfig } = useSortableData<User>(users)
    const { items: filteredUsers, searchQuery, setSearchQuery } = useSearchableData<User>(sortedUsers, ['email'])
    const { currentItems, currentPage, pageCount, setCurrentPage } = usePagination<User>(filteredUsers, 12)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const handleBanUser = useCallback(async (user: User) => {
        if (user.banned) {
            await unBanUser(user.externalUserId)
        } else {
            await banUser(user.externalUserId)
        }
    }, [banUser, unBanUser])

    const handleUsernameClick = useCallback((user: User) => {
        setSelectedUser(user)
    }, [])

    const closeUserCard = useCallback(() => {
        setSelectedUser(null)
    }, [])

    const tableHeaders = useMemo(() => [
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'paid_rq', label: 'Paid RQ' },
        { key: 'testCompleted', label: 'Test Completed' },
        { key: 'banned', label: 'Banned' },
    ], [])

    return (
        <>
            <CheckUserRole />
            <div className="flex min-h-screen bg-gray-100">
                <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by email (case-insensitive)"
                                    className="w-full pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-200">
                                        {tableHeaders.map(({ key, label }) => (
                                            <TableHead
                                                key={key}
                                                className="cursor-pointer hover:bg-gray-300 text-gray-800 font-semibold"
                                                onClick={() => requestSort(key as keyof User)}
                                            >
                                                <div className="flex items-center space-x-1">
                                                    <span>{label}</span>
                                                    {sortConfig?.key === key && (
                                                        sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </div>
                                            </TableHead>
                                        ))}
                                        <TableHead className="text-gray-800 font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8">
                                                <div className="flex justify-center items-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : currentItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">No results found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        currentItems.map((user, index) => (
                                            <TableRow key={user.externalUserId} className={index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'}>
                                                <TableCell
                                                    className="font-medium text-blue-600 cursor-pointer hover:underline"
                                                    onClick={() => handleUsernameClick(user)}
                                                >
                                                    {user.username}
                                                </TableCell>
                                                <TableCell className="text-gray-700">{user.email}</TableCell>
                                                <TableCell className="text-gray-700">{user.paid_rq ? 'Yes' : 'No'}</TableCell>
                                                <TableCell className="text-gray-700">{user.testCompleted ? 'Yes' : 'No'}</TableCell>
                                                <TableCell className="text-gray-700">{user.banned ? 'Yes' : 'No'}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant={user.banned ? "outline" : "destructive"}
                                                        size="sm"
                                                        onClick={() => handleBanUser(user)}
                                                    >
                                                        {user.banned ? 'Unban' : 'Ban'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-gray-200 text-black hover:bg-gray-400 rounded px-2 py-1 transition-colors duration-200"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === pageCount}
                                    className="bg-gray-200 text-black hover:bg-gray-400 rounded px-2 py-1 transition-colors duration-200"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {pageCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {selectedUser && <UserCard selectedUser={selectedUser} closeUserCard={closeUserCard} />}
        </>
    )
}
