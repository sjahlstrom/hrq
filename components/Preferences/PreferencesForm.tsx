'use client'

import * as React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    savePreferences,
    SavePreferencesResult,
} from '@/app/actions/update-preferences'
import { toast } from 'sonner'

const formSchema = z.object({
    education: z.string().min(1, 'Please select education level.'),
    incomeRange: z.string().min(1, 'Please select an income range.'),
    maritalStatus: z.string().min(1, 'Please select a marital status.'),
    relationshipTypeWanted: z
        .string()
        .min(1, 'Please select a relationship type wanted.'),
    biologicalSex: z.string().min(1, 'Please select biological sex.'),
    gender: z.string().min(1, 'Please select gender.'),
    race: z.string().min(1, 'Please select race.'),
    age: z.string().min(1, 'Please select age range.'),
    dateSmoker: z.string().min(1, 'Please select smoking preference.'),
    dateDrinker: z.string().min(1, 'Please select alcohol use preference.'),
    dateMarijuanaUser: z.string().min(1, 'Please select drug use preference.'),
    hasChildren: z.string().min(1, 'Please select if they have children.'),
    religion: z.string().min(1, 'Please select religion.'),
    primaryLanguage: z.string().min(1, 'Please select primary language.'),
})

type FormValues = z.infer<typeof formSchema>

export interface PreferencesData {
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
    hasChildren: string | null
    religion: string | null
    primaryLanguage: string | null
    createdAt: Date
    updatedAt: Date
}

interface PreferencesFormProps {
    initialData: PreferencesData | null
}

const races = [
    'African-American',
    'Asian',
    'Black',
    'Caucasian',
    'Indian',
    'Indigenous/Aboriginal',
    'Latin/Hispanic',
    'Middle Eastern',
    'Native American',
    'Pacific Islander',
    'No Preference',
    'Other',
    'Prefer Not To Say',
]
const age = ['18-30', '31-40', '41-50', '51-60', '60-70', '70+']
const smokerOptions = ['Yes', 'No']
const drinkerOptions = ['Yes', 'No', 'Social Drinker']
const drugOptions = ['Yes', 'No']
const hasChildrenOptions = ['Yes', 'No', 'Over 18']
const religionOptions = [
    'Non-Religious',
    'Anglican',
    'Baptist',
    'Buddhist',
    'Catholic',
    'Christian - Other',
    'Eastern Orthodox',
    'Hindu',
    'Jewish',
    'Mormon',
    'Muslim',
    'Sikh',
    'Spiritual',
    'No Preference',
    'Other',
]
const languageOptions = [
    'English',
    'Spanish',
    'Arabic',
    'Dutch',
    'French',
    'German',
    'Hebrew',
    'Hindi',
    'Italian',
    'Japanese',
    'Norwegian',
    'Portuguese',
    'Russian',
    'Swedish',
    'Tagalog',
    'Urdu',
    'Other',
]
const educationOptions = [
    'High School',
    'Some College',
    'Associate of Arts',
    'Bachelor of Arts',
    'Bachelor of Science',
    'Graduate Degree',
    'PhD / Post Doc',
]

export default function PreferencesForm({ initialData }: PreferencesFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            education: initialData?.education || '',
            incomeRange: initialData?.incomeRange || '',
            maritalStatus: initialData?.maritalStatus || '',
            relationshipTypeWanted: initialData?.relationshipTypeWanted || '',
            biologicalSex: initialData?.biologicalSex || '',
            gender: initialData?.gender || '',
            race: initialData?.race || '',
            age: initialData?.age || '',
            dateSmoker: initialData?.dateSmoker || '',
            dateDrinker: initialData?.dateDrinker || '',
            dateMarijuanaUser: initialData?.dateMarijuanaUser || '',
            hasChildren: initialData?.hasChildren || '',
            religion: initialData?.religion || '',
            primaryLanguage: initialData?.primaryLanguage || '',
        },
        mode: 'onSubmit',
    })

    const [isSubmitting, setIsSubmitting] = React.useState(false)

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)
        const formData = new FormData()

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as string)
        })

        try {
            const result: SavePreferencesResult =
                await savePreferences(formData)
            if (result.success) {
                toast.success('Your Preferences have been saved successfully.')
            } else {
                toast.error(
                    result.error ||
                        'An error occurred while updating the Preferences'
                )
            }
        } catch (error) {
            console.error('Error updating Preferences:', error)
            toast.error('An unexpected error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderFormField = (
        name: keyof FormValues,
        label: string,
        options: string[]
    ) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative">
                    <FormLabel className="font-bold text-hrqColors-skyBlue-100">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="border-2 border-black focus:ring-black focus:border-black">
                                <SelectValue placeholder={`${label}`} />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                {options.map((option) => (
                                    <SelectItem
                                        key={option}
                                        value={option
                                            .toLowerCase()
                                            .replace(/\s+/g, '-')}
                                        className="focus:bg-coolGray-600 focus:text-white"
                                    >
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage className="absolute -bottom-6 left-0 text-red-600 text-sm font-medium" />
                </FormItem>
            )}
        />
    )

    return (
        <div className="bg-custom-radial from-hrqColors-peach-500 to-hrqColors-skyBlue-400 p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField(
                            'education',
                            'Education',
                            educationOptions
                        )}
                        {renderFormField('incomeRange', 'Income Range', [
                            'Less than $25,000',
                            '$25,000 - $35,000',
                            '$35,000 - $50,000',
                            '$50,000 - $75,000',
                            '$75,000 - $100,000',
                            '$100,000 - $150,000',
                            '$150,000+',
                        ])}
                        {renderFormField('maritalStatus', 'Marital Status', [
                            'Single',
                            'Married',
                            'Divorced',
                            'Widowed',
                            'No Preference',
                            'Other',
                        ])}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField(
                            'relationshipTypeWanted',
                            'Relationship Type Wanted',
                            [
                                'Hang out',
                                'Long-Term',
                                'Dating',
                                'Sexual',
                                'Just Friends',
                            ]
                        )}
                        {renderFormField('biologicalSex', 'Biological Sex', [
                            'Male',
                            'Female',
                        ])}
                        {renderFormField('gender', 'Gender', [
                            'Male',
                            'Female',
                            'Non-Binary',
                            'Other',
                        ])}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('race', 'Race', races)}
                        {renderFormField('age', 'Age', age)}
                        {renderFormField('dateSmoker', 'Smoker', smokerOptions)}
                        {renderFormField(
                            'dateDrinker',
                            'Drinker',
                            drinkerOptions
                        )}

                        {renderFormField(
                            'dateMarijuanaUser',
                            'Marijuana User',
                            drugOptions
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField(
                            'hasChildren',
                            'Has Children',
                            hasChildrenOptions
                        )}
                        {renderFormField(
                            'religion',
                            'Religion',
                            religionOptions
                        )}
                        {renderFormField(
                            'primaryLanguage',
                            'Primary Language',
                            languageOptions
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-hrqColors-skyBlue-200 hover:bg-hrqColors-skyBlue-300 active:bg-hrqColors-skyBlue-400 text-black rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
