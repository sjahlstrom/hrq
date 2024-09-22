import { useState, useEffect, useCallback } from 'react'
import { getUsers, banUser as apiBanUser, unBanUser as apiUnBanUser } from '@/app/api/users'

export interface User {
    username: string
    email: string
    paid_rq: boolean
    banned: boolean
    testCompleted: boolean
    summedTotal: number
    externalUserId: string
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers()
                setUsers(userData)
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const banUser = useCallback(async (externalUserId: string) => {
        try {
            await apiBanUser(externalUserId)
            setUsers(users => users.map(user =>
                user.externalUserId === externalUserId ? { ...user, banned: true } : user
            ))
        } catch (error) {
            console.error('Error banning user:', error)
        }
    }, [])

    const unBanUser = useCallback(async (externalUserId: string) => {
        try {
            await apiUnBanUser(externalUserId)
            setUsers(users => users.map(user =>
                user.externalUserId === externalUserId ? { ...user, banned: false } : user
            ))
        } catch (error) {
            console.error('Error unbanning user:', error)
        }
    }, [])

    return { users, loading, banUser, unBanUser }
}