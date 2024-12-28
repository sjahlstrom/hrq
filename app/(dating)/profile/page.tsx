// app/(dating)/profile/page.tsx
import { requireAuth, getAuthenticatedDbUser } from '@/utils/user'
import { extractProfileData } from '@/types/user'
import Breadcrumb from '@/components/common/bread-crumb'
import ProfileForm from '@/components/(dating)/Profile/ProfileForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Profile"
}

export default async function ProfilePage() {
    await requireAuth()

    const user = await getAuthenticatedDbUser({
        includeImages: true
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb
                pageName="Profile"
                description="Complete your profile to connect with others."
            />
            <div className="mt-8">
                <ProfileForm
                    initialData={extractProfileData(user)}
                    imageCount={user.images?.length ?? 0}
                />
            </div>
        </div>
    )
}