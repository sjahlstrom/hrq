import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db/db'

export async function POST() {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Find the user in db DB using the Clerk userId
        const user = await db.user.findUnique({
            where: {
                externalUserId: userId,
            },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // Update the user's TOS status in db
        await db.user.update({
            where: {
                id: user.id, // Using the db user ID
            },
            data: {
                tos: true,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to update TOS status:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}