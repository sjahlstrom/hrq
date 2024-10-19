'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useUser } from '@clerk/nextjs'
import { nunito, telex } from '@/app/ui/fonts'

const schema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long" })
})

type FormData = z.infer<typeof schema>

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const { user, isLoaded } = useUser()

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (isLoaded && user) {
            setValue('name', user.fullName || user.username || '')
            setValue('email', user.primaryEmailAddress?.emailAddress || '')
        }
    }, [isLoaded, user, setValue])

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')
        try {
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitStatus('success')
                reset()
            } else {
                throw new Error('Failed to send email')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className={`${nunito.className} mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white`}>Contact Us</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input
                            {...register('email')}
                            type="email"
                            id="email"
                            placeholder=""
                            className={`${telex.className} shadow-sm bg-gray-50 border text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-primary-500 focus:border-primary-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="name" className={`${telex.className}block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`}>Your Name</label>
                        <input
                            {...register('name')}
                            type="text"
                            id="name"
                            placeholder=""
                            className={`block p-3 w-full text-sm text-white bg-gray-50 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className={`${telex.className}block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400`}>Your message</label>
                        <textarea
                            {...register('message')}
                            id="message"
                            rows={6}
                            placeholder="Leave a comment..."
                            className={`block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700`}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 px-5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700"
                    >
                        {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                </form>
                {submitStatus === 'success' && (
                    <p className="mt-4 text-green-500 text-center">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                    <p className="mt-4 text-red-500 text-center">Failed to send message. Please try again.</p>
                )}
            </div>
        </section>
    )
}
