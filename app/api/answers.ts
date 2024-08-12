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

    try {
        await db.user.update({
            where: { externalUserId: user?.id },
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

export const deleteUserTestResponsesAndAssociatedScales = async () => {
    const user = await currentUser()

    try {
        // Update the user to clear the testResponse and associatedScale fields
        await db.user.update({
            where: { id: user?.id },
            data: {
                testResponse: { set: [] },
                associatedScale: { set: [] },
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

export const clearAnswersArray = async (id) => {
    try {
        const updatedResponse = await prisma.sampleResponse.update({
            where: { id: id },
            data: { answers: [] },
        })
        console.log('Answers array cleared:', updatedResponse)
        return updatedResponse
    } catch (error) {
        console.error('Error clearing answers array:', error)
    }
}

export const getSampleResponseId = async () => {
    try {
        let sampleResponse = await prisma.sampleResponse.findFirst()

        if (sampleResponse) {
            console.log('SampleResponse ID:', sampleResponse.id)
            return sampleResponse.id
        } else {
            console.log('No SampleResponse found, creating a new one')
            sampleResponse = await prisma.sampleResponse.create({
                data: {
                    // Provide any required fields for creation here
                },
            })
            console.log('Created SampleResponse ID:', sampleResponse.id)
            return sampleResponse.id
        }
    } catch (error) {
        console.error('Error fetching or creating SampleResponse:', error)
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
            data: {
                testCompleted: true,
            },
        })
        return true
    } catch (error) {
        console.error('Error setting test completed flag:', error)
        return false
    }
}

export const isTestCompleted = async (): Promise<boolean> => {
    const user = await currentUser();

    if (!user) {
        console.error('No user found');
        return false;
    }

    try {
        const foundUser = await db.user.findUnique({
            where: { externalUserId: user.id },
            select: { testCompleted: true },
        });

        return foundUser?.testCompleted ?? false;
    } catch (error) {
        console.error('Error checking test completed flag:', error);
        return false;
    }
};


interface GetTestResponseLength {
    (userId: string): Promise<number | null>
}
export const getTestResponseLength: GetTestResponseLength = async (
    userId: string
): Promise<number | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { externalUserId: userId },
            select: {
                testCompleted: false,
                testResponse: true,
            },
        })

        if (user) {
            return user.testResponse.length
        }

        return null
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}

export interface UpdateSampleQuestionProps {
    testResponse: number[]
    id: string
}

export const updateSampleQuestion = async ({
    testResponse,
    id,
}: UpdateSampleQuestionProps): Promise<void> => {
    try {
        const updatedResponse = await prisma.sampleResponse.update({
            where: { id: id },
            data: {
                answers: {
                    push: testResponse,
                },
            },
        })
    } catch (error) {
        console.error('Error adding value to answers array:', error)
    }
}

export const getSampleResponseAnswers = async (): Promise<number[] | null> => {
    try {
        const sampleResponse = await db.sampleResponse.findFirst({
            select: { answers: true },
        });

        if (sampleResponse) {
            return sampleResponse.answers;
        }

        console.log('No SampleResponse found');
        return null;
    } catch (error) {
        console.error('Error retrieving SampleResponse answers:', error);
        return null;
    }
};

