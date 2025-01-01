import UserCard from '@/components/(dating)/Profile/UserCard/userCard'
import PreferencesCard from './preferencesCard'
import Breadcrumb from '@/components/common/bread-crumb'
import { db } from '@/lib/db/db'
import { notFound } from 'next/navigation'

interface ProfilePageProps {
    params: {
        userId: string
    }
}

async function getUserPreferences(userId: string) {
    try {
        const preferences = await db.preferences.findUnique({
            where: {
                userId: userId
            }
        })
        return preferences
    } catch (error) {
        console.error('Error fetching preferences:', error)
        return null
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    if (!params.userId) {
        notFound()
    }

    const preferences = await getUserPreferences(params.userId)

    return (
        <div>
            <Breadcrumb
                pageName="User Profile"
                minHeight="min-h-[200px]"
                description="All about me and the partner I'm looking for"
            />
            <div className=" mx-auto -mt-24">
                <div className="bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-800  space-y-6">
                    <UserCard userId={params.userId} />
                    <PreferencesCard preferences={preferences} />
                </div>
            </div>
        </div>
    )
}