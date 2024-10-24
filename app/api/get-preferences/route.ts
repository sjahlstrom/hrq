// import { NextResponse } from 'next/server'
// import { auth } from '@clerk/nextjs/server'
// import { db } from '@/lib/db'
//
// export async function GET(req: Request) {
//     try {
//         const { userId } = auth()
//         if (!userId) {
//             return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//         }
//
//         const user = await db.user.findUnique({
//             where: { externalUserId: userId },
//             include: { preferences: true },
//         })
//
//         if (!user || !user.preferences) {
//             return NextResponse.json({ preferences: null })
//         }
//
//         return NextResponse.json({ preferences: user.preferences })
//     } catch (error) {
//         console.error('Error fetching preferences:', error)
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//     }
// }

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function GET() {
    const { userId } = auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const preferences = await db.preferences.findUnique({
            where: { userId },
            select: {
                sex: true,
                gender: true,
                trans: true,
                age: true,
                postalCode: true,
                preferences: true,
                bio: true,
            },
        })

        if (!preferences) {
            return NextResponse.json({ preferences: null }, {
                headers: {
                    'Cache-Control': 'no-store',
                },
            })
        }

        return NextResponse.json({ preferences }, {
            headers: {
                'Cache-Control': 'no-store',
            },
        })
    } catch (error) {
        console.error('Error fetching user preferences:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, {
            status: 500,
            headers: {
                'Cache-Control': 'no-store',
            },
        })
    }
}