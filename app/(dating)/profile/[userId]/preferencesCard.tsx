'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatField } from '@/utils/stringUtils'

type Preferences = {
    id: string
    userId: string
    education: string | null
    incomeRange: string | null
    maritalStatus: string | null
    relationshipTypeWanted: string | null
    biologicalSex: string | null
    gender: string | null
    race: string | null
    age: string | null
    dateSmoker: string | null
    dateDrinker: string | null
    dateMarijuanaUser: string | null
    dateSomeoneWithKids: string | null
    primaryLanguage: string | null
    hasChildren: string | null
    religion: string | null
    createdAt: Date
    updatedAt: Date
}

interface PreferencesCardProps {
    preferences: Preferences | null
}

export default function PreferencesCard({ preferences }: PreferencesCardProps) {
    if (!preferences) {
        return (
            <div className="w-full mt-4">
                <Card className="bg-sky-300/80">
                    <CardHeader>
                        <CardTitle>My Perfect Match</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">No preferences set yet.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const preferenceFields = [
        { label: 'Education:', value: formatField(preferences.education) },
        // { label: 'Income Range:', value: formatField(preferences.incomeRange) },
        {
            label: 'Marital Status:',
            value: formatField(preferences.maritalStatus),
        },
        {
            label: 'Relationship Type:',
            value: formatField(preferences.relationshipTypeWanted),
        },
        {
            label: 'Biological Sex:',
            value: formatField(preferences.biologicalSex),
        },
        { label: 'Gender:', value: formatField(preferences.gender) },
        { label: 'Race:', value: formatField(preferences.race) },
        { label: 'Age:', value: preferences.age },
        { label: 'Date Smokers:', value: formatField(preferences.dateSmoker) },
        {
            label: 'Date Drinkers:',
            value: formatField(preferences.dateDrinker),
        },
        {
            label: 'Date Marijuana Users:',
            value: formatField(preferences.dateMarijuanaUser),
        },
        {
            label: 'Date Someone With Kids:',
            value: formatField(preferences.dateSomeoneWithKids),
        },
        {
            label: 'Primary Language:',
            value: formatField(preferences.primaryLanguage),
        },
        { label: 'Has Children:', value: formatField(preferences.hasChildren) },
        { label: 'Religion:', value: formatField(preferences.religion) },
    ]

    // Split fields into two columns
    const leftFields = preferenceFields.slice(
        0,
        Math.ceil(preferenceFields.length / 2)
    )
    const rightFields = preferenceFields.slice(
        Math.ceil(preferenceFields.length / 2)
    )

    return (
        <div className="w-full mt-4">
            <Card className="bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-800 ">
                <CardHeader>
                    <CardTitle className="text-dark text-2xl font-bold">
                        My Perfect Match
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div className="space-y-4">
                            {leftFields.map((field) => (
                                <div
                                    key={field.label}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-lg font-semibold text-gray-900">
                                        {field.label}
                                    </span>
                                    <span className="text-lg text-gray-700">
                                        {field.value || 'Not specified'}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {rightFields.map((field) => (
                                <div
                                    key={field.label}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-lg font-semibold text-gray-900">
                                        {field.label}
                                    </span>
                                    <span className="text-lg text-gray-700">
                                        {field.value || 'Not specified'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
