// types/user.ts
import {ProfileFormValues} from '@/constants/form-options'

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
    images?: { id: string; url: string }[]
    bio?: {
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
    } | null
    createdAt: Date
    updatedAt: Date
}

export function extractProfileData(user: DbUser): Partial<ProfileFormValues> {
    if (!user || !user.bio) {
        return {
            occupation: '',
            education: '',
            incomeRange: '',
            postalCode: '',
            areaCode: '',
            birthday: undefined,
            maritalStatus: '',
            relationshipTypeWanted: '',
            biologicalSex: '',
            gender: '',
            race: '',
            smoker: '',
            alcohol: '',
            drugs: '',
            haveChildren: '',
            religion: '',
            primaryLanguage: '',
            otherLanguages: '',
            aboutYourself: '',
        }
    }

    return {
        occupation: user.bio.occupation || '',
        education: user.bio.education || '',
        incomeRange: user.bio.incomeRange || '',
        postalCode: user.bio.postalCode || '',
        areaCode: user.bio.areaCode || '',
        birthday: user.bio.birthday || undefined,
        maritalStatus: user.bio.maritalStatus || '',
        relationshipTypeWanted: user.bio.relationshipTypeWanted || '',
        biologicalSex: user.bio.biologicalSex || '',
        gender: user.bio.gender || '',
        race: user.bio.race || '',
        smoker: user.bio.smoker || '',
        alcohol: user.bio.alcohol || '',
        drugs: user.bio.drugs || '',
        haveChildren: user.bio.haveChildren || '',
        religion: user.bio.religion || '',
        primaryLanguage: user.bio.primaryLanguage || '',
        otherLanguages: user.bio.otherLanguages || '',
        aboutYourself: user.bio.aboutYourself || '',
    }
}