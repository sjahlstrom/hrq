'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { updateProfile } from '@/app/actions/update-profile'
import { toast } from 'sonner'

const formSchema = z.object({
    occupation: z
        .string()
        .min(5, 'Occupation must be at least 5 characters.')
        .max(20, 'Occupation must not exceed 20 characters.'),
    education: z.string().min(1, 'Please select your education level.'),
    incomeRange: z.string().min(1, 'Please select an income range.'),
    postalCode: z
        .string()
        .max(10, 'Postal code must not exceed 10 characters.')
        .min(1, 'Postal code is required.'),
    areaCode: z
        .string()
        .max(8, 'Area code must not exceed 8 characters.')
        .min(1, 'Area code is required.'),
    birthday: z.date({ required_error: 'Please select a birthday.' }),
    maritalStatus: z.string().min(1, 'Please select a marital status.'),
    relationshipTypeWanted: z
        .string()
        .min(1, 'Please select a relationship type wanted.'),
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
    aboutYourself: z
        .string()
        .max(6144, 'Your description must not exceed 6144 characters.')
        .min(1, 'Please provide a description about yourself.'),
})

type FormValues = z.infer<typeof formSchema>

interface ProfileData {
    id: string
    userId: string
    occupation: string | null
    education: string | null
    incomeRange: string | null
    postalCode: string | null
    areaCode: string | null
    birthday: Date | null
    maritalStatus: string | null
    relationshipTypeWanted: string | null
    biologicalSex: string | null
    gender: string | null
    race: string | null
    smoker: string | null
    alcohol: string | null
    drugs: string | null
    haveChildren: string | null
    religion: string | null
    primaryLanguage: string | null
    otherLanguages: string | null
    aboutYourself: string | null
    createdAt: Date
    updatedAt: Date
}

interface ProfileFormProps {
    initialData: ProfileData | null
}

const races = [
    'African-American',
    'Asian',
    'Black',
    'Caucasian',
    'Jewish',
    'Indian',
    'Indigenous/Aboriginal',
    'Latin/Hispanic',
    'Middle Eastern',
    'Native American',
    'Pacific Islander',
    'Other',
    'Prefer Not To Say',
]
const smokerOptions = ['Yes', 'No', 'Cigars', 'Pipe']
const alcoholOptions = ['Yes', 'No', 'Socially']
const drugOptions = ['Yes', 'No', 'Marijuana Only']
const haveChildrenOptions = ['Yes', 'No', 'Over 18']
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
    'Other / None',
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
export default function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            occupation: initialData?.occupation || '',
            education: initialData?.education || '',
            incomeRange: initialData?.incomeRange || '',
            postalCode: initialData?.postalCode || '',
            areaCode: initialData?.areaCode || '',
            birthday: initialData?.birthday || undefined,
            maritalStatus: initialData?.maritalStatus || '',
            relationshipTypeWanted: initialData?.relationshipTypeWanted || '',
            biologicalSex: initialData?.biologicalSex || '',
            gender: initialData?.gender || '',
            race: initialData?.race || '',
            smoker: initialData?.smoker || '',
            alcohol: initialData?.alcohol || '',
            drugs: initialData?.drugs || '',
            haveChildren: initialData?.haveChildren || '',
            religion: initialData?.religion || '',
            primaryLanguage: initialData?.primaryLanguage || '',
            otherLanguages: initialData?.otherLanguages || '',
            aboutYourself: initialData?.aboutYourself || '',
        },
        mode: 'onSubmit',
    })

    const { isDirty } = form.formState

    const [selectedYear, setSelectedYear] = React.useState<number>(
        initialData?.birthday
            ? initialData.birthday.getFullYear()
            : new Date().getFullYear()
    )
    const [currentMonth, setCurrentMonth] = React.useState(
        initialData?.birthday || new Date()
    )

    async function onSubmit(values: FormValues) {
        // if (!isDevelopment) {
        //     toast.error('This feature is only available in development mode')
        //     return
        // }
        setIsSubmitting(true)
        const formData = new FormData()

        Object.entries(values).forEach(([key, value]) => {
            if (key === 'birthday' && value instanceof Date) {
                formData.append(key, value.toISOString())
            } else {
                formData.append(key, value as string)
            }
        })

        try {
            const result = await updateProfile(formData)
            if (result.success) {
                toast.success(result.message)
                setIsSubmitted(true)
            } else {
                toast.error(
                    result.message ||
                        'An error occurred while updating the profile'
                )
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('An unexpected error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }
    const currentYear = new Date().getFullYear()
    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => currentYear - i
    )

    const handleMonthChange = (increment: boolean) => {
        const newMonth = new Date(currentMonth)
        newMonth.setMonth(newMonth.getMonth() + (increment ? 1 : -1))
        setCurrentMonth(newMonth)
        setSelectedYear(newMonth.getFullYear())
    }

    const renderFormField = (
        name: keyof FormValues,
        label: string,
        options?: string[]
    ) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-bold text-black">
                        {label}
                    </FormLabel>
                    <FormControl>
                        {options || name === 'education' ? (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value as string}
                            >
                                <SelectTrigger className="rounded border-2 border-black focus:ring-black focus:border-black">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                    {(name === 'education'
                                        ? educationOptions
                                        : options
                                    )?.map((option) => (
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
                        ) : (
                            <Input
                                {...field}
                                value={field.value as string}
                                className="rounded border-2 border-black focus:ring-black focus:border-black"
                                maxLength={
                                    name === 'postalCode'
                                        ? 10
                                        : name === 'areaCode'
                                          ? 8
                                          : undefined
                                }
                            />
                        )}
                    </FormControl>
                    {name === 'incomeRange' && (
                        <p className="text-xs text-black mt-1">Not Displayed</p>
                    )}
                    <FormMessage className="text-sm text-red-500" />
                </FormItem>
            )}
        />
    )
    return (
        <div className="bg-custom-radial from-hrqColors-sunsetOrange-100 to-hrqColors-sunsetOrange-400 p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('occupation', 'Occupation')}
                        {renderFormField('education', 'Education')}
                        {renderFormField('incomeRange', 'Income Range', [
                            'Less than $25,000',
                            '$25,000 - $35,000',
                            '$35,000 - $50,000',
                            '$50,000 - $75,000',
                            '$75,000 - $100,000',
                            '$100,000 - $150,000',
                            '$150,000+',
                        ])}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('postalCode', 'Postal Code')}
                        {renderFormField('areaCode', 'Area Code')}
                        <FormField
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-black">
                                        Birthday
                                    </FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={`rounded w-full pl-3 text-left font-normal border-2 border-black focus:ring-black focus:border-black ${
                                                        !field.value &&
                                                        'text-muted-foreground'
                                                    }`}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'MM/dd/yyyy'
                                                        )
                                                    ) : (
                                                        <span>Select date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0 border-2 border-black focus:ring-black focus:border-black bg-hrqColors-sunsetOrange-400"
                                                align="start"
                                            >
                                                <div className="flex justify-between p-2 border-b border-black">
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            const year =
                                                                Number(value)
                                                            setSelectedYear(
                                                                year
                                                            )
                                                            setCurrentMonth(
                                                                new Date(
                                                                    year,
                                                                    currentMonth.getMonth()
                                                                )
                                                            )
                                                            if (field.value) {
                                                                const newDate =
                                                                    new Date(
                                                                        field.value
                                                                    )
                                                                newDate.setFullYear(
                                                                    year
                                                                )
                                                                field.onChange(
                                                                    newDate
                                                                )
                                                            }
                                                        }}
                                                        value={selectedYear.toString()}
                                                    >
                                                        <SelectTrigger className="rounded w-[120px] border-2 border-black">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-hrqColors-coolGray-600 [&>div]:bg-hrqColors-coolGray-600">
                                                            {years.map(
                                                                (year) => (
                                                                    <SelectItem
                                                                        key={
                                                                            year
                                                                        }
                                                                        value={year.toString()}
                                                                        className="focus:bg-coolGray-600 focus:text-white"
                                                                    >
                                                                        {year}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7 border-black"
                                                            onClick={() =>
                                                                handleMonthChange(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <ChevronLeft className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7 border-black"
                                                            onClick={() =>
                                                                handleMonthChange(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        field.onChange(date)
                                                        if (date) {
                                                            setSelectedYear(
                                                                date.getFullYear()
                                                            )
                                                            setCurrentMonth(
                                                                date
                                                            )
                                                        }
                                                    }}
                                                    month={currentMonth}
                                                    onMonthChange={
                                                        setCurrentMonth
                                                    }
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '1900-01-01'
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('maritalStatus', 'Marital Status', [
                            'Single',
                            'Married',
                            'Divorced',
                            'Widowed',
                            'Other',
                        ])}
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
                        {renderFormField(
                            'biologicalSex',
                            'Your Biological Sex',
                            ['Male', 'Female']
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('gender', 'Your Gender', [
                            'Male',
                            'Female',
                            'Non-Binary',
                            'Other',
                        ])}
                        {renderFormField('race', 'Your Race', races)}
                        {renderFormField('smoker', 'Smoker', smokerOptions)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('alcohol', 'Alcohol', alcoholOptions)}
                        {renderFormField('drugs', 'Drugs', drugOptions)}
                        {renderFormField(
                            'haveChildren',
                            'Do you have children?',
                            haveChildrenOptions
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField(
                            'religion',
                            'Religion',
                            religionOptions
                        )}
                        {renderFormField(
                            'primaryLanguage',
                            'Your Primary Language',
                            languageOptions
                        )}
                        {renderFormField(
                            'otherLanguages',
                            'Other Languages',
                            languageOptions
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name="aboutYourself"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-black">
                                    Tell Us About Yourself
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="rounded resize-none border-2 border-black focus:ring-black focus:border-black"
                                        {...field}
                                        maxLength={10000}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-black">
                                    Maximum 10000 characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        {isDirty && (
                            <Button
                                type="submit"
                                className="w-full bg-hrqColors-sunsetOrange-200 hover:bg-hrqColors-sunsetOrange-300 active:bg-hrqColors-sunsetOrange-400 text-black rounded"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        )}

                        {(isSubmitted || !isDirty) && (
                            <Button
                                type="button"
                                onClick={() => router.push('/profile/images')}
                                className="w-full bg-hrqColors-sunsetOrange-200 hover:bg-hrqColors-sunsetOrange-300 active:bg-hrqColors-sunsetOrange-400 text-black rounded"
                            >
                                Upload Images
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}
