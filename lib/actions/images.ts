'use server'

import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db/db'

export const getUserImageCount = async (): Promise<number> => {
    const user = await currentUser()
    console.log(user)
    if (!user) return 0

    try {
        const count = await db.userImage.count({
            where: {
                userId: user.id
            }
        })

        console.log('Found image count:', count, 'for user:', user.id)
        return count
    } catch (error) {
        console.error('Error getting user image count:', error)
        return 0
    }
}