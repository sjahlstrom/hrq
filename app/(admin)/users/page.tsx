'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useSortableData } from '@/hooks/useSortableData'
import { usePagination } from '@/hooks/usePagination'
import { useClientSideEffect } from '@/hooks/useClientSideEffect'
import CheckUserRole from '@/components/checkUserRole'
import UserCard from '@/components/(dashboard)/user-card'
import UserTable from '@/components/(dashboard)/UserTable'
import SearchBar from '@/components/(dashboard)/SearchBar'
import Pagination from '@/components/(dashboard)/Pagination'

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

export default function UsersComponent() {
    const { users = [], loading, banUser, unBanUser } = useUsers()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const isClient = useClientSideEffect()

    const initialSortConfig = { key: 'username' as keyof User, direction: 'ascending' as const }
    const { items: sortedUsers, requestSort, sortConfig } = useSortableData<User>(users, initialSortConfig)

    const filteredUsers = useMemo(() => {
        return sortedUsers.filter((user) =>
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [sortedUsers, searchQuery])

    const {
        currentItems,
        currentPage,
        pageCount,
        setCurrentPage
    } = usePagination<User>(filteredUsers, 12)

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

    const handleSort = useCallback((key: keyof User) => {
        requestSort(key)
        setCurrentPage(1)
    }, [requestSort, setCurrentPage])

    return (
        <>
            <CheckUserRole />
            <div className="flex mt-40 min-h-screen bg-gray-100">
                <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        User Management
                    </h1>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <UserTable
                            currentItems={currentItems}
                            handleSort={handleSort}
                            handleUsernameClick={handleUsernameClick}
                            handleBanUser={handleBanUser}
                            sortConfig={sortConfig}
                            isClient={isClient}
                        />
                        <Pagination
                            currentPage={currentPage}
                            pageCount={pageCount}
                            setCurrentPage={setCurrentPage}
                            totalItems={filteredUsers.length}
                        />
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