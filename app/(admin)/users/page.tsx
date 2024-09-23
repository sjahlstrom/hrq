'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useSortableData } from '@/hooks/useSortableData'
import { usePagination } from '@/hooks/usePagination'
import CheckUserRole from '@/components/checkUserRole'
import UserCard from '@/components/(dashboard)/user-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'

interface User {
    username: string
    email: string
    paid_rq: boolean
    banned: boolean
    testCompleted: boolean
    summedTotal: number
    externalUserId: string
    testResponse: number[]
}

export default function UsersComponent() {
    const { users = [], loading, banUser, unBanUser } = useUsers()
    const {
        items: sortedUsers,
        requestSort,
        sortConfig,
    //     @ts-ignore
    } = useSortableData<User>(users)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isClient, setIsClient] = useState(false) // Client-only check

    useEffect(() => {
        setIsClient(true) // Set client-only flag after mounting
    }, [])

    const filteredUsers = useMemo(() => {
        return sortedUsers.filter((user) =>
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [sortedUsers, searchQuery])

    const { currentItems, currentPage, pageCount, setCurrentPage } =
        usePagination<User>(filteredUsers, 12)

    const handleBanUser = useCallback(
        async (user: User) => {
            if (user.banned) {
                await unBanUser(user.externalUserId)
            } else {
                await banUser(user.externalUserId)
            }
        },
        [banUser, unBanUser]
    )

    const handleUsernameClick = useCallback((user: User) => {
        setSelectedUser(user)
    }, [])

    const closeUserCard = useCallback(() => {
        setSelectedUser(null)
    }, [])

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

    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(filteredUsers.length / 12)
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }, [filteredUsers.length])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])

    return (
        <>
            <CheckUserRole />
            <div className="flex mt-40 min-h-screen bg-gray-100">
                <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        User Management
                    </h1>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
                                <Input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 text-gray-700 rounded focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-300 border-red-900 " // Explicit placeholder styling
                                    placeholder="Search by email (case-insensitive)"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />

                                {searchQuery && (
                                    <Button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute text-red-900 right-4 top-1/2 transform -translate-y-1/2"
                                    >
                                        Return to User List
                                    </Button>
                                )}
                            </div>
                        </div>
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
                                                        requestSort(header.key)
                                                    }
                                                >
                                                    <span>{header.label}</span>
                                                    {/* Render icons only after the component has mounted */}
                                                    {isClient &&
                                                        sortConfig?.key ===
                                                            header.key &&
                                                        sortConfig.direction &&
                                                        // @ts-ignore
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
                                            className=" border-2"
                                        >
                                            <TableCell className="px-6 py-0 whitespace-nowrap">
                                                <button
                                                    className="text-gray-700 hover:text-blue-900"
                                                    onClick={() =>
                                                        handleUsernameClick(
                                                            user
                                                        )
                                                    }
                                                >
                                                    {user.username}
                                                </button>
                                            </TableCell>
                                            <TableCell className="px-6   py-0 text-gray-700 whitespace-nowrap">
                                                {user.email}
                                            </TableCell>
                                            <TableCell className="px-6 py-2 text-gray-700 whitespace-nowrap">
                                                {user.paid_rq ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell className="px-6 py-0 text-gray-700 whitespace-nowrap">
                                                {user.testCompleted
                                                    ? 'Yes'
                                                    : 'No'}
                                            </TableCell>
                                            <TableCell className="px-6  py-0 text-gray-700 whitespace-nowrap">
                                                {user.banned ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell className="px-6  py-0 text-red-900 whitespace-nowrap">
                                                <Button
                                                    onClick={() =>
                                                        handleBanUser(user)
                                                    }
                                                    variant={
                                                        user.banned
                                                            ? 'outline'
                                                            : 'destructive'
                                                    }
                                                    size="sm"
                                                >
                                                    {user.banned
                                                        ? 'Unban'
                                                        : 'Ban'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <nav
                            className="flex flex-col items-center mt-6"
                            aria-label="Pagination"
                        >
                            <ul className="inline-flex items-center space-x-2">
                                <li>
                                    <Button
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full w-[120px] bg-pantone624 hover:bg-pantone625 active:bg-green-800 border border-pantone621 transition-colors duration-300"
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        Previous
                                    </Button>
                                </li>
                                {pageNumbers.map((number) => (
                                    <li key={number}>
                                        <Button
                                            onClick={() =>
                                                setCurrentPage(number)
                                            }
                                            variant={
                                                currentPage === number
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                            size="icon"
                                            className="rounded-full bg-pantone624 hover:bg-pantone625 active:bg-green-800 border border-pantone624 transition-colors duration-300 mx-1"
                                        >
                                            {number}
                                        </Button>
                                    </li>
                                ))}
                                <li>
                                    <Button
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                        disabled={
                                            currentPage === pageNumbers.length
                                        }
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full w-[120px] bg-pantone624 hover:bg-pantone625 border border-pantone621 transition-colors duration-300"
                                    >
                                        <span className="sr-only">Next</span>
                                        Next
                                    </Button>
                                </li>
                            </ul>
                            <div className="mt-2 text-sm text-gray-700">
                                Showing{' '}
                                {Math.min(
                                    (currentPage - 1) * 12 + 1,
                                    filteredUsers.length
                                )}{' '}
                                to{' '}
                                {Math.min(
                                    currentPage * 12,
                                    filteredUsers.length
                                )}{' '}
                                of {filteredUsers.length} results
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {selectedUser && (
                <UserCard
                    selectedUser={selectedUser}
                    closeUserCard={closeUserCard}
                />
            )}
        </>
    )
}
