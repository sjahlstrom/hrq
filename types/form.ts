// types/form.ts
import { z } from 'zod'

export const profileFormSchema = z.object({
    occupation: z.string()
        .min(5, 'Occupation must be at least 5 characters.')
        .max(20, 'Occupation must not exceed 20 characters.'),
    education: z.string()
        .min(1, 'Please select your education level.'),
    incomeRange: z.string()
        .min(1, 'Please select an income range.'),
    postalCode: z.string()
        .max(10, 'Postal code must not exceed 10 characters.')
        .min(1, 'Postal code is required.'),
    areaCode: z.string()
        .max(8, 'Area code must not exceed 8 characters.')
        .min(1, 'Area code is required.'),
    birthday: z.date({
        required_error: 'Please select a birthday.'
    }),
    maritalStatus: z.string()
        .min(1, 'Please select a marital status.'),
    relationshipTypeWanted: z.string()
        .min(1, 'Please select a relationship type wanted.'),
    biologicalSex: z.string()
        .min(1, 'Please select your biological sex.'),
    gender: z.string()
        .min(1, 'Please select your gender.'),
    race: z.string()
        .min(1, 'Please select your race.'),
    smoker: z.string()
        .min(1, 'Please select your smoking status.'),
    alcohol: z.string()
        .min(1, 'Please select your alcohol status.'),
    drugs: z.string()
        .min(1, 'Please select your drug use status.'),
    haveChildren: z.string()
        .min(1, 'Please select if you have children.'),
    religion: z.string()
        .min(1, 'Please select your religion.'),
    primaryLanguage: z.string()
        .min(1, 'Please select your primary language.'),
    otherLanguages: z.string()
        .min(1, 'Please select your other languages.'),
    aboutYourself: z.string()
        .max(6144, 'Your description must not exceed 6144 characters.')
        .min(1, 'Please provide a description about yourself.'),
})

// This creates a TypeScript type from the Zod schema
export type ProfileFormValues = z.infer<typeof profileFormSchema>

// You can also explicitly see the type like this:
/*
export interface ProfileFormValues {
    occupation: string;
    education: string;
    incomeRange: string;
    postalCode: string;
    areaCode: string;
    birthday: Date;
    maritalStatus: string;
    relationshipTypeWanted: string;
    biologicalSex: string;
    gender: string;
    race: string;
    smoker: string;
    alcohol: string;
    drugs: string;
    haveChildren: string;
    religion: string;
    primaryLanguage: string;
    otherLanguages: string;
    aboutYourself: string;
}
*/