'use client'

import * as React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { updateProfile } from '@/app/actions/update-profile'
import { toast } from 'sonner'

const formSchema = z.object({
    occupation: z.string().min(5, 'Occupation must be at least 5 characters.').max(20, 'Occupation must not exceed 20 characters.'),
    education: z.string({ required_error: 'Please select your education level.' }),
    incomeRange: z.string({ required_error: 'Please select an income range.' }),
    postalCode: z.string().max(10, 'Postal code must not exceed 10 characters.'),
    areaCode: z.string().max(8, 'Area code must not exceed 8 characters.'),
    birthday: z.date({ required_error: 'Please select a birthday.' }),
    maritalStatus: z.string({ required_error: 'Please select a marital status.' }),
    relationshipTypeWanted: z.string({ required_error: 'Please select a relationship type wanted.' }),
    biologicalSex: z.string({ required_error: 'Please select your biological sex.' }),
    gender: z.string({ required_error: 'Please select your gender.' }),
    race: z.string({ required_error: 'Please select your race.' }),
    smoker: z.string({ required_error: 'Please select your smoking status.' }),
    dateSmoker: z.string({ required_error: 'Please select if you would date a smoker.' }),
    drugs: z.string({ required_error: 'Please select your drug use status.' }),
    dateMarijuanaUser: z.string({ required_error: 'Please select if you would date a marijuana user.' }),
    haveChildren: z.string({ required_error: 'Please select if you have children.' }),
    dateSomeoneWithKids: z.string({ required_error: 'Please select if you would date someone with kids.' }),
    religion: z.string({ required_error: 'Please select your religion.' }),
    primaryLanguage: z.string({ required_error: 'Please select your primary language.' }),
    otherLanguages: z.string({ required_error: 'Please select your other languages.' }),
    aboutYourself: z.string().max(6144, 'Your description must not exceed 6144 characters.'),
})

type FormValues = z.infer<typeof formSchema>

interface BioData {
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
    dateSmoker: string | null
    drugs: string | null
    dateMarijuanaUser: string | null
    haveChildren: string | null
    dateSomeoneWithKids: string | null
    religion: string | null
    primaryLanguage: string | null
    otherLanguages: string | null
    aboutYourself: string | null
    createdAt: Date
    updatedAt: Date
}

interface ProfileFormProps {
    initialData: BioData | null
}

const races = ['African-American', 'Asian', 'Black', 'Caucasian', 'Indian', 'Indigenous/Aboriginal', 'Latin/Hispanic', 'Middle Eastern', 'Native American', 'Pacific Islander', 'Other', 'Prefer Not To Say']
const smokerOptions = ['Yes', 'No', 'Cigars', 'Pipe']
const dateSmokerOptions = ['Yes', 'No']
const drugOptions = ['Yes', 'No', 'Marijuana Only']
const haveChildrenOptions = ['Yes', 'No', 'Over 18']
const dateSomeoneWithKidsOptions = ['Yes', 'No', 'Yes If Over 18']
const religionOptions = ['Non-Religious', 'Anglican', 'Baptist', 'Buddhist', 'Catholic', 'Christian - Other', 'Eastern Orthodox', 'Hindu', 'Jewish', 'Mormon', 'Muslim', 'Sikh', 'Spiritual', 'Other']
const languageOptions = ['English', 'Spanish', 'Arabic', 'Dutch', 'French', 'German', 'Hebrew', 'Hindi', 'Italian', 'Japanese', 'Norwegian', 'Portuguese', 'Russian', 'Swedish', 'Tagalog', 'Urdu', 'Other']
const educationOptions = ['High School', 'Some College', 'Associate of Arts', 'Bachelor of Arts', 'Bachelor of Science', 'Graduate Degree', 'PhD / Post Doc']

export default function Component({ initialData }: ProfileFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            occupation: initialData?.occupation || '',
            education: initialData?.education || '',
            incomeRange: initialData?.incomeRange || '',
            postalCode: initialData?.postalCode || '',
            areaCode: initialData?.areaCode || '',
            birthday: initialData?.birthday ? new Date(initialData.birthday) : new Date(),
            maritalStatus: initialData?.maritalStatus || '',
            relationshipTypeWanted: initialData?.relationshipTypeWanted || '',
            biologicalSex: initialData?.biologicalSex || '',
            gender: initialData?.gender || '',
            race: initialData?.race || '',
            smoker: initialData?.smoker || '',
            dateSmoker: initialData?.dateSmoker || '',
            drugs: initialData?.drugs || '',
            dateMarijuanaUser: initialData?.dateMarijuanaUser || '',
            haveChildren: initialData?.haveChildren || '',
            dateSomeoneWithKids: initialData?.dateSomeoneWithKids || '',
            religion: initialData?.religion || '',
            primaryLanguage: initialData?.primaryLanguage || '',
            otherLanguages: initialData?.otherLanguages || '',
            aboutYourself: initialData?.aboutYourself || '',
        },
    })

    const [selectedYear, setSelectedYear] = React.useState<number>(initialData?.birthday ? new Date(initialData.birthday).getFullYear() : new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = React.useState(initialData?.birthday ? new Date(initialData.birthday) : new Date())
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)
        const formData = new FormData()

        Object.entries(values).forEach(([key, value]) => {
            if (key === 'birthday') {
                formData.append(key, (value as Date).toISOString())
            } else {
                formData.append(key, value as string)
            }
        })

        try {
            const result = await updateProfile(formData)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message || 'An error occurred while updating the profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('An unexpected error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)

    const handleMonthChange = (increment: boolean) => {
        const newMonth = new Date(currentMonth)
        newMonth.setMonth(newMonth.getMonth() + (increment ? 1 : -1))
        setCurrentMonth(newMonth)
        setSelectedYear(newMonth.getFullYear())
    }

    const renderFormField = (name: keyof FormValues, label: string, placeholder: string, options?: string[]) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-bold text-black">{label}</FormLabel>
                    <FormControl>
                        {options || name === 'education' ? (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value as string}
                                defaultValue={field.value as string}
                            >
                                <SelectTrigger className="border-2 border-black focus:ring-black focus:border-black">
                                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                    {(name === 'education' ? educationOptions : options)?.map((option) => (
                                        <SelectItem
                                            key={option}
                                            value={option.toLowerCase().replace(/\s+/g, '-')}
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
                                placeholder={placeholder}
                                className="border-2 border-black focus:ring-black focus:border-black"
                                maxLength={name === 'postalCode' ? 10 : name === 'areaCode' ? 8 : undefined}
                                onFocus={(e) => {
                                    e.currentTarget.placeholder = ''
                                }}
                                onBlur={(e) => {
                                    if (!field.value) {
                                        e.currentTarget.placeholder = placeholder
                                    }
                                }}
                            />
                        )}
                    </FormControl>
                    {name === 'incomeRange' && (
                        <p className="text-xs text-black mt-1">Not Displayed</p>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )

    return (
        <div className="bg-custom-radial from-hrqColors-sunsetOrange-300 to-hrqColors-sunsetOrange-500 p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('occupation', 'Occupation', 'Your occupation')}
                        {renderFormField('education', 'Education', 'Select your education')}
                        {renderFormField('incomeRange', 'Income Range', 'Select income range', [
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
                        {renderFormField('postalCode', 'Postal Code', 'Postal Code')}
                        {renderFormField('areaCode', 'Area Code', '1+ ')}
                        <FormField
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-black">Birthday</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={`w-full pl-3 text-left font-normal border-2 border-black focus:ring-black focus:border-black ${
                                                        !field.value && 'text-muted-foreground'
                                                    }`}
                                                >
                                                    {field.value ? format(field.value, 'MM/dd/yyyy') : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 border-2 border-black focus:ring-black focus:border-black bg-hrqColors-sunsetOrange-400" align="start">
                                                <div className="flex justify-between p-2 border-b border-black">
                                                    <Select
                                                        onValueChange={(value) => {
                                                            const year = Number(value)
                                                            setSelectedYear(year)
                                                            setCurrentMonth(new Date(year, currentMonth.getMonth()))
                                                            if (field.value) {
                                                                const newDate = new Date(field.value)
                                                                newDate.setFullYear(year)
                                                                field.onChange(newDate)
                                                            }
                                                        }}
                                                        value={selectedYear.toString()}
                                                    >
                                                        <SelectTrigger className="w-[120px] border-2 border-black">
                                                            <SelectValue placeholder="Select Year" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-coolGray-500 [&>div]:bg-coolGray-500">
                                                            {years.map((year) => (
                                                                <SelectItem
                                                                    key={year}
                                                                    value={year.toString()}
                                                                    className="focus:bg-coolGray-600 focus:text-white"
                                                                >
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="outline" size="icon" className="h-7 w-7 border-black" onClick={() => handleMonthChange(false)}>
                                                            <ChevronLeft className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="icon" className="h-7 w-7 border-black" onClick={() => handleMonthChange(true)}>

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
                                                            setSelectedYear(date.getFullYear())
                                                            setCurrentMonth(date)
                                                        }
                                                    }}
                                                    month={currentMonth}
                                                    onMonthChange={setCurrentMonth}
                                                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
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
                        {renderFormField('maritalStatus', 'Marital Status', 'Select status', ['Single', 'Married', 'Divorced', 'Widowed', 'Other'])}
                        {renderFormField('relationshipTypeWanted', 'Relationship Type Wanted', 'Select type', ['Hang out', 'Long-Term', 'Dating', 'Just Friends'])}
                        {renderFormField('biologicalSex', 'Your Biological Sex', 'Select sex', ['Male', 'Female'])}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('gender', 'Your Gender', 'Select gender', ['Male', 'Female', 'Non-Binary', 'Other'])}
                        {renderFormField('race', 'Your Race', 'Select your race', races)}
                        {renderFormField('smoker', 'Smoker', 'Select option', smokerOptions)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('dateSmoker', 'Date a Smoker?', 'Select option', dateSmokerOptions)}
                        {renderFormField('drugs', 'Drugs', 'Select option', drugOptions)}
                        {renderFormField('dateMarijuanaUser', 'Date a Marijuana User?', 'Select option', ['Yes', 'No'])}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {renderFormField('haveChildren', 'Do you have children?', 'Select option', haveChildrenOptions)}
                        {renderFormField('dateSomeoneWithKids', 'Date Someone With Kids?', 'Select option', dateSomeoneWithKidsOptions)}
                        {renderFormField('religion', 'Religion', 'Select your religion', religionOptions)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderFormField('primaryLanguage', 'Your Primary Language', 'Select your primary language', languageOptions)}
                        {renderFormField('otherLanguages', 'Other Languages', 'Select other languages', languageOptions)}
                    </div>

                    <FormField
                        control={form.control}
                        name="aboutYourself"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-black">Tell Us About Yourself</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Share a bit about yourself..."
                                        className="resize-none border-2 border-black focus:ring-black focus:border-black"
                                        {...field}
                                        maxLength={10000}
                                        onFocus={(e) => {
                                            e.currentTarget.placeholder = ''
                                        }}
                                        onBlur={(e) => {
                                            if (!field.value) {
                                                e.currentTarget.placeholder = 'Share a bit about yourself...'
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-black">Maximum 10000 characters</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-hrqColors-sunsetOrange-200 hover:bg-hrqColors-sunsetOrange-300 active:bg-hrqColors-sunsetOrange-400 text-black rounded"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}