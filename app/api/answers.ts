'use server'

import { db } from '@/lib/db'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export const calculateTestResponseAverage = async (
    userId: string
): Promise<number> => {
    // Fetch the user's testResponse array from the User model
    const user = await db.user.findUnique({
        where: { externalUserId: userId },
        select: { testResponse: true },
    })

    if (!user || !user.testResponse || user.testResponse.length === 0) {
        // Handle the case where the user is not found or testResponse is empty
        return 0
    }

    // Calculate the average of the testResponse array
    return user.testResponse.reduce((sum, value) => sum + value, 0)
}

export const getUsers = async () => {
    const user = await currentUser()

    try {
        return await db.user.findMany({
            // do not include the current user in the results
            where: {
                externalUserId: {
                    not: user?.id, // Exclude current user's externalUserId
                },
            },
            select: {
                username: true,
                id: true,
                externalUserId: true,
                paid_rq: true,
                banned: true,
                email: true,
                testCompleted: true,
            },
        })
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    } finally {
        await db.$disconnect()
    }
}

export interface UpdateTestUserProps {
    testResponse: number[]
    associatedScale: number
}

export const updateTestResponse = async ({
    testResponse,
    associatedScale,
}: UpdateTestUserProps): Promise<void> => {
    const user = await currentUser()

    if (!user) {
        console.error('No user found')
        return
    }

    try {
        await db.user.update({
            where: { externalUserId: user.id },
            data: {
                testResponse: {
                    push: testResponse, // Push values to testResponse array
                },
                associatedScale: {
                    push: [associatedScale], // Push value to associatedScale array
                },
            },
        })
    } catch (error) {
        console.error('Error updating user:', error)
    }
}

// Used for testing and eventually as an admin
export const deleteUserTestResponsesAndAssociatedScales =
    async (): Promise<void> => {
        const user = await currentUser()

        if (!user) {
            console.error('No user found')
            return
        }
        try {
            await db.user.update({
                where: { externalUserId: user.id },
                data: {
                    testResponse: { set: [] },
                    associatedScale: { set: [] },
                    testCompleted: false,
                },
            })
            console.log(
                'User test responses and associated scales deleted successfully'
            )
        } catch (error) {
            console.error(
                'Error deleting user test responses and associated scales:',
                error
            )
        }
    }

export const setTestCompleted = async (): Promise<boolean> => {
    const user = await currentUser()

    if (!user) {
        console.error('No user found')
        return false
    }

    try {
        await db.user.update({
            where: { externalUserId: user.id },
            data: { testCompleted: true },
        })
        return true
    } catch (error) {
        console.error('Error setting test completed flag:', error)
        return false
    }
}

export const getTestResponseLength = async (
    userId: string
): Promise<number | null> => {
    try {
        const user = await db.user.findUnique({
            where: { externalUserId: userId },
            select: {
                testResponse: true,
            },
        })

        return user?.testResponse.length ?? null
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}

export const getTestResponses = async (): Promise<number[]> => {
    try {
        const user = await currentUser()

        if (!user) {
            console.error('No user is currently logged in.')
            throw new Error('No user is currently logged in.')
        }

        // console.log('Fetching test responses for user:', user.id)

        const responses = await db.user.findUnique({
            where: { externalUserId: user.id }, // Assuming 'externalUserId' is the key in the DB
            select: { testResponse: true },
        })

        return responses?.testResponse || []
    } catch (error) {
        console.error('Error retrieving test responses:', error)
        throw error
    }
}

export const getUserRole = async (): Promise<string | null> => {
    const user = await currentUser()

    if (!user) {
        console.error('No user found')
        return null
    }

    try {
        const userData = await db.user.findUnique({
            where: { externalUserId: user.id }, // Assuming 'externalUserId' is the key
            select: { role: true }, // Assuming 'role' is the field in the DB
        })

        return userData?.role || null
    } catch (error) {
        console.error('Error retrieving user role:', error)
        return null
    }
}

export const banUser = async (externalUserId: string) => {

   if (!externalUserId) {
       throw new Error('No externalUserId provided')
   }

    try {
        const userToBan = await db.user.findUnique({
            where: { externalUserId: externalUserId },
        })

        if (!userToBan) {
            throw new Error('User not found')
        }

        // Ban user
        await clerkClient.users.banUser(externalUserId)
        revalidatePath("/users");

        // ban user in Prisma database
        await db.user.update({
            where: { externalUserId: externalUserId },
            data: { banned: true },
        })
        return true
    } catch (error) {
        console.error('Error banning user:', error)
    }
}

export const unBanUser = async (externalUserId: string) => {
    try {
        const userToBan = await db.user.findUnique({
            where: { externalUserId: externalUserId },
        })

        if (!userToBan) {
            throw new Error('User not found')
        }

        // Ban user
        await clerkClient.users.unbanUser(externalUserId)
         revalidatePath("/users");

        // ban user in Prisma database
        await db.user.update({
            where: { externalUserId: externalUserId },
            data: { banned: false },
        })
        return true
    } catch (error) {
        console.error('Error unBanning user:', error)
    }
}

export const isBanned = async (user) => {
    try {
        const bannedUser = await db.user.findUnique({
            where: { externalUserId: user.externalUserId },
        });

        if (!bannedUser) {
            throw new Error('User not found');
        }

        return bannedUser.banned;
    } catch (error) {
        console.error('Error checking if user is banned:', error);
        return false;
    }
};
