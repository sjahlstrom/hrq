'use client'

import { useEffect } from 'react'
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
    biologicalSex: z.enum(['MALE', 'FEMALE'], {
        required_error: "Biological sex is required.",
    }),
    genderIdentity: z.enum(['MALE', 'FEMALE', 'OTHER'], {
        required_error: "Gender identity is required.",
    }),
    transgenderStatus: z.enum(['NOT_TRANSGENDER', 'TRANS_MALE', 'TRANS_FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY'], {
        required_error: "Transgender status is required.",
    }),
    age: z.string().min(1, {
        message: "Age is required.",
    }),
    postalCode: z.string().max(10, {
        message: "Postal code must be 10 characters or less.",
    }),
    partnerPreferences: z.array(z.string()).default([]),
    aboutYourself: z.string().min(100, {
        message: "Bio must be at least 100 characters.",
    }).max(2048, {
        message: "Bio must be 2048 characters or less.",
    }),
})

export default function BioPage() {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            biologicalSex: undefined,
            genderIdentity: undefined,
            transgenderStatus: undefined,
            age: '',
            postalCode: '',
            partnerPreferences: [],
            aboutYourself: '',
        },
    })

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/sign-in')
        } else if (user) {
            fetchPreferences()
        }
    }, [isLoaded, user, router])

    async function fetchPreferences() {
        try {
            const response = await fetch('/api/get-preferences')
            if (response.ok) {
                const data = await response.json()
                if (data.preferences) {
                    form.reset({
                        biologicalSex: data.preferences.sex,
                        genderIdentity: data.preferences.gender,
                        transgenderStatus: data.preferences.trans,
                        age: data.preferences.age.toString(),
                        postalCode: data.preferences.postalCode,
                        partnerPreferences: data.preferences.preferences,
                        aboutYourself: data.preferences.bio || '',
                    })
                }
            } else {
                console.error('Failed to fetch preferences')
            }
        } catch (error) {
            console.error('Error fetching preferences:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user) {
            toast.error("You must be logged in to submit your bio.")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/update-bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    externalUserId: user.id,
                    ...values,
                    age: parseInt(values.age),
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update bio')
            }

            const data = await response.json()
            console.log('Server response:', data)
            toast.success("Bio updated successfully!")
        } catch (error) {
            console.error('Error updating bio:', error)
            toast.error(error instanceof Error ? error.message : "Failed to update bio. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isLoaded || isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return null // This will prevent any flash of content before redirect
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Your Bio</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { name: 'biologicalSex', options: ['MALE', 'FEMALE'] },
                                    { name: 'genderIdentity', options: ['MALE', 'FEMALE', 'OTHER'] },
                                    { name: 'transgenderStatus', options: ['NOT_TRANSGENDER', 'TRANS_MALE', 'TRANS_FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY'] }
                                ].map(({ name, options }) => (
                                    <FormField
                                        key={name}
                                        control={form.control}
                                        name={name as any}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold">{name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</FormLabel>
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
                                                                    {option.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
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
                            <hr/>
                            <div className="flex justify-center space-x-4">
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem className="w-24">
                                            <FormLabel className="text-lg font-semibold">Age</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl className="rounded ">
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
                                            <FormControl>
                                                <Input placeholder="Enter postal code" {...field} maxLength={10} className="text-base" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <hr/>
                            <FormField
                                control={form.control}
                                name="partnerPreferences"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold">Partner Preferences</FormLabel>
                                        <FormDescription className="text-base">Select all that apply</FormDescription>
                                        <div className="flex justify-center">
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {['male', 'female', 'transMale', 'transFemale', 'older', 'younger', 'sameAge'].map((item) => (
                                                    <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item])
                                                                        : field.onChange(field.value.filter((value) => value !== item))
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
                                        <FormLabel className="text-lg font-semibold">About Yourself</FormLabel>
                                        <FormControl className="rounded ">
                                            <Textarea
                                                placeholder="Tell us about yourself"
                                                className="resize-none text-base"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-base">
                                            You can enter up to 2048 characters, 100 character minimum.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="rounded-2xl w-[120px] bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
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