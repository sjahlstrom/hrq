// 'use client'
//
// import React, { useEffect, useState, useRef } from 'react'
// import { banUser, getUsers, unBanUser } from '@/app/api/users'
// import Sidebar from '@/app/(admin)/admin/_components/Sidebar'
// import { useRouter } from 'next/navigation'
//
// interface User {
//     username: string
//     email: string
//     paid_rq: boolean
//     banned: boolean
//     testCompleted: boolean
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
//     const [rowsPerPage] = useState(10)
//
//     const searchInputRef = useRef<HTMLInputElement | null>(null)
//     const router = useRouter()
//
//     const fetchUsers = async () => {
//         setLoading(true)
//         try {
//             const userData: User[] = await getUsers()
//             console.log('Fetched Users:', userData) // Log fetched data
//             setUsers(userData)
//         } catch (error) {
//             console.error('Error fetching users:', error)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     useEffect(() => {
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
//     const filteredUsers = users.filter((user) =>
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//
//     // Calculate pagination
//     const indexOfLastUser = currentPage * rowsPerPage
//     const indexOfFirstUser = indexOfLastUser - rowsPerPage
//     const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
//
//     const handleSort = (key: keyof User) => {
//         let direction: 'asc' | 'desc' = 'asc'
//
//         if (
//             sortConfig &&
//             sortConfig.key === key &&
//             sortConfig.direction === 'asc'
//         ) {
//             direction = 'desc'
//         }
//
//         setSortConfig({ key, direction })
//
//         const sortedFilteredUsers = [...filteredUsers].sort((a, b) => {
//             if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
//             if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
//             return 0
//         })
//
//         setUsers(sortedFilteredUsers)
//     }
//
//     // Pagination Controls
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
//     return (
//         <div className="flex h-screen">
//             <div className="mt-24 rounded bg-pantone624 hidden md:block h-[88vh] w-[260px]">
//                 <Sidebar />
//             </div>
//
//             <div className="flex flex-col w-full mt-24 px-4">
//                 {/* Search Bar */}
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="Search by email (flakey, but deal with it)"
//                         className="bg-pantone624 placeholder-pantone621 text-gray-700 w-full px-4 py-2 border border-gray-500 rounded-md"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         ref={searchInputRef}
//                     />
//                 </div>
//
//                 {/* User Table */}
//                 <table className="w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th
//                                 onClick={() => handleSort('username')}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                             >
//                                 Username{' '}
//                                 {sortConfig?.key === 'username'
//                                     ? sortConfig.direction === 'asc'
//                                         ? '↑'
//                                         : '↓'
//                                     : ''}
//                             </th>
//                             <th
//                                 onClick={() => handleSort('email')}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                             >
//                                 Email{' '}
//                                 {sortConfig?.key === 'email'
//                                     ? sortConfig.direction === 'asc'
//                                         ? '↑'
//                                         : '↓'
//                                     : ''}
//                             </th>
//                             <th
//                                 onClick={() => handleSort('paid_rq')}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                             >
//                                 Paid RQ{' '}
//                                 {sortConfig?.key === 'paid_rq'
//                                     ? sortConfig.direction === 'asc'
//                                         ? '↑'
//                                         : '↓'
//                                     : ''}
//                             </th>
//                             <th
//                                 onClick={() => handleSort('testCompleted')}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                             >
//                                 Test Completed{' '}
//                                 {sortConfig?.key === 'testCompleted'
//                                     ? sortConfig.direction === 'asc'
//                                         ? '↑'
//                                         : '↓'
//                                     : ''}
//                             </th>
//                             <th
//                                 onClick={() => handleSort('banned')}
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                             >
//                                 Banned{' '}
//                                 {sortConfig?.key === 'banned'
//                                     ? sortConfig.direction === 'asc'
//                                         ? '↑'
//                                         : '↓'
//                                     : ''}
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentUsers.length === 0 ? (
//                             <tr>
//                                 <td
//                                     colSpan={6}
//                                     className="px-6 py-4 text-center text-sm text-gray-500"
//                                 >
//                                     No results found.
//                                 </td>
//                             </tr>
//                         ) : (
//                             currentUsers.map((user, index) => (
//                                 <tr
//                                     key={index}
//                                     className={
//                                         index % 2 === 0
//                                             ? 'bg-pantone621'
//                                             : 'bg-pantone622'
//                                     }
//                                 >
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                         {user.username}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
//                                         {user.email}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {user.paid_rq ? 'Yes' : 'No'}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
//                                         {user.testCompleted ? 'Yes' : 'No'}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         {user.banned ? 'Yes' : 'No'}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         <button
//                                             className="text-red-500 hover:underline"
//                                             onClick={() => handleBanUser(user)}
//                                         >
//                                             {user.banned ? 'Unban' : 'Ban'}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//
//                 {/* Pagination Controls */}
//                 <div className="mt-4 flex justify-between items-center">
//                     <button
//                         className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md ${
//                             currentPage === 1
//                                 ? 'opacity-50 cursor-not-allowed'
//                                 : 'hover:bg-gray-400'
//                         }`}
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <span>
//                         Page {currentPage} of {pageCount}
//                     </span>
//                     <button
//                         className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md ${
//                             currentPage === pageCount
//                                 ? 'opacity-50 cursor-not-allowed'
//                                 : 'hover:bg-gray-400'
//                         }`}
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === pageCount}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default UsersComponent

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { banUser, getUsers, unBanUser } from '@/app/api/users';
import Sidebar from '@/app/(admin)/admin/_components/Sidebar';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    email: string;
    paid_rq: boolean;
    banned: boolean;
    testCompleted: boolean;
    externalUserId: string;
}

const UsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof User;
        direction: 'asc' | 'desc';
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);

    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const userData: User[] = await getUsers();
                console.log('Fetched Users:', userData); // Log fetched data
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [sortConfig]);

    const handleBanUser = async (user: User) => {
        const originalUsers = [...users];
        try {
            const updatedUsers = users.map((u) =>
                u.externalUserId === user.externalUserId
                    ? { ...u, banned: !u.banned }
                    : u
            );
            setUsers(updatedUsers);

            if (!user.banned) {
                console.log('Banning user with externalUserId:', user.externalUserId);
                await banUser(user.externalUserId);
            } else {
                console.log('Unbanning user with externalUserId:', user.externalUserId);
                await unBanUser(user.externalUserId);
            }

            router.refresh(); // Refresh after the action completes
        } catch (error) {
            console.error('Error banning/unbanning user:', error);
            setUsers(originalUsers); // Rollback if the request fails
        }
    };

    const handleSort = (key: keyof User) => {
        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setUsers(sortedUsers);
    };

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage);

            // Refocus the search input after changing the page
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }
    };

    return (
        <div className="flex h-screen">
            <div className="mt-24 rounded bg-pantone624 hidden md:block h-[88vh] w-[260px]">
                <Sidebar />
            </div>

            <div className="flex flex-col w-full mt-24 px-4">
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by email (flakey, but deal with it)"
                        className="bg-pantone624 placeholder-pantone621 text-gray-700 w-full px-4 py-2 border border-gray-500 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        ref={searchInputRef}
                    />
                </div>

                {/* User Table */}
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {['username', 'email', 'paid_rq', 'testCompleted', 'banned'].map((key) => (
                            <th
                                key={key}
                                onClick={() => handleSort(key as keyof User)}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                                {sortConfig?.key === key
                                    ? sortConfig.direction === 'asc'
                                        ? '↑'
                                        : '↓'
                                    : ''}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                                No results found.
                            </td>
                        </tr>
                    ) : (
                        currentUsers.map((user, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.paid_rq ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
                                    {user.testCompleted ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.banned ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleBanUser(user)}
                                    >
                                        {user.banned ? 'Unban' : 'Ban'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                        }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {pageCount}
                    </span>
                    <button
                        className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md ${
                            currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                        }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pageCount}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersComponent;
