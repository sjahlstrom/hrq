'use server'

import { db } from '@/lib/db/db'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { UserRole } from '@prisma/client'

type UserCacheType = {
    [userId: string]: {
        testResponse: number[];
        associatedScale: number[];
        role: UserRole | null;
        testCompleted: boolean;
        summedTotal: number | null;
    }
}

const userCache: UserCacheType = {}

const getCachedUserData = cache(async (userId: string) => {
    if (userId in userCache) {
        return userCache[userId]
    }

    const userData = await db.user.findUnique({
        where: { externalUserId: userId },
        select: {
            testResponse: true,
            associatedScale: true,
            role: true,
            testCompleted: true,
            summedTotal: true,
        },
    })

    if (userData) {
        userCache[userId] = {
            ...userData,
            summedTotal: userData.summedTotal ?? null,
        }
        return userCache[userId]
    }

    return null
})

export const calculateTestResponseAverage = async (userId: string): Promise<number> => {
    const userData = await getCachedUserData(userId)
    if (!userData?.testResponse?.length) return 0

    const responses = userData.testResponse
    return responses.reduce((sum, value) => sum + value, 0) / responses.length
}

export const getUsers = async () => {
    const user = await currentUser()
    if (!user) throw new Error('No user is currently logged in.')

    try {
        return await db.user.findMany({
            where: { externalUserId: { not: user.id } },
            select: {
                username: true,
                id: true,
                externalUserId: true,
                banned: true,
                email: true,
                testCompleted: true,
                testResponse: true,
                summedTotal: true,
                paid_rq: true,
                paid_cq: true,
                role: true,
            },
        })
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}

export interface UpdateTestUserProps {
    testResponse: number[]
    associatedScale: number
}

export const updateTestResponse = async ({ testResponse, associatedScale }: UpdateTestUserProps): Promise<void> => {
    const user = await currentUser()
    if (!user) throw new Error('No user found')

    try {
        await db.user.update({
            where: { externalUserId: user.id },
            data: {
                testResponse: { push: testResponse },
                associatedScale: { push: [associatedScale] },
            },
        })

        // Invalidate cache for this user
        if (user.id in userCache) {
            delete userCache[user.id]
        }
    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}

export const deleteUserTestResponsesAndAssociatedScales = async (): Promise<void> => {
    const user = await currentUser()
    if (!user) throw new Error('No user found')

    try {
        await db.user.update({
            where: { externalUserId: user.id },
            data: {
                testResponse: { set: [] },
                associatedScale: { set: [] },
                summedTotal: 0,
                testCompleted: false,
            },
        })

        // Invalidate cache for this user
        if (user.id in userCache) {
            delete userCache[user.id]
        }
    } catch (error) {
        console.error('Error deleting user test responses and associated Scales:', error)
        throw error
    }
}

export const setTestCompleted = async (): Promise<boolean> => {
    const user = await currentUser()
    if (!user) return false

    try {
        await db.user.update({
            where: { externalUserId: user.id },
            data: { testCompleted: true },
        })

        const cacheEntry = userCache[user.id]
        if (cacheEntry) {
            cacheEntry.testCompleted = true
        }

        return true
    } catch (error) {
        console.error('Error setting test completed flag:', error)
        return false
    }
}

export const setSummedTotals = async (average: number): Promise<boolean> => {
    const user = await currentUser()
    if (!user) return false

    try {
        const userData = await getCachedUserData(user.id)
        if (!userData?.testCompleted) {
            console.error('Cannot set test average: Test not completed.')
            return false
        }

        await db.user.update({
            where: { externalUserId: user.id },
            data: { summedTotal: average },
        })

        const cacheEntry = userCache[user.id]
        if (cacheEntry) {
            cacheEntry.summedTotal = average
        }

        return true
    } catch (error) {
        console.error('Error setting testAverage:', error)
        return false
    }
}

export const getTestResponseLength = async (userId: string): Promise<number> => {
    const userData = await getCachedUserData(userId)
    return userData?.testResponse?.length ?? 0
}

export const getTestResponses = async (): Promise<number[]> => {
    const user = await currentUser()
    if (!user) throw new Error('No user is currently logged in.')

    const userData = await getCachedUserData(user.id)
    return userData?.testResponse ?? []
}

export const getUserRole = async (): Promise<UserRole | null> => {
    const user = await currentUser()
    if (!user) return null

    const userData = await getCachedUserData(user.id)
    return userData?.role ?? null
}

export const setUserAdmin = async (externalUserId: string, isAdmin: boolean): Promise<boolean> => {
    if (!externalUserId) throw new Error('No externalUserId provided')

    try {
        const userToUpdate = await db.user.findUnique({
            where: { externalUserId },
        })
        if (!userToUpdate) throw new Error('User not found')

        await db.user.update({
            where: { externalUserId },
            data: {
                role: isAdmin ? UserRole.ADMIN : UserRole.USER
            },
        })

        await clerkClient().users.updateUser(externalUserId, {
            publicMetadata: { role: isAdmin ? 'ADMIN' : 'USER' }
        })

        // Invalidate cache for this user
        if (externalUserId in userCache) {
            delete userCache[externalUserId]
        }

        revalidatePath('/users')
        return true
    } catch (error) {
        console.error('Error updating user admin status:', error)
        throw error
    }
}

export const banUser = async (externalUserId: string): Promise<boolean> => {
    if (!externalUserId) throw new Error('No externalUserId provided')

    try {
        const userToBan = await db.user.findUnique({
            where: { externalUserId },
        })
        if (!userToBan) throw new Error('User not found')

        await db.user.update({
            where: { externalUserId },
            data: { banned: true },
        })

        await clerkClient().users.updateUser(externalUserId, {
            publicMetadata: { banned: true }
        })

        // Invalidate cache for this user
        if (externalUserId in userCache) {
            delete userCache[externalUserId]
        }

        revalidatePath('/users')
        return true
    } catch (error) {
        console.error('Error banning user:', error)
        throw error
    }
}

export const unBanUser = async (externalUserId: string): Promise<boolean> => {
    if (!externalUserId) throw new Error('No externalUserId provided')

    try {
        const userToUnban = await db.user.findUnique({
            where: { externalUserId },
        })
        if (!userToUnban) throw new Error('User not found')

        await db.user.update({
            where: { externalUserId },
            data: { banned: false },
        })

        await clerkClient().users.updateUser(externalUserId, {
            publicMetadata: { banned: false }
        })

        // Invalidate cache for this user
        if (externalUserId in userCache) {
            delete userCache[externalUserId]
        }

        revalidatePath('/users')
        return true
    } catch (error) {
        console.error('Error unBanning user:', error)
        throw error
    }
}

export const sumTestResponsesAtPositions = async (positions: [number, number]): Promise<number> => {
    const user = await currentUser()
    if (!user) throw new Error('No user is currently logged in.')

    const userData = await getCachedUserData(user.id)
    if (!userData?.testResponse) {
        throw new Error('No test responses found for the user.')
    }

    const [index1, index2] = positions
    const responses = userData.testResponse

    if (
        index1 >= responses.length ||
        index2 >= responses.length ||
        responses[index1] === undefined ||
        responses[index2] === undefined
    ) {
        throw new Error('Position indices out of bounds.')
    }

    const value1 = responses[index1]
    const value2 = responses[index2]

    return value1 + value2
}

export const addPaymentToSummedTotal = async (paymentAmount: number): Promise<boolean> => {
    const user = await currentUser()
    if (!user) return false

    try {
        const userData = await getCachedUserData(user.id)
        const currentTotal = userData?.summedTotal ?? 0
        const newTotal = currentTotal + paymentAmount

        await db.user.update({
            where: { externalUserId: user.id },
            data: { summedTotal: newTotal },
        })

        const cacheEntry = userCache[user.id]
        if (cacheEntry) {
            cacheEntry.summedTotal = newTotal
        }

        return true
    } catch (error) {
        console.error('Error updating summedTotal with payment:', error)
        return false
    }
}

export const clearUserResponseCache = async (userId: string): Promise<void> => {
    if (userId in userCache) {
        delete userCache[userId]
    }
    await new Promise(resolve => setTimeout(resolve, 0))
}

export async function batchSumTestResponses(positions: Array<[number, number]>): Promise<Record<string, number>> {
    try {
        const results: Record<string, number> = {};

        // Process each position pair
        for (const [start, end] of positions) {
            const key = `${start},${end}`;
            // Sum values between start and end positions
            // Replace this with your actual database query
            const sum = 0; // Your actual sum calculation here
            results[key] = sum;
        }

        return results;
    } catch (error) {
        console.error('Error in batchSumTestResponses:', error);
        throw new Error('Failed to fetch test responses');
    }
}