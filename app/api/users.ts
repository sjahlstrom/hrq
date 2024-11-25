'use server'

import { db } from '@/lib/db'
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
    if (userCache[userId]) {
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
    }

    return userCache[userId] || null
})

export const calculateTestResponseAverage = async (userId: string): Promise<number> => {
    const userData = await getCachedUserData(userId)
    if (!userData || userData.testResponse.length === 0) return 0
    return userData.testResponse.reduce((sum, value) => sum + value, 0) / userData.testResponse.length
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
        delete userCache[user.id]
    } catch (error) {
        console.error('Error updating user:', error)
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
        delete userCache[user.id]
        console.log('User test responses and associated Scales deleted successfully')
    } catch (error) {
        console.error('Error deleting user test responses and associated Scales:', error)
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

        const cachedUser = userCache[user.id]
        if (cachedUser) {
            cachedUser.testCompleted = true
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

        const cachedUserData = userCache[user.id]
        if (typeof cachedUserData !== 'undefined') {
            cachedUserData.summedTotal = average
        }

        return true
    } catch (error) {
        console.error('Error setting testAverage:', error)
        return false
    }
}

export const getTestResponseLength = async (userId: string): Promise<number> => {
    const userData = await getCachedUserData(userId)
    return userData?.testResponse.length ?? 0
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

export const setUserAdmin = async (externalUserId: string, isAdmin: boolean) => {
    if (!externalUserId) throw new Error('No externalUserId provided')

    try {
        const userToUpdate = await db.user.findUnique({
            where: { externalUserId: externalUserId },
        })
        if (!userToUpdate) throw new Error('User not found')

        await db.user.update({
            where: { externalUserId: externalUserId },
            data: {
                role: isAdmin ? UserRole.ADMIN : UserRole.USER
            },
        })

        await clerkClient().users.updateUser(externalUserId, {
            publicMetadata: { role: isAdmin ? 'ADMIN' : 'USER' }
        })

        delete userCache[externalUserId]
        revalidatePath('/users')
        return true
    } catch (error) {
        console.error('Error updating user admin status:', error)
        throw error
    }
}

export const banUser = async (externalUserId: string) => {
    if (!externalUserId) throw new Error('No externalUserId provided')

    try {
        const userToBan = await db.user.findUnique({
            where: { externalUserId: externalUserId },
        })
        if (!userToBan) throw new Error('User not found')

        await db.user.update({
            where: { externalUserId: externalUserId },
            data: { banned: true },
        })

        await clerkClient().users.updateUser(externalUserId, {
            publicMetadata: { banned: true }
        })

        delete userCache[externalUserId]
        revalidatePath('/users')
        return true
    } catch (error) {
        console.error('Error banning user:', error)
        throw error
    }
}

export const unBanUser = async (externalUserId: string) => {
    try {
        const userToUnban = await db.user.findUnique({
            where: { externalUserId: externalUserId },
        })
        if (!userToUnban) throw new Error('User not found')

        await db.user.update({
            where: { externalUserId: externalUserId },
            data: { banned: false },
        })

        await clerkClient().users.updateUser(externalUserId, {
            publicMetadata: { banned: false }
        })

        delete userCache[externalUserId]
        revalidatePath('/users')
        return true
    } catch (error) {
        console.error('Error unBanning user:', error)
        throw error
    }
}

interface UserData {
    testResponse: number[];
}
let cachedUserData: UserData | null = null;

let x = 0;
export const sumTestResponsesAtPositions = async (positions: [number, number]): Promise<number> => {
    if (!cachedUserData) {
        const user = await currentUser();

        if (process.env.NODE_ENV === 'development') {
            console.log("In sumTestResponsesAtPositions ", x);
        }

        if (!user) throw new Error('No user is currently logged in.');

        cachedUserData = await getCachedUserData(user.id);
        if (!cachedUserData || cachedUserData.testResponse.length === 0) {
            throw new Error('No test responses found for the user.');
        }
    }

    const [index1, index2] = positions;
    const value1 = cachedUserData.testResponse[index1];
    const value2 = cachedUserData.testResponse[index2];

    if (typeof value1 !== 'number' || typeof value2 !== 'number') {
        throw new Error('Invalid test response values at the specified positions.');
    }

    return value1 + value2;
};

export const clearUserResponseCache = async (userId: string): Promise<void> => {
    delete userCache[userId]
    await new Promise(resolve => setTimeout(resolve, 0))
}