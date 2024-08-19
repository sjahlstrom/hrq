'use client'

import React, { useEffect, useState } from 'react'
import sampleQuestions from '@/components/Analysis/Data/SampleAnalysis'
import { useSearchParams } from 'next/navigation'
import { getTestResponses } from '@/app/api/answers'

const Analysis = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState<
        { question: string; analysis: string }[]
    >([])
    const [loading, setLoading] = useState<boolean>(true)

    const searchParams = useSearchParams()
    let mode = searchParams.get('mode')

    console.log("mode", mode)


    useEffect(() => {
        const fetchAnswers = async () => {
            if (mode === 'sample') {
                try {
                    // Retrieve answers from localStorage
                    const fetchedAnswers = localStorage.getItem('array')

                    if (fetchedAnswers) {
                        const answers = JSON.parse(fetchedAnswers)
                        setAnswers(answers)

                        if (answers.length > 0) {
                            const questions = answers
                                .map((answer, index) => {
                                    // Find the matching question in sampleQuestions
                                    return (
                                        sampleQuestions.find(
                                            (q) =>
                                                q.answer === index && // Matches the answer element with index
                                                q.low <= answer && // Low is less than or equal to the current answer
                                                q.high >= answer // High is greater than or equal to the current answer
                                        ) || null
                                    )
                                })
                                .filter((question) => question !== null) // Remove any null results

                            setMatchedQuestions(questions)
                        } else {
                            setMatchedQuestions([])
                        }
                    } else {
                        setMatchedQuestions([])
                    }
                } catch (error) {
                    console.error('Error fetching answers:', error)
                    setMatchedQuestions([])
                } finally {
                    setLoading(false) // Set loading to false once the data is fetched
                }
            }
            else {
console.log("it's a test")
                await getTestResponses()
                // Retrieve answers from the database

            }
        }

        fetchAnswers()
    }, [mode]) // Add mode as a dependency if it can change

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Analysis...
            </h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : matchedQuestions.length > 0 ? (
                <div className="space-y-4">
                    {matchedQuestions.map((question, index) => (
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
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}
        </div>
    )
}

export default Analysis
