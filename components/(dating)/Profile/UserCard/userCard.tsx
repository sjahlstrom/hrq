'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { UserCardProps } from '@/types/user'

const defaultPreferences = {
    theme: 'light' as const,
    emailNotifications: false,
    language: 'English',
    timezone: 'UTC',
    bio: '',
}

const UserCard = ({
    id,
    name,
    email,
    imageUrl,
    preferences = defaultPreferences, // Provide default value
}: UserCardProps) => {
    const userPreferences = {
        ...defaultPreferences,
        ...preferences,
    }

    return (
        <Card className="mt-8 w-full max-w-4xl mx-auto  relative z-10"> {/* Added relative z-10 */}
                <div className="flex flex-col sm:flex-row">
                    {/* Image column - 1/4 width */}
                    <div className="w-full sm:w-1/4 p-4">
                        <div className="relative w-32 h-32 mx-auto">
                            <Image
                                src={imageUrl}
                                alt={`${name}'s profile`}
                                fill
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* User preferences column - 3/4 width */}
                    <div className="w-full sm:w-3/4 p-6 border-l">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    {name}
                                </h2>
                                <p className="text-gray-500">{email}</p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">
                                    Preferences
                                </h3>

                                <div className="grid grid-cols-1 gap-3">
                                    <div>
                                        <span className="font-medium">
                                            Theme:
                                        </span>
                                        <span className="ml-2 capitalize">
                                            {userPreferences.theme}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="font-medium">
                                            Email Notifications:
                                        </span>
                                        <span className="ml-2">
                                            {userPreferences.emailNotifications
                                                ? 'Enabled'
                                                : 'Disabled'}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="font-medium">
                                            Language:
                                        </span>
                                        <span className="ml-2">
                                            {userPreferences.language}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="font-medium">
                                            Timezone:
                                        </span>
                                        <span className="ml-2">
                                            {userPreferences.timezone}
                                        </span>
                                    </div>

                                    {userPreferences.bio && (
                                        <div>
                                            <span className="font-medium">
                                                Bio:
                                            </span>
                                            <p className="mt-1 text-gray-600">
                                                {userPreferences.bio}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
    )
}

export default UserCard
