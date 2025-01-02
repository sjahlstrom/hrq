'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { User, useUsers } from '@/hooks/useUsers'
import { SortConfig, useSortableData } from '@/hooks/useSortableData'
import { usePagination } from '@/hooks/usePagination'
import { useClientSideEffect } from '@/hooks/useClientSideEffect'
import CheckUserRole from '@/components/check-user-role'
import AdminUserCard from '@/components/(dashboard)/admin-user-card'
import { UserTable } from '@/components/(dashboard)/user-table'
import { SkeletonUserTable } from '@/components/(dashboard)/skeleton-user-table'
import SearchBar from '@/components/(dashboard)/search-bar'
import UsersPagination from '@/components/(dashboard)/user-pagination'
import Breadcrumb from '@/components/common/bread-crumb'

export default function Users() {
    const { users = [], loading, banUser, unBanUser } = useUsers()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const isClient = useClientSideEffect()

    const initialSortConfig: SortConfig<User> = {
        key: 'username',
        direction: 'ascending',
    }
    const {
        items: sortedUsers,
        requestSort,
        sortConfig,
    } = useSortableData<User>(users, initialSortConfig)

    const filteredUsers = useMemo(() => {
        return sortedUsers.filter((user) =>
            user.email?.toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleSort = useCallback(
        (key: keyof User) => {
            requestSort(key)
            setCurrentPage(1)
        },
        [requestSort, setCurrentPage]
    )

    return (
        <>
            <div className="bg-gray-600">
                <Breadcrumb
                    pageName="Users Page"
                    minHeight="min-h-[200px]"

                    description="Admin user functionality"
                />
            </div>

            <CheckUserRole />

            <div className="flex min-h-screen bg-gray-100">
                <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        {loading ? (
                            <SkeletonUserTable />
                        ) : (
                            <>
                                <UserTable
                                    currentItems={currentItems}
                                    handleSort={handleSort}
                                    handleUsernameClick={handleUsernameClick}
                                    handleBanUser={handleBanUser}
                                    sortConfig={sortConfig}
                                    isClient={isClient}
                                />
                                <UsersPagination
                                    currentPage={currentPage}
                                    pageCount={pageCount}
                                    setCurrentPage={setCurrentPage}
                                    totalItems={filteredUsers.length}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            {selectedUser && (
                <AdminUserCard
                    selectedUser={selectedUser}
                    closeUserCard={closeUserCard}
                />
            )}
        </>
    )
}
