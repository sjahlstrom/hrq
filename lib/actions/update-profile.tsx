'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    try {
        const { userId } = auth()

        if (!userId) {
            return { success: false, message: 'User not authenticated' }
        }

        const formDataObj = Object.fromEntries(formData.entries())

        await db.user.upsert({
            where: {
                externalUserId: userId
            },
            create: {
                externalUserId: userId,
                bio: {
                    create: {
                        ...formDataObj,
                        birthday: formDataObj.birthday ? new Date(formDataObj.birthday as string) : null,
                    }
                }
            },
            update: {
                bio: {
                    upsert: {
                        create: {
                            ...formDataObj,
                            birthday: formDataObj.birthday ? new Date(formDataObj.birthday as string) : null,
                        },
                        update: {
                            ...formDataObj,
                            birthday: formDataObj.birthday ? new Date(formDataObj.birthday as string) : null,
                        },
                    },
                },
            },
        })

        revalidatePath('/profile')
        return { success: true, message: 'Profile updated successfully' }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to update profile'
        }
    }
}