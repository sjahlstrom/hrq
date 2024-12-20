import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ProfileForm from '@/components/(dating)/Profile/ProfileForm'
import Breadcrumb from '@/components/common/bread-crumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Profile"
}

export default async function ProfilePage() {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const user = await db.user.findUnique({
        where: { externalUserId: userId },
        include: { bio: true },
    })

    const bioData = user?.bio || null

    return (
        <div>
            <div>
                <Breadcrumb
                    pageName="Profile"
                    description="The main 'thrust' is to focus on helping people to find their potential and increasing satisfaction in their relationships."
                />
                <ProfileForm initialData={bioData} />
            </div>
        </div>
    );

}