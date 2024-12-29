// types/user.ts
import { ProfileFormValues } from './form'

export interface DbUser {
    id: string
    externalUserId: string
    stripeCustomerId?: string | null
    username?: string | null
    email?: string | null
    testResponse?: number[]
    associatedScale?: number[]
    testCompleted: boolean
    paid_rq: boolean
    paid_cq: boolean
    tos: boolean
    summedTotal?: number | null
    banned: boolean
    occupation?: string | null
    education?: string | null
    incomeRange?: string | null
    postalCode?: string | null
    areaCode?: string | null
    birthday?: Date | null
    maritalStatus?: string | null
    relationshipTypeWanted?: string | null
    biologicalSex?: string | null
    gender?: string | null
    race?: string | null
    smoker?: string | null
    alcohol?: string | null
    drugs?: string | null
    haveChildren?: string | null
    religion?: string | null
    primaryLanguage?: string | null
    otherLanguages?: string | null
    aboutYourself?: string | null
    images?: { id: string; url: string }[]
    createdAt: Date
    updatedAt: Date
}

// Helper function to safely extract profile data
export function extractProfileData(user: DbUser): Partial<ProfileFormValues> {
    return {
        occupation: user.occupation || '',
        education: user.education || '',
        incomeRange: user.incomeRange || '',
        postalCode: user.postalCode || '',
        areaCode: user.areaCode || '',
        birthday: user.birthday || undefined,
        maritalStatus: user.maritalStatus || '',
        relationshipTypeWanted: user.relationshipTypeWanted || '',
        biologicalSex: user.biologicalSex || '',
        gender: user.gender || '',
        race: user.race || '',
        smoker: user.smoker || '',
        alcohol: user.alcohol || '',
        drugs: user.drugs || '',
        haveChildren: user.haveChildren || '',
        religion: user.religion || '',
        primaryLanguage: user.primaryLanguage || '',
        otherLanguages: user.otherLanguages || '',
        aboutYourself: user.aboutYourself || '',
    }
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
    language: string;
    timezone: string;
    bio?: string;
}

export interface UserCardProps {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    preferences: UserPreferences;
}

// Helper function to create a safe user response
export function createSafeUserResponse(user: DbUser) {
    const { externalUserId, stripeCustomerId, ...safeUser } = user;
    return safeUser;
}