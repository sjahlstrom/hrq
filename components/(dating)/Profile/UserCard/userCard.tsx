import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getUserProfile } from '@/lib/actions/actions'
import {replaceHyphens, formatField, formatDate, toTitleCase  } from '@/utils/stringUtils'

import Image from 'next/image'

interface UserCardProps {
    userId: string
}

async function UserCard({ userId }: UserCardProps) {
    const profile = await getUserProfile(userId)

    if (!profile) {
        return <div>Profile not found</div>
    }
    
    const profileFields = [
        {
            label: 'Occupation',
            value: formatField(profile.occupation),
            paired: {
                label: 'Education',
                value: formatField(profile.education),
            },
        },
        {
            label: 'Postal Code',
            value: formatField(profile.postalCode),
            paired: {
                label: 'Area Code',
                value: formatField(profile.areaCode),
            },
        },
        {
            label: 'Birthday',
            value: formatDate(profile.birthday),
            paired: {
                label: 'Marital Status',
                value: formatField(profile.maritalStatus),
            },
        },
        {
            label: 'Relationship Type',
            value: formatField(profile.relationshipTypeWanted),
            paired: {
                label: 'Biological Sex',
                value: formatField(profile.biologicalSex),
            },
        },
        {
            label: 'Gender',
            value: formatField(profile.gender),
            paired: {
                label: 'Smoker',
                value: formatField(profile.smoker),
            },
        },
        {
            label: 'Alcohol',
            value: formatField(profile.alcohol),
            paired: {
                label: 'Drugs',
                value: formatField(profile.drugs),
            },
        },
        {
            label: 'Children',
            value: formatField(profile.haveChildren),
            paired: {
                label: 'Religion',
                value: formatField(profile.religion),
            },
        },
    ]

    return (
        <Card className="mt-28 w-full max-w-6xl">
            <div className="grid grid-cols-4">
                {/* Left Column - Images (1/4 width) */}
                <div className="p-4 border-r">
                    {profile.user?.images && profile.user.images.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold">Photos</h3>
                            <div className="flex flex-col gap-4">
                                {profile.user.images.map((image) => {
                                    const isGif = image.url
                                        .toLowerCase()
                                        .endsWith('.gif')
                                    return (
                                        <div
                                            key={image.id}
                                            className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted"
                                        >
                                            <Image
                                                src={image.url}
                                                alt="User uploaded photo"
                                                fill
                                                unoptimized={isGif}
                                                className="object-cover hover:scale-105 transition-transform duration-200"
                                                sizes="(max-width: 768px) 25vw, 200px"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Profile Info (3/4 width) */}
                <div className="col-span-3">
                    <CardHeader>
                        <h2 className="text-2xl font-bold">
                            {formatField(profile.user?.username) || 'Anonymous'}
                        </h2>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            {profileFields.map((field, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 gap-8"
                                >
                                    <div className="flex">
                                        <span className="w-40 font-medium whitespace-nowrap md:whitespace-normal">
                                            {field.label}:
                                        </span>
                                        <span className="flex-1 text-muted-foreground">
                                            {field.value}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-40 font-medium whitespace-nowrap md:whitespace-normal">
                                            {field.paired.label}:
                                        </span>
                                        <span className="flex-1 text-muted-foreground">
                                            {field.paired.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {profile.aboutYourself && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">About me</h3>
                                <p className="text-sm text-muted-foreground">
                                    {formatField(profile.aboutYourself)}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

export default UserCard
