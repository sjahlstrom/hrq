// constants/form-options.ts
export const FORM_OPTIONS = {
    races: [
        'African-American', 'Asian', 'Black', 'Caucasian', 'Jewish',
        'Indian', 'Indigenous/Aboriginal', 'Latin/Hispanic', 'Middle Eastern',
        'Native American', 'Pacific Islander', 'Other', 'Prefer Not To Say'
    ],
    smoker: ['Yes', 'No', 'Cigars', 'Pipe'],
    alcohol: ['Yes', 'No', 'Socially'],
    drugs: ['Yes', 'No', 'Marijuana Only'],
    haveChildren: ['Yes', 'No', 'Over 18'],
    religion: [
        'Non-Religious', 'Anglican', 'Baptist', 'Buddhist', 'Catholic',
        'Christian - Other', 'Eastern Orthodox', 'Hindu', 'Jewish',
        'Mormon', 'Muslim', 'Sikh', 'Spiritual', 'Other'
    ],
    languages: [
        'English', 'Spanish', 'Arabic', 'Dutch', 'French', 'German',
        'Hebrew', 'Hindi', 'Italian', 'Japanese', 'Norwegian',
        'Portuguese', 'Russian', 'Swedish', 'Tagalog', 'Urdu', 'Other / None'
    ],
    education: [
        'High School', 'Some College', 'Associate of Arts',
        'Bachelor of Arts', 'Bachelor of Science',
        'Graduate Degree', 'PhD / Post Doc'
    ],
    maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed', 'Other'],
    relationshipType: ['Hang out', 'Long-Term', 'Dating', 'Sexual', 'Just Friends'],
    gender: ['Male', 'Female', 'Non-Binary', 'Other'],
    biologicalSex: ['Male', 'Female'],
    incomeRanges: [
        'Less than $25,000', '$25,000 - $35,000', '$35,000 - $50,000',
        '$50,000 - $75,000', '$75,000 - $100,000', '$100,000 - $150,000',
        '$150,000+'
    ]
} as const;

// types/form.ts
import { z } from 'zod';

export const profileFormSchema = z.object({
    occupation: z.string().min(5, 'Occupation must be at least 5 characters.')
        .max(20, 'Occupation must not exceed 20 characters.'),
    education: z.string().min(1, 'Please select your education level.'),
    incomeRange: z.string().min(1, 'Please select an income range.'),
    postalCode: z.string().max(10).min(1, 'Postal code is required.'),
    areaCode: z.string().max(8).min(1, 'Area code is required.'),
    birthday: z.date({ required_error: 'Please select a birthday.' }),
    maritalStatus: z.string().min(1, 'Please select a marital status.'),
    relationshipTypeWanted: z.string().min(1, 'Please select a relationship type.'),
    biologicalSex: z.string().min(1, 'Please select your biological sex.'),
    gender: z.string().min(1, 'Please select your gender.'),
    race: z.string().min(1, 'Please select your race.'),
    smoker: z.string().min(1, 'Please select your smoking status.'),
    alcohol: z.string().min(1, 'Please select your alcohol status.'),
    drugs: z.string().min(1, 'Please select your drug use status.'),
    haveChildren: z.string().min(1, 'Please select if you have children.'),
    religion: z.string().min(1, 'Please select your religion.'),
    primaryLanguage: z.string().min(1, 'Please select your primary language.'),
    otherLanguages: z.string().min(1, 'Please select your other languages.'),
    aboutYourself: z.string()
        .max(6144, 'Your description must not exceed 6144 characters.')
        .min(1, 'Please provide a description about yourself.'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;