'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import sampleAnalysisData from '@/components/(test)/Analysis/Data/SampleAnalysisData'
import sampleQuestions from '@/components/(test)/Test/Data/sampleQuestions'

interface MatchedQuestion {
    question: string
    analysis: string
}

const SampleAnalysis: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState<MatchedQuestion[]>(
        []
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [fadeIn, setFadeIn] = useState(false)

    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

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

    return (
        // <section className="p-6 bg-gradient-radial from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100 min-h-screen">
        <section className="py-12 bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100">

            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Analysis...
            </h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
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
                            <p className="text-gray-800">{question.analysis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}

            <div
                className="mt-8 bg-custom-radial from-hrqColors-sunsetOrange-400 to-hrqColors-sunsetOrange-200 shadow-md rounded-lg border border-gray-200 p-6">
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
        </section>
    )
}

export default SampleAnalysis
