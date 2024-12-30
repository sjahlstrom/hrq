import { requireAuth, getAuthenticatedDbUser } from '@/utils/user'
import { extractProfileData } from '@/types/user'
import Breadcrumb from '@/components/common/bread-crumb'
import ProfileForm from '@/components/(dating)/Profile/ProfileForm'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Profile',
}

export default async function ProfilePage() {
    try {
        await requireAuth()

        const user = await getAuthenticatedDbUser({
            includeImages: true,
            includeBio: true
        })

        return (
            <div className="mx-auto">
                <Breadcrumb
                    pageName="Profile"
                    minHeight="min-h-[200px]"
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
    } catch (error) {
        throw error
    }
}