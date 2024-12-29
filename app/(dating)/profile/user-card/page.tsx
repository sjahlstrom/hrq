// app/page.tsx
import UserCard from '@/components/(dating)/Profile/UserCard/userCard'
import { UserCardProps } from '@/types/user'
import Breadcrumb from '@/components/common/bread-crumb'

const userPreferences: UserCardProps['preferences'] = {
    theme: 'dark',
    emailNotifications: true,
    language: 'English',
    timezone: 'UTC-5',
    bio: 'Frontend developer passionate about UI/UX',
}

export default function Page() {
    return (
        <div className="mx-auto bg-custom-radial from-hrqColors-coolGray-300 to-hrqColors-coolGray-500 min-h-screen">
            <Breadcrumb
                pageName="Profile"
                minHeight="min-h-[200px]"
                description="Complete your profile to connect with others."
            />
            <div className="mt-6">
                <UserCard
                    id="user123"
                    name="John Doe"
                    email="john@example.com"
                    imageUrl="/images/hero/landing2.jpg"
                    preferences={userPreferences}
                />
            </div>
        </div>
    )
}
