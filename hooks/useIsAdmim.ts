import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { getUserRole } from '@/app/api/users'

export function useIsAdmin() {
    const { isSignedIn, isLoaded } = useUser()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        async function checkAdminStatus() {
            if (isSignedIn) {
                try {
                    const userRole = await getUserRole()
                    setIsAdmin(userRole === 'ADMIN')
                } catch (error) {
                    console.error('Error checking admin status:', error)
                    setIsAdmin(false)
                }
            } else {
                setIsAdmin(false)
            }
        }

        if (isLoaded) {
            checkAdminStatus()
        }
    }, [isSignedIn, isLoaded])

    return isAdmin
}