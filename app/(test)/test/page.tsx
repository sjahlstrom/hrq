import { currentUser } from '@clerk/nextjs/server'
import { getTestResponseLength } from '@/app/api/users'
import { db } from '@/lib/db'
import TestPageClient from './TestPageClient'

export const metadata = {
    title: "Test Page",
}

const TestPage = async () => {
    const user = await currentUser()

    let length = 0
    let tosAccepted = false

    if (user) {
        const userId = user.id
        const responseLength = await getTestResponseLength(userId)
        length = responseLength ?? 0

        // Get user's TOS status from db
        const dbUser = await db.user.findUnique({
            where: {
                externalUserId: userId
            },
            select: {
                tos: true
            }
        })

        tosAccepted = dbUser?.tos ?? false
    }

    return <TestPageClient
        initialQuestionNumber={length}
        tosAccepted={tosAccepted}
    />
}

export default TestPage