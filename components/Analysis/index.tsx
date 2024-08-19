'use client'

import React, { useEffect, useState } from 'react'
import sampleQuestions from '@/components/Analysis/Data/SampleAnalysis'
import testQuestions from '@/components/Analysis/Data/Analysis'
import { useSearchParams } from 'next/navigation'
import { getTestResponses } from '@/app/api/answers'

const fetchSampleAnswers = async (setAnswers, setMatchedQuestions) => {
    try {
        const fetchedAnswers = localStorage.getItem('array')
        if (fetchedAnswers) {
            const answers = JSON.parse(fetchedAnswers)
            setAnswers(answers)
            const questions = answers
                .map((answer, index) =>
                    sampleQuestions.find(
                        (q) =>
                            q.answer === index &&
                            q.low <= answer &&
                            q.high >= answer
                    ) || null
                )
                .filter((q) => q !== null)
            setMatchedQuestions(questions)
        } else {
            setMatchedQuestions([])
        }
    } catch (error) {
        console.error('Error fetching sample answers:', error)
        setMatchedQuestions([])
    }
}

const fetchTestAnswers = async (setAnswers, setMatchedQuestions) => {
    try {
        const testResponses = await getTestResponses()
        if (testResponses) {
            setAnswers(testResponses)
            const questions = testResponses
                .map((answer, index) =>
                    testQuestions.find(
                        (q) =>
                            q.answer === index &&
                            q.low <= answer &&
                            q.high >= answer
                    ) || null
                )
                .filter((q) => q !== null)
            setMatchedQuestions(questions)
        } else {
            setMatchedQuestions([])
        }
    } catch (error) {
        console.error('Error fetching test responses:', error)
        setMatchedQuestions([])
    }
}

const Analysis = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState<
        { question: string; answer: number; analysis: string }[]
    >([])
    const [loading, setLoading] = useState<boolean>(true)

    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    const lies = [38 ,45, 52, 57, 69, 79, 91, 102, 109, 125]

    useEffect(() => {
        const fetchAnswers = async () => {
            setLoading(true)
            if (mode === 'sample') {
                await fetchSampleAnswers(setAnswers, setMatchedQuestions)
            } else if (mode === 'test') {
                await fetchTestAnswers(setAnswers, setMatchedQuestions)
            } else {
                setMatchedQuestions([])
            }
            setLoading(false)
        }

        fetchAnswers()
    }, [mode])
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis...</h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
                <div className="space-y-4">
                    {matchedQuestions
                        .filter(question => !lies.includes(question.answer))
                        .map((question, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    {question.question}
                                </h2>
                                <p className="text-gray-700">{question.analysis}</p>
                            </div>
                        ))}

                    {/*// now need to get the scores of the lie scale questions and add them up*/}
                    <div>
                        {matchedQuestions
                            .filter(question => lies.includes(question.answer)) // Filter questions based on the lie scale
                            .map((question, index) => (
                                <div key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                                    <p className="text-xl font-medium text-gray-900 mb-2">
                                        {question.question} {/* Render the question text inside a <p> tag */}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}
        </div>
    )
}

export default Analysis
