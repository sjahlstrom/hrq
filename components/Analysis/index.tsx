'use client'
import React, { useCallback, useEffect, useState } from 'react'
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
    const [matchedQuestions, setMatchedQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalLieValue, setTotalLieValue] = useState<number>(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [uniqueResults, setUniqueResults] = useState<any[]>([])
    const itemsPerPage = 5

    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    const fetchAnswers = useCallback(async () => {
        setLoading(true)
        try {
            let fetchedAnswers = []
            let questionsList = []

            if (mode === 'sample') {
                const storedAnswers = localStorage.getItem('array')
                if (storedAnswers) {
                    fetchedAnswers = JSON.parse(storedAnswers)
                }
            } else if (mode === 'test') {
                fetchedAnswers = await getTestResponses()
            }

            if (fetchedAnswers.length > 0) {
                questionsList = fetchedAnswers.map((answer, index) => {
                    const questionSet = mode === 'sample' ? sampleQuestions : testQuestions
                    return questionSet.find(
                        (q) => q.answer === index && q.low <= answer && q.high >= answer && q.scale
                    ) || null
                }).filter(Boolean)
            }

            setAnswers(fetchedAnswers)
            setMatchedQuestions(questionsList)
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
            const lieValues = lies.map((index) => answers[index]).filter(Boolean)
            const totalLie = lieValues.reduce((acc, value) => acc + value, 0)
            setTotalLieValue(totalLie)

            const analysis = lieScale.find(entry => totalLie >= entry.low && totalLie <= entry.high)?.analysis || 'No analysis available.'
            setLieAnalysis(analysis)
        }
    }, [answers])

    useEffect(() => {
        window.scrollTo({ top: 440, behavior: 'smooth' })
    }, [currentPage])

    const totalPages = Math.ceil(matchedQuestions.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const getResultBackgroundColor = (index) => {
        return index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'
    }

    useEffect(() => {
        if (questions.length > 0 && answers.length > 0) {
            questions.forEach((q, i) => {
                if (q.scale !== 64 && !evaluatedPositions.has(q.position)) {
                    const matches = questions.reduce((acc, item, index) => {
                        if (item.scale === q.scale && index !== i && !evaluatedPositions.has(item.position)) {
                            acc.push(item.position)
                        }
                        return acc
                    }, [])

                    if (matches.length > 0) {
                        evaluatedPositions.add(q.position)
                        matches.forEach((pos) => evaluatedPositions.add(pos))

                        const positions = [q.position, ...matches]
                        const answersValues = positions.map((pos) => pos >= 0 && pos < answers.length ? answers[pos] : 0)
                        const sum = answersValues.reduce((total, value) => total + value, 0)
                        const result = Math.floor(sum / 2)

                        results.push({
                            scale: q.scale,
                            positions,
                            answers: answersValues,
                            summedResult: result,
                        })
                    }
                }
            })

            const uniqueResultsMap = new Map(results.map(item => [item.scale, item]))
            const uniqueResults = Array.from(uniqueResultsMap.values())

            const resultsWithAnalysis = uniqueResults.map(result => {
                const analysis = testQuestions.find(
                    (q) => q.scale === result.scale && result.summedResult >= q.low && result.summedResult <= q.high
                )?.analysis || 'No analysis available.'

                return {
                    ...result,
                    analysis,
                }
            })

            setUniqueResults(resultsWithAnalysis)
        }
    }, [answers])

    const indexOfLastResult = currentPage * itemsPerPage
    const indexOfFirstResult = indexOfLastResult - itemsPerPage
    const currentUniqueResults = uniqueResults.slice(indexOfFirstResult, indexOfLastResult)
    const totalUniquePages = Math.ceil(uniqueResults.length / itemsPerPage)

    return (
        <section className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis</h1>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : currentUniqueResults.length > 0 ? (
                <div className="space-y-4">
                    {currentUniqueResults.map((result, index) => (
                        <div key={index} className={`p-4 shadow-md rounded-lg border border-gray-200 ${getResultBackgroundColor(index)}`}>
                            <p className="text-gray-700">Analysis: {result.analysis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No results available.</p>
            )}

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-logo-green text-white hover:bg-[#4F7164]'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: totalUniquePages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 rounded ${currentPage === pageNumber ? 'bg-[#9BB7A4] text-gray-800' : 'bg-gray-200 text-[#9BB7A4] hover:bg-[#4F7164] hover:text-white'}`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-3 py-2 rounded ${currentPage === totalUniquePages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-logo-green text-white hover:bg-[#4F7164]'}`}
                    disabled={currentPage === totalUniquePages}
                >
                    Next
                </button>
            </div>

            {currentPage === totalUniquePages && (
                <div className="mt-8">
                    <div className="bg-green-300 shadow-md rounded-lg border border-gray-200 p-6">
                        <p className="text-gray-700 mt-2">{lieAnalysis}</p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Analysis

