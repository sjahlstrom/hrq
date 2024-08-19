'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

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
        const user = await currentUser();

        if (!user) {
            console.error("No user is currently logged in.");
            throw new Error("No user is currently logged in.");
        }

        console.log('Fetching test responses for user:', user.id);

        const responses = await db.user.findUnique({
            where: { externalUserId: user.id },  // Assuming 'externalUserId' is the key in the DB
            select: { testResponse: true },
        });

        // console.log('Retrieved Test Responses:', testResponses);

        return responses?.testResponse || [];
    } catch (error) {
        console.error("Error retrieving test responses:", error);
        throw error;
    }
};


