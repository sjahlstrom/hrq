import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Breadcrumb from '@/components/common/bread-crumb'
import { Metadata } from 'next'
import PreferencesForm, { PreferencesData } from '@/components/(dating)/Preferences/PreferencesForm'

export const metadata: Metadata = {
    title: "Preferences"
}

// Function to transform database result to PreferencesData
function transformToPreferencesData(dbPreferences: any): PreferencesData | null {
    if (!dbPreferences) return null;

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
        updatedAt: dbPreferences.updatedAt
    };
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
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb
                pageName="Preferences"
                description="The main 'thrust' is to focus on helping people to find their potential and increasing satisfaction in their relationships."
            />
            <div className="mt-8">
                <PreferencesForm initialData={preferencesData} />
            </div>
        </div>
    );
}