'use client'
import React, { useEffect, useState, useCallback } from 'react'
import sampleQuestions from '@/components/Analysis/Data/SampleAnalysis'
import testQuestions from '@/components/Analysis/Data/Analysis'
import lieScale from '@/components/Analysis/Data/LieScale'
import { useSearchParams } from 'next/navigation'
import { getTestResponses } from '@/app/api/answers'

import questions from '@/components/(menu)/Test/Data/questions'

const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]
const evaluatedPositions = new Set()
const results = []

const Analysis = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalLieValue, setTotalLieValue] = useState<number>(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [uniqueResults, setUniqueResults] = useState([]) // State to hold unique results
    const itemsPerPage = 5 // Adjust the number of items per page

    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    const fetchAnswers = useCallback(async () => {
        setLoading(true)
        try {
            let fetchedAnswers = []
            let questions = []

            if (mode === 'sample') {
                const storedAnswers = localStorage.getItem('array')
                if (storedAnswers) {
                    fetchedAnswers = JSON.parse(storedAnswers)
                }
            } else if (mode === 'test') {
                fetchedAnswers = await getTestResponses()
            }

            if (fetchedAnswers.length > 0) {
                questions = fetchedAnswers
                    .map((answer, index) => {
                        const questionSet =
                            mode === 'sample' ? sampleQuestions : testQuestions
                        return (
                            questionSet.find(
                                (q) =>
                                    q.answer === index &&
                                    q.low <= answer &&
                                    q.high >= answer &&
                                    q.scale
                            ) || null
                        )
                    })
                    .filter(Boolean)
            }

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
        if (answers.length > 0) {
            const lieValues = lies
                .map((index) => answers[index])
                .filter(Boolean)
            const totalLieValue = lieValues.reduce(
                (acc, value) => acc + value,
                0
            )

            setTotalLieValue(totalLieValue)

            // Get the corresponding analysis based on the totalLieValue
            const analysis =
                lieScale.find(
                    (entry) =>
                        totalLieValue >= entry.low &&
                        totalLieValue <= entry.high
                )?.analysis || 'No analysis available.'

            setLieAnalysis(analysis)
        }
    }, [answers])

    useEffect(() => {
        window.scrollTo({ top: 440, behavior: 'smooth' })
    }, [currentPage])

    const indexOfLastQuestion = currentPage * itemsPerPage
    const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage
    const currentQuestions = matchedQuestions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    )
    const totalPages = Math.ceil(matchedQuestions.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        window.scrollTo({ top: 440, behavior: 'smooth' })
    }, [currentPage])

    // Determine if we are on the last page of non-lie questions
    const isLastNonLiePage = currentPage === totalPages

    useEffect(() => {
        if (questions.length > 0 && answers.length > 0) {
            questions.forEach((q, i) => {
                // Skip if scale is 64 or if the current question has already been evaluated
                if (q.scale !== 64 && !evaluatedPositions.has(q.position)) {
                    // Find matching questions
                    const matches = questions.reduce((acc, item, index) => {
                        if (
                            item.scale === q.scale &&
                            index !== i &&
                            !evaluatedPositions.has(item.position)
                        ) {
                            acc.push(item.position)
                        }
                        return acc
                    }, [])

                    if (matches.length > 0) {
                        // Mark current and matching questions as evaluated
                        evaluatedPositions.add(q.position)
                        matches.forEach((pos) => evaluatedPositions.add(pos))

                        // Collect positions and retrieve answers values
                        const positions = [q.position, ...matches]
                        const answersValues = positions.map((pos) =>
                            pos >= 0 && pos < answers.length ? answers[pos] : 0
                        ) // Ensure indices are within bounds

                        // Sum the values and compute the result
                        const sum = answersValues.reduce(
                            (total, value) => total + value,
                            0
                        )
                        const result = Math.floor(sum / 2)

                        // Store the result with the corresponding scale
                        results.push({
                            scale: q.scale,
                            positions: positions,
                            answers: answersValues,
                            summedResult: result,
                        })
                    }
                }
            })

            // Filter unique scales
            const uniqueResultsMap = new Map(
                results.map((item) => [item.scale, item])
            )
            const uniqueResults = Array.from(uniqueResultsMap.values())

            // Map summed results to analysis
            const resultsWithAnalysis = uniqueResults.map((result) => {
                const analysis =
                    testQuestions.find(
                        (q) =>
                            q.scale === result.scale &&
                            result.summedResult >= q.low &&
                            result.summedResult <= q.high
                    )?.analysis || 'No analysis available.'

                return {
                    ...result,
                    analysis,
                }
            })

            setUniqueResults(resultsWithAnalysis)
        }
    }, [answers])

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Analysis...
            </h1>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : currentQuestions.length > 0 ? (
                <div className="space-y-4">
                    {currentQuestions
                        .filter((question) => !lies.includes(question.answer))
                        .map((question, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    {/*{question.question}*/}
                                </h2>
                                <p className="text-gray-500">
                                    Scale: {question.scale} -{' '}
                                    {question.summedResult}
                                </p>
                                <p className="text-gray-700">
                                    {question.analysis}
                                </p>
                                {/* For testing only */}
                                <br />
                                <p className="text-gray-500">
                                    {/*Question: {question.answer} - For testing only*/}
                                </p>
                            </div>
                        ))}

                    {!isLastNonLiePage && (
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-logo-green text-gray-200 rounded"
                            >
                                Previous
                            </button>
                            <span className="text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-logo-green text-gray-200 rounded"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">No matching questions found.</p>
            )}

            {isLastNonLiePage && (
                <div className="mt-8">
                    <h2 className="text-center text-2xl font-semibold text-gray-900 mb-4">
                        Embedded within the Test questions were questions to
                        gauge Truthfulness
                    </h2>

                    {/* TODO:  For testing only -- Remove */}
                    <p className="text-center text-xl text-red-700 mb-4">
                        Your total Lie scale value is:{' '}
                        <span className="font-bold">
                            {totalLieValue} -- Display for testing only
                        </span>
                    </p>
                    {lieAnalysis && (
                        <p className="text-center text-xl text-gray-700 mb-4">
                            <span className="font">{lieAnalysis}</span>
                        </p>
                    )}

                    {/* Display results with analysis */}
                    <div className="mt-8">
                        {uniqueResults.map((result, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white shadow-md rounded-lg border border-gray-200 mb-4"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Scale: {result.scale}
                                </h3>
                                <p className="text-gray-700">
                                    Answer Positions:{' '}
                                    {result.positions.join(', ')}
                                </p>
                                <p className="text-gray-700">
                                    Answers: {result.answers.join(', ')}
                                </p>
                                <p className="text-gray-700">
                                    Summed Result: {result.summedResult}
                                </p>
                                <p className="text-gray-700">
                                    Analysis: {result.analysis}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Analysis
