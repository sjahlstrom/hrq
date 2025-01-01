'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import sampleAnalysisData from '@/components/(test)/Analysis/Data/Constants/SampleAnalysisData'
import sampleQuestions from '@/components/(test)/Test/Data/sampleQuestions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface MatchedQuestion {
    question: string
    analysis: string
}

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

const SampleAnalysis: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState<MatchedQuestion[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [fadeIn, setFadeIn] = useState(false)

    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const fetchAnswers = useCallback(async () => {
        setLoading(true)
        try {
            let fetchedAnswers: number[] = []

            if (mode === 'sample') {
                const storedAnswers = localStorage.getItem('array')
                if (storedAnswers) {
                    fetchedAnswers = JSON.parse(storedAnswers)
                }
            }

            const questions = fetchedAnswers
                .map((answer, index) => {
                    return sampleAnalysisData.find(
                        (q) =>
                            q.answer === index &&
                            q.low <= answer &&
                            q.high >= answer &&
                            q.scale
                    )
                })
                .filter(
                    (q): q is NonNullable<typeof q> =>
                        q !== null && q !== undefined
                )

            setAnswers(fetchedAnswers)
            setMatchedQuestions(questions)
        } catch (error) {
            console.error('Error fetching answers:', error)
            setMatchedQuestions([])
        } finally {
            setLoading(false)
        }
    }, [mode])

    useEffect(() => {
        fetchAnswers()
    }, [fetchAnswers])

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const foundScales = new Set<number>()
    const matchingQuestions: number[] = []

    sampleQuestions.forEach((q, i) => {
        if (!foundScales.has(q.scale)) {
            const matches = sampleQuestions.filter(
                (item, index) => item.scale === q.scale && index !== i
            )

            if (matches.length > 0) {
                foundScales.add(q.scale)
                matchingQuestions.push(
                    q.position,
                    ...matches.map((m) => m.position)
                )
            }
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Create HTML content from matched questions
            const resultsHTML = matchedQuestions
                .map((question) => `
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h2 style="font-size: 24px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">
                    ${question.question}
                </h2>
                <p style="color: #1f2937;">
                    ${question.analysis}
                </p>
            </div>
        `)
                .join('')

            const emailBody = `
            <div style="font-family: system-ui, -apple-system, sans-serif;">
                <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">Your Analysis Results</h1>
                ${resultsHTML}
            </div>
        `

            const [emailResponse, dbResponse] = await Promise.all([
                // Send email
                fetch('/api/send-analysis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        message: emailBody,
                    }),
                }),
                // Persist email to Sample table
                fetch('/api/sample', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                    }),
                })
            ]);

            const [emailData, dbData] = await Promise.all([
                emailResponse.json(),
                dbResponse.json()
            ]);

            if (emailData.success && dbData.success) {
                toast.success("Analysis results have been sent to your email")
                form.reset()
            } else {
                throw new Error(emailData.error || dbData.error || 'Failed to process request')
            }
        } catch (error) {
            toast.error("Failed to send analysis results. Please try again.")
        }
    }

    return (
        <section className="py-12 bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 px-2">
                Analysis...
            </h1>

            <div className="mb-4 bg-custom-radial from-hrqColors-sunsetOrange-400 to-hrqColors-sunsetOrange-200 shadow-md rounded-lg border border-gray-200 p-6">
                <p className="text-gray-50">
                    A mini-report, based on whether you score high, medium or
                    low, on the questions. The above questions represent only
                    one question for each trait or quality. The actual test has
                    more than one question for each and measures other
                    characters than the ones here. This is a sample report, only
                    one page of probably ten or fifteen for the actual test
                    report. It is offered to give you a feel for what will
                    follow, should you take the HighRQ test, which is much more
                    comprehensive. According to your scores, based upon a
                    comparison to norms, the following is likely true.
                </p>
            </div>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
                <>
                    <div className="space-y-6">
                        {matchedQuestions.map((question, index) => (
                            <div
                                key={index}
                                className={`p-4 shadow-md rounded-lg border border-gray-200 
                                ${index % 2 === 0 ? 'bg-hrqColors-skyBlue-400' : 'bg-hrqColors-skyBlue-600'} 
                                ${fadeIn ? 'opacity-100' : 'opacity-0'} 
                                transition-opacity duration-700 ease-in-out`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {question.question}
                                </h2>
                                {/*<p className="text-gray-800">{question.analysis}</p>*/}
                                <p className="text-gray-800">
                                    {question.analysis.slice(0, 34) + ' ...'}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-500 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">Get Your Analysis Results</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    type="email"
                                                    className="placeholder:text-hrqColors-coolGray-400 focus:placeholder:text-transparent"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Send Results
                                </Button>
                            </form>
                        </Form>
                    </div>
                </>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}
        </section>
    )
}

export default SampleAnalysis