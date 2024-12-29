'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useImageCount } from '@/hooks/useImageCount'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { FormSelect } from '@/components/forms/FormSelect'
import { FormInput } from '@/components/forms/FormInput'
import { BirthdayField } from '@/components/forms/BirthdayField'
import { FORM_OPTIONS } from '@/constants/form-options'
import { profileFormSchema, type ProfileFormValues } from '@/types/form'
import { updateProfile } from '@/lib/actions/update-profile'

interface ProfileFormProps {
    initialData: Partial<ProfileFormValues> | null
    imageCount?: number
}

export default function ProfileForm({
                                        initialData,
                                        imageCount: initialImageCount = 0,
                                    }: ProfileFormProps) {
    const router = useRouter()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const currentImageCount = useImageCount(initialImageCount)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
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

    async function onSubmit(values: ProfileFormValues) {
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
                toast.error(result.message || 'An error occurred while updating the profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('An unexpected error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="-mt-8 bg-custom-radial from-hrqColors-sunsetOrange-100 to-hrqColors-sunsetOrange-400 p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput
                            name="occupation"
                            label="Occupation"
                            control={form.control}
                            maxLength={20}
                        />
                        <FormSelect
                            name="education"
                            label="Education"
                            control={form.control}
                            options={FORM_OPTIONS.education}
                        />
                        <FormSelect
                            name="incomeRange"
                            label="Income Range"
                            control={form.control}
                            options={FORM_OPTIONS.incomeRanges}
                            description="Not Displayed"
                            descriptionClassName="text-xs text-black mt-1"
                        />
                    </div>

                    {/* Location and Birthday */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput
                            name="postalCode"
                            label="Postal Code"
                            control={form.control}
                            maxLength={10}
                        />
                        <FormInput
                            name="areaCode"
                            label="Area Code"
                            control={form.control}
                            maxLength={8}
                        />
                        <BirthdayField control={form.control} />
                    </div>

                    {/* Personal Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormSelect
                            name="maritalStatus"
                            label="Marital Status"
                            control={form.control}
                            options={FORM_OPTIONS.maritalStatus}
                        />
                        <FormSelect
                            name="relationshipTypeWanted"
                            label="Relationship Type Wanted"
                            control={form.control}
                            options={FORM_OPTIONS.relationshipType}
                        />
                        <FormSelect
                            name="biologicalSex"
                            label="Your Biological Sex"
                            control={form.control}
                            options={FORM_OPTIONS.biologicalSex}
                        />
                    </div>

                    {/* Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormSelect
                            name="gender"
                            label="Your Gender"
                            control={form.control}
                            options={FORM_OPTIONS.gender}
                        />
                        <FormSelect
                            name="race"
                            label="Your Race"
                            control={form.control}
                            options={FORM_OPTIONS.races}
                        />
                        <FormSelect
                            name="smoker"
                            label="Smoker"
                            control={form.control}
                            options={FORM_OPTIONS.smoker}
                        />
                    </div>

                    {/* Lifestyle */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormSelect
                            name="alcohol"
                            label="Alcohol"
                            control={form.control}
                            options={FORM_OPTIONS.alcohol}
                        />
                        <FormSelect
                            name="drugs"
                            label="Drugs"
                            control={form.control}
                            options={FORM_OPTIONS.drugs}
                        />
                        <FormSelect
                            name="haveChildren"
                            label="Do you have children?"
                            control={form.control}
                            options={FORM_OPTIONS.haveChildren}
                        />
                    </div>

                    {/* Background */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormSelect
                            name="religion"
                            label="Religion"
                            control={form.control}
                            options={FORM_OPTIONS.religion}
                        />
                        <FormSelect
                            name="primaryLanguage"
                            label="Your Primary Language"
                            control={form.control}
                            options={FORM_OPTIONS.languages}
                        />
                        <FormSelect
                            name="otherLanguages"
                            label="Other Languages"
                            control={form.control}
                            options={FORM_OPTIONS.languages}
                        />
                    </div>

                    {/* About Yourself */}
                    <div className="space-y-4">
                        <FormInput
                            name="aboutYourself"
                            label="Tell Us About Yourself"
                            control={form.control}
                        />
                        <p className="text-xs text-dark">
                            Maximum 10000 characters
                        </p>
                    </div>

                    {/* Form Actions */}
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
                            <div className="space-y-2">
                                <Button
                                    type="button"
                                    onClick={() => router.push('/profile/images')}
                                    className="w-full bg-hrqColors-sunsetOrange-200 hover:bg-hrqColors-sunsetOrange-300 active:bg-hrqColors-sunsetOrange-400 text-black rounded"
                                >
                                    {currentImageCount > 0
                                        ? `Manage Images (${currentImageCount})`
                                        : 'Upload Your First Image'}
                                </Button>
                                {currentImageCount === 0 && (
                                    <p className="text-sm text-center text-black">
                                        Adding profile images increases your visibility
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}