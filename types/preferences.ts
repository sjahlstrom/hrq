// types/preferences.ts
export interface Preferences {
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

export interface PreferencesCardProps {
    preferences: Preferences | null
}