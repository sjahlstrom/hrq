import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db/db'
import Breadcrumb from '@/components/common/bread-crumb'
import { Metadata } from 'next'
import PreferencesForm, {
    PreferencesData,
} from '@/components/(dating)/Preferences/PreferencesForm'

export const metadata: Metadata = {
    title: 'Preferences',
}

// Function to transform database result to PreferencesData
function transformToPreferencesData(
    dbPreferences: any
): PreferencesData | null {
    if (!dbPreferences) return null

    return {
        id: dbPreferences.id,
        userId: dbPreferences.userId,
        education: dbPreferences.education,
        incomeRange: dbPreferences.incomeRange,
        maritalStatus: dbPreferences.maritalStatus,
        relationshipTypeWanted: dbPreferences.relationshipTypeWanted,
        biologicalSex: dbPreferences.biologicalSex,
        gender: dbPreferences.gender,
        race: dbPreferences.race,
        age: dbPreferences.age,
        dateSmoker: dbPreferences.dateSmoker,
        dateDrinker: dbPreferences.dateDrinker,
        dateMarijuanaUser: dbPreferences.dateMarijuanaUser,
        hasChildren: dbPreferences.hasChildren,
        religion: dbPreferences.religion,
        primaryLanguage: dbPreferences.primaryLanguage,
        createdAt: dbPreferences.createdAt,
        updatedAt: dbPreferences.updatedAt,
    }
}

export default async function PreferencesPage() {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const user = await db.user.findUnique({
        where: { externalUserId: userId },
        include: { preferences: true },
    })

    const preferencesData = transformToPreferencesData(user?.preferences)

    return (
        <div className="mx-auto  -mt-8 py-8">
            <Breadcrumb
                pageName="Preferences"
                minHeight="min-h-[240px]"

                description="What are your preferences for your romantic connection?  Help us find your perfect match based on your RQ scores, their scores, and your specific needs."
            />
            <div className="mt-8">
                <PreferencesForm initialData={preferencesData} />
            </div>
        </div>
    )
}
