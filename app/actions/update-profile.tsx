'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const { userId } = auth()

    if (!userId) {
        return { success: false, message: 'User not authenticated' }
    }

    const occupation = formData.get('occupation') as string | null
    const education = formData.get('education') as string | null
    const incomeRange = formData.get('incomeRange') as string | null
    const postalCode = formData.get('postalCode') as string | null
    const areaCode = formData.get('areaCode') as string | null
    const birthday = formData.get('birthday') as string | null
    const maritalStatus = formData.get('maritalStatus') as string | null
    const relationshipTypeWanted = formData.get('relationshipTypeWanted') as string | null
    const biologicalSex = formData.get('biologicalSex') as string | null
    const gender = formData.get('gender') as string | null
    const race = formData.get('race') as string | null
    const smoker = formData.get('smoker') as string | null
    const dateSmoker = formData.get('dateSmoker') as string | null
    const drugs = formData.get('drugs') as string | null
    const dateMarijuanaUser = formData.get('dateMarijuanaUser') as string | null
    const haveChildren = formData.get('haveChildren') as string | null
    const dateSomeoneWithKids = formData.get('dateSomeoneWithKids') as string | null
    const religion = formData.get('religion') as string | null
    const primaryLanguage = formData.get('primaryLanguage') as string | null
    const otherLanguages = formData.get('otherLanguages') as string | null
    const aboutYourself = formData.get('aboutYourself') as string | null

    try {
        await db.user.update({
            where: { externalUserId: userId },
            data: {
                bio: {
                    upsert: {
                        create: {
                            occupation,
                            education,
                            incomeRange,
                            postalCode,
                            areaCode,
                            birthday: birthday ? new Date(birthday) : null,
                            maritalStatus,
                            relationshipTypeWanted,
                            biologicalSex,
                            gender,
                            race,
                            smoker,
                            dateSmoker,
                            drugs,
                            dateMarijuanaUser,
                            haveChildren,
                            dateSomeoneWithKids,
                            religion,
                            primaryLanguage,
                            otherLanguages,
                            aboutYourself,
                        },
                        update: {
                            occupation,
                            education,
                            incomeRange,
                            postalCode,
                            areaCode,
                            birthday: birthday ? new Date(birthday) : null,
                            maritalStatus,
                            relationshipTypeWanted,
                            biologicalSex,
                            gender,
                            race,
                            smoker,
                            dateSmoker,
                            drugs,
                            dateMarijuanaUser,
                            haveChildren,
                            dateSomeoneWithKids,
                            religion,
                            primaryLanguage,
                            otherLanguages,
                            aboutYourself,
                        },
                    },
                },
            },
        })

        revalidatePath('/profile')
        return { success: true, message: 'profile updated successfully' }
    } catch (error) {
        console.error('Error updating profile:', error)
        return { success: false, message: 'Failed to update profile' }
    }
}