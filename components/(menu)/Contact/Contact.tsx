
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useUser } from '@clerk/nextjs'
import { nunito } from '@/app/ui/fonts'

const schema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long" })
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
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
        <div className="max-w-md mx-auto border-2 mt-6 p-6 bg-white rounded shadow-md">
            <h1 className={`${nunito.className} text-2xl font-bold mb-7 text-gray-700`}>Contact Us</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register('name')}
                        placeholder="Your Name"
                        className={`w-full px-3 py-2 text-gray-700 border rounded focus:outline-none bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-200 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        {...register('email')}
                        placeholder="Your Email"
                        type="email"
                        className={`w-full px-3 py-2 text-gray-700 border rounded focus:outline-none bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-200 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
          <textarea
              {...register('message')}
              placeholder="Your Message"
              rows={4}
              className={`w-full px-3 py-2 text-gray-700 border rounded focus:outline-none bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-200 ${errors.message ? "border-red-500" : "border-gray-300"}`}
          />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 border rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            {submitStatus === 'success' && (
                <p className="mt-4 text-green-500">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
                <p className="mt-4 text-red-500">Failed to send message. Please try again.</p>
            )}
        </div>
    )
}