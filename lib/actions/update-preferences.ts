'use server'

import { db } from '@/lib/db/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export type SavePreferencesResult = {
    success: boolean;
    error?: string;
}

export async function savePreferences(formData: FormData): Promise<SavePreferencesResult> {
    const { userId: externalUserId } = await auth()

    // Check for undefined or null user ID and return an error early
    if (!externalUserId) {
        return { success: false, error: 'Authentication failed. User ID not found.' }
    }

    const preferences = {
        education: formData.get('education') as string,
        incomeRange: formData.get('incomeRange') as string,
        maritalStatus: formData.get('maritalStatus') as string,
        relationshipTypeWanted: formData.get('relationshipTypeWanted') as string,
        biologicalSex: formData.get('biologicalSex') as string,
        gender: formData.get('gender') as string,
        race: formData.get('race') as string,
        age: formData.get('age') as string,
        dateSmoker: formData.get('dateSmoker') as string,
        dateDrinker: formData.get('dateDrinker') as string,
        dateMarijuanaUser: formData.get('dateMarijuanaUser') as string,
        hasChildren: formData.get('hasChildren') as string,
        religion: formData.get('religion') as string,
        primaryLanguage: formData.get('primaryLanguage') as string,
    }

    try {
        // Find the user by externalUserId, which is guaranteed to be a string at this point
        const user = await db.user.findUnique({
            where: { externalUserId },
        })

        if (!user) {
            return { success: false, error: 'User not found' }
        }

        // If the user exists, proceed with the upsert operation
        await db.preferences.upsert({
            where: { userId: user.id },
            update: preferences,
            create: { ...preferences, userId: user.id },
        })

        revalidatePath('/Preferences')
        return { success: true }
    } catch (error) {
        console.error('Failed to save Preferences:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                return { success: false, error: 'User account not found. Please ensure your account is set up correctly.' }
            }
        }

        return { success: false, error: 'Failed to save Preferences. Please try again later.' }
    }
}
