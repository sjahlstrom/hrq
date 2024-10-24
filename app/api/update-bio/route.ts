import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import {db} from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { externalUserId, biologicalSex, genderIdentity, transgenderStatus, age, postalCode, partnerPreferences, aboutYourself } = body

        const user = await db.user.upsert({
            where: { externalUserId },
            update: {},
            create: { externalUserId },
        })

        const preferences = await db.preferences.upsert({
            where: { userId: user.id },
            update: {
                age,
                postalCode, // Now storing postalCode as a string
                sex: biologicalSex,
                gender: genderIdentity,
                trans: transgenderStatus,
                preferences: partnerPreferences,
                bio: aboutYourself,
            },
            create: {
                userId: user.id,
                age,
                postalCode, // Now storing postalCode as a string
                sex: biologicalSex,
                gender: genderIdentity,
                trans: transgenderStatus,
                preferences: partnerPreferences,
                bio: aboutYourself,
            },
        })

        return NextResponse.json({ success: true, user, preferences })
    } catch (error) {
        console.error('Error updating preferences:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}