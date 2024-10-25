'use client'

import { useEffect, useState, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { useTheme } from 'next-themes'

const formSchema = z.object({
    biologicalSex: z.enum(['MALE', 'FEMALE']),
    genderIdentity: z.enum(['MALE', 'FEMALE', 'OTHER']),
    transgenderStatus: z.enum([
        'NOT_TRANSGENDER',
        'TRANS_MALE',
        'TRANS_FEMALE',
        'NON_BINARY',
        'PREFER_NOT_TO_SAY',
    ]),
    age: z.string().min(1, { message: 'Age is required.' }),
    postalCode: z.string().max(10, { message: 'Postal code must be 10 characters or less.' }),
    partnerPreferences: z.array(z.string()).default([]),
    aboutYourself: z.string()
        .min(100, { message: 'Bio must be at least 100 characters.' })
        .max(2048, { message: 'Bio must be 2048 characters or less.' }),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: FormValues = {
    biologicalSex: 'MALE',
    genderIdentity: 'MALE',
    transgenderStatus: 'NOT_TRANSGENDER',
    age: '',
    postalCode: '',
    partnerPreferences: [],
    aboutYourself: '',
}

const radioFields = [
    { name: 'biologicalSex' as const, options: ['MALE', 'FEMALE'] as const },
    { name: 'genderIdentity' as const, options: ['MALE', 'FEMALE', 'OTHER'] as const },
    { name: 'transgenderStatus' as const, options: ['NOT_TRANSGENDER', 'TRANS_MALE', 'TRANS_FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY'] as const },
]

const partnerPreferenceOptions = ['male', 'female', 'transgender Male', 'transgender Female', 'older', 'younger', 'same Age']

export const Preferences = () => {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [initialValues, setInitialValues] = useState<FormValues | null>(null)
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const fetchPreferences = useCallback(async () => {
        if (!user) return

        try {
            const response = await fetch('/api/get-preferences', {
                headers: {
                    'Cache-Control': 'no-store',
                },
            })
            if (response.ok) {
                const { preferences } = await response.json()
                if (preferences) {
                    const formattedPreferences: FormValues = {
                        biologicalSex: preferences.sex || defaultValues.biologicalSex,
                        genderIdentity: preferences.gender || defaultValues.genderIdentity,
                        transgenderStatus: preferences.trans || defaultValues.transgenderStatus,
                        age: preferences.age?.toString() || '',
                        postalCode: preferences.postalCode || '',
                        partnerPreferences: preferences.preferences || [],
                        aboutYourself: preferences.bio || '',
                    }
                    setInitialValues(formattedPreferences)
                    form.reset(formattedPreferences)
                }
            } else {
                console.error('Failed to fetch preferences')
            }
        } catch (error) {
            console.error('Error fetching preferences:', error)
        } finally {
            setIsLoading(false)
        }
    }, [user, form])

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/sign-in')
        } else if (user) {
            fetchPreferences()
        }
    }, [isLoaded, user, router, fetchPreferences])

    const onSubmit = async (values: FormValues) => {
        if (!user) {
            toast.error('You must be logged in to submit your preferences.')
            return
        }

        const hasChanges = Object.keys(values).some(
            (key) => values[key as keyof FormValues] !== initialValues?.[key as keyof FormValues]
        )

        if (!hasChanges) {
            toast.error('No changes detected. Skipping update.')
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/update-bio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    externalUserId: user.id,
                    ...values,
                    age: parseInt(values.age),
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update preferences')
            }

            const data = await response.json()
            console.log('Server response:', data)
            toast.success('Bio updated successfully!')
            setInitialValues(values)
        } catch (error) {
            console.error('Error updating preferences:', error)
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to update preferences. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isLoaded || isLoading || !mounted) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (!user) return null

    return (
        <div className={`relative min-h-screen w-full p-4 ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="absolute inset-0 opacity-70" style={{ zIndex: -1 }}>
                <Image
                    src="/images/prefs/prefsbg.jpg"
                    alt="Background image"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <Card className="w-full max-w-4xl mx-auto">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-6">
                                {radioFields.map(({ name, options }) => (
                                    <FormField
                                        key={name}
                                        control={form.control}
                                        name={name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white text-lg font-semibold">
                                                    {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        className="flex flex-col space-y-2"
                                                    >
                                                        {options.map((option) => (
                                                            <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value={option} />
                                                                </FormControl>
                                                                <FormLabel className="font-normal text-base">
                                                                    {option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                                </FormLabel>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            <hr />
                            <div className="flex justify-center space-x-4">
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem className="w-24">
                                            <FormLabel className="text-lg font-semibold">Age</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl className="rounded">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Age" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Array.from({ length: 82 }, (_, i) => i + 18).map((age) => (
                                                        <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem className="w-40">
                                            <FormLabel className="text-lg font-semibold">Postal Code</FormLabel>
                                            <FormControl className="rounded">
                                                <Input
                                                    placeholder="Enter postal code"
                                                    {...field}
                                                    maxLength={10}
                                                    className="text-base"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <hr />
                            <FormField
                                control={form.control}
                                name="partnerPreferences"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg text-white font-semibold">Partner Preferences</FormLabel>
                                        <FormDescription className="text-base text-white">Select all that apply</FormDescription>
                                        <div className="flex justify-center">
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {partnerPreferenceOptions.map((item) => (
                                                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    const updatedValue = checked
                                                                        ? [...field.value, item]
                                                                        : field.value.filter((value) => value !== item)
                                                                    field.onChange(updatedValue)
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-base">
                                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="aboutYourself"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg text-white font-semibold">About Yourself</FormLabel>
                                        <FormControl className="rounded">
                                            <Textarea
                                                placeholder="Tell us about yourself"
                                                className="resize-none text-base h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="rounded-full w-[120px] bg-hrqColors-slateBlue-800 hover:bg-hrqColors-slateBlue-400 active:bg-hrqColors-slateBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Preferences