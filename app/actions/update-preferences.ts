'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function savePreferences(formData: FormData) {
    const { userId: externalUserId } = await auth()

    if (!externalUserId) {
        return { error: 'Not authenticated' }
    }

    const preferences = {
        education: formData.get('education') as string,
        incomeRange: formData.get('income') as string,
        maritalStatus: formData.get('maritalStatus') as string,
        relationshipTypeWanted: formData.get('relationshipType') as string,
        biologicalSex: formData.get('biologicalSex') as string,
        gender: formData.get('gender') as string,
        race: formData.get('race') as string,
        dateSmoker: formData.get('dateSmoker') as string,
        dateDrinker: formData.get('dateDrinker') as string,
        dateMarijuanaUser: formData.get('dateMarijuanaUser') as string,
        haveChildren: formData.get('children') as string,
        dateSomeoneWithKids: formData.get('dateSomeoneWithKids') as string,
        primaryLanguage: formData.get('primaryLanguage') as string,
    }

    try {
        // Find the user by externalUserId
        const user = await db.user.findUnique({
            where: { externalUserId },
        })

        if (!user) {
            return { error: 'User not found' }
        }

        // If the user exists, proceed with the upsert operation
        await db.preferences.upsert({
            where: { userId: user.id },
            update: preferences,
            create: { ...preferences, userId: user.id },
        })

        revalidatePath('/preferences')
        return { success: true }
    } catch (error) {
        console.error('Failed to save preferences:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                return { error: 'User account not found. Please ensure your account is set up correctly.' }
            }
        }

        return { error: 'Failed to save preferences. Please try again later.' }
    }
}