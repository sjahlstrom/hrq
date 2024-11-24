import { useState, useEffect, useCallback } from 'react'
import { getUsers, banUser as apiBanUser, unBanUser as apiUnBanUser } from '@/app/api/users'

export interface User {
    id: string
    username: string | null
    email: string | null
    paid_rq: boolean
    paid_cq: boolean
    banned: boolean
    testCompleted: boolean
    summedTotal: number | null
    externalUserId: string
    testResponse: number[]
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers()
                setUsers(userData)
                setError(null)
            } catch (error) {
                console.error('Error fetching users:', error)
                setError('Failed to fetch users')
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const banUser = useCallback(async (externalUserId: string) => {
        try {
            const success = await apiBanUser(externalUserId)
            if (success) {
                setUsers(users => users.map(user =>
                    user.externalUserId === externalUserId ? { ...user, banned: true } : user
                ))
                setError(null)
            }
        } catch (error) {
            console.error('Error banning user:', error)
            setError('Failed to ban user. Please try again.')
            // Optionally, you could throw the error here if you want to handle it in the component
            throw new Error('Failed to ban user')
        }
    }, [])

    const unBanUser = useCallback(async (externalUserId: string) => {
        try {
            const success = await apiUnBanUser(externalUserId)
            if (success) {
                setUsers(users => users.map(user =>
                    user.externalUserId === externalUserId ? { ...user, banned: false } : user
                ))
                setError(null)
            }
        } catch (error) {
            console.error('Error unbanning user:', error)
            setError('Failed to unban user. Please try again.')
            throw new Error('Failed to unban user')
        }
    }, [])

    return { users, loading, error, banUser, unBanUser }
}