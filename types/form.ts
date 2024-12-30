// types/form.ts
import * as z from 'zod'

export const profileFormSchema = z.object({
    occupation: z.string().min(5).max(20).optional(),
    education: z.string().min(1).optional(),
    incomeRange: z.string().min(1).optional(),
    postalCode: z.string().max(10).optional(),
    areaCode: z.string().max(8).optional(),
    birthday: z.date().optional(),
    maritalStatus: z.string().optional(),
    relationshipTypeWanted: z.string().optional(),
    biologicalSex: z.string().optional(),
    gender: z.string().optional(),
    race: z.string().optional(),
    smoker: z.string().optional(),
    alcohol: z.string().optional(),
    drugs: z.string().optional(),
    haveChildren: z.string().optional(),
    religion: z.string().optional(),
    primaryLanguage: z.string().optional(),
    otherLanguages: z.string().optional(),
    aboutYourself: z.string().max(6144).optional(),
})

// Export the type
export type ProfileFormValues = z.infer<typeof profileFormSchema>