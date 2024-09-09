'use client'

import React, { useCallback, useEffect, useState } from 'react'
import testAnalysisData from '@/components/Analysis/Data/TestAnalysisData'
import lieScale from '@/components/Analysis/Data/LieScale'
import { useSearchParams } from 'next/navigation'
import {
    calculateTestResponseAverage,
    getTestResponses,
} from '@/app/api/answers'
import testQuestions from '@/components/(menu)/Test/Data/testQuestions'
import SampleAnalysis from '@/components/Analysis/SampleAnalysis'
import { useUser } from '@clerk/nextjs'

const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]

export const Analysis = () => {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    return mode === 'test' ? <TestAnalysis /> : <SampleAnalysis />
}

const TestAnalysis = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [fadeIn, setFadeIn] = useState(false)
    const [totalLieValue, setTotalLieValue] = useState(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [uniqueResults, setUniqueResults] = useState<any[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const [totalPages, setTotalPages] = useState(0)
    const [total, setTotal] = useState<number | null>(null)

    const { user, isSignedIn } = useUser()

    useEffect(() => {
        const fetchTotal = async () => {
            if (user?.id) {
                try {
                    const userAverage = await calculateTestResponseAverage(
                        user.id
                    )
                    setTotal(userAverage)
                } catch (error) {
                    console.error('Error calculating total:', error)
                }
            }
        }

        if (isSignedIn) {
            fetchTotal()
        }
    }, [user, isSignedIn])

    const fetchAnswers = useCallback(async () => {
        setLoading(true)
        try {
            const fetchedAnswers = await getTestResponses()
            if (fetchedAnswers.length > 0) {
                const questionsList = fetchedAnswers
                    .map(
                        (answer, index) =>
                            testAnalysisData.find(
                                (q) =>
                                    q.answer === index &&
                                    q.low <= answer &&
                                    q.high >= answer &&
                                    q.scale
                            ) || null
                    )
                    .filter(Boolean)

                setMatchedQuestions(questionsList)
            }
            setAnswers(fetchedAnswers)
        } catch (error) {
            console.error('Error fetching answers:', error)
            setMatchedQuestions([])
        } finally {
            setLoading(false)
        }
    }, [])

    const calculateLieValues = useCallback(() => {
        const lieValues = lies.map((index) => answers[index]).filter(Boolean)
        const totalLie = lieValues.reduce((acc, value) => acc + value, 0)
        setTotalLieValue(totalLie)

        const analysis =
            lieScale.find(
                (entry) => totalLie >= entry.low && totalLie <= entry.high
            )?.analysis || 'No analysis available.'
        setLieAnalysis(analysis)
    }, [answers])

    const evaluateResults = useCallback(() => {
        const results = []
        const evaluatedPositions = new Set()

        if (testQuestions.length > 0 && answers.length > 0) {
            testQuestions.forEach((q, i) => {
                if (q.scale !== 64 && !evaluatedPositions.has(q.position)) {
                    const matches = testQuestions.reduce((acc, item, index) => {
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
                        evaluatedPositions.add(q.position)
                        matches.forEach((pos) => evaluatedPositions.add(pos))

                        const positions = [q.position, ...matches]
                        const answersValues = positions.map((pos) =>
                            pos >= 0 && pos < answers.length ? answers[pos] : 0
                        )
                        const sum = answersValues.reduce(
                            (total, value) => total + value,
                            0
                        )
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

            const uniqueResultsMap = new Map(
                results.map((item) => [item.scale, item])
            )
            const uniqueResults = Array.from(uniqueResultsMap.values())

            const resultsWithAnalysis = uniqueResults.map((result) => {
                const analysis =
                    testAnalysisData.find(
                        (q) =>
                            q.scale === result.scale &&
                            result.summedResult >= q.low &&
                            result.summedResult <= q.high
                    )?.analysis || 'No analysis available.'

                return { ...result, analysis }
            })

            setUniqueResults(resultsWithAnalysis)
        }
    }, [answers])

    useEffect(() => {
        fetchAnswers()
    }, [fetchAnswers])

    useEffect(() => {
        if (answers.length > 0) {
            calculateLieValues()
        }
    }, [answers, calculateLieValues])

    useEffect(() => {
        evaluateResults()
    }, [answers, evaluateResults])

    useEffect(() => {
        window.scrollTo({ top: 440, behavior: 'smooth' })
    }, [currentPage])

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth <= 1178 ? 4 : 6)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setTotalPages(Math.ceil(matchedQuestions.length / itemsPerPage))
    }, [matchedQuestions, itemsPerPage])

    useEffect(() => {
        setFadeIn(false)
        const timer = setTimeout(() => setFadeIn(true), 300)
        return () => clearTimeout(timer)
    }, [currentPage])

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const getResultBackgroundColor = (index: number) =>
        index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'

    const indexOfLastResult = currentPage * itemsPerPage
    const indexOfFirstResult = indexOfLastResult - itemsPerPage
    const currentUniqueResults = uniqueResults.slice(
        indexOfFirstResult,
        indexOfLastResult
    )
    const totalUniquePages = Math.ceil(uniqueResults.length / itemsPerPage)

    return (
        <section className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis</h1>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : currentUniqueResults.length > 0 ? (
                <div
                    className={`space-y-4 transition-opacity duration-5000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                >
                    {currentUniqueResults.map((result, index) => (
                        <div
                            key={index}
                            className={`p-4 shadow-md rounded-lg border border-gray-400 ${getResultBackgroundColor(index)}`}
                        >
                            <p className="text-gray-700">{result.analysis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No results available.</p>
            )}

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`relative w-24 px-3 py-2 rounded transition-all duration-300 ${
                        currentPage === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-logo-green text-white hover:bg-[#4F7164]'
                    }`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <div className="hidden md:flex">
                    {Array.from(
                        { length: totalUniquePages },
                        (_, i) => i + 1
                    ).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 rounded ${
                                currentPage === pageNumber
                                    ? 'bg-[#9BB7A4] text-gray-800'
                                    : 'bg-gray-200 text-[#9BB7A4] hover:bg-[#4F7164] hover:text-white'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`relative w-24 px-3 py-2 rounded transition-all duration-300 ${
                        currentPage === totalUniquePages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-logo-green text-white hover:bg-[#4F7164]'
                    }`}
                    disabled={currentPage === totalUniquePages}
                >
                    Next
                </button>
            </div>
                         {currentPage === totalUniquePages && lieAnalysis && (
                 <div className="mt-8 animate-fade-in">
                     <div className="bg-pantone624 shadow-lg rounded-lg border border-gray-300 p-6">
                         <p className="text-gray-700 mt-2">{lieAnalysis}</p>
                     </div>

                     <div className="mt-8 p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-300">
                         <h2 className="text-xl font-semibold text-red-800 text-center mb-6">
                             Score Classification Table
                         </h2>

                         <div className="grid grid-cols-4  text-center text-red-800">
                             <div className="font-semibold">Total (Composite) Scores</div>
                             <div className="font-semibold">Percentile</div>
                             <div className="font-semibold">RQ</div>
                             <div className="font-semibold">Classification</div>

                             {/* Row 1 */}
                             <div>≥ 1501.0</div>
                             <div>98th and above</div>
                             <div>130 and above</div>
                             <div>Very Superior</div>

                             {/* Row 2 */}
                             <div>1416 to 1500.5</div>
                             <div>91 to 97</div>
                             <div>120-129</div>
                             <div>Superior</div>

                             {/* Row 3 */}
                             <div>1314 to 1415.5</div>
                             <div>75 to 90</div>
                             <div>110-119</div>
                             <div>High Average</div>

                             {/* Row 4 */}
                             <div>1152 to 1313.5</div>
                             <div>25 to 74</div>
                             <div>90-109</div>
                             <div>Average</div>

                             {/* Row 5 */}
                             <div>1027 to 1151.5</div>
                             <div>9 to 24</div>
                             <div>80-89</div>
                             <div>Low Average</div>

                             {/* Row 6 */}
                             <div>903.5 to 1026.5</div>
                             <div>2 to 8</div>
                             <div>70-79</div>
                             <div>Borderline</div>

                             {/* Row 7 */}
                             <div>≤ 903</div>
                             <div>1.98 and below</div>
                             <div>69 and below</div>
                             <div>Inferior</div>
                         </div>
                     </div>

                     {/*/!* Additional content or component *!/*/}
                     <div className="mt-8 p-6 bg-gray-100 shadow-lg rounded-lg border border-gray-300">
                         <h2 className="text-xl font-semibold text-gray-800">Next Steps</h2>
                         <p className="text-gray-700 mt-4">
                             Based on your analysis, we recommend reviewing the results carefully and considering the following actions:
                         </p>
                         <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                             <li>Your Total Composite Score is {total}</li>

                             <li>Review the areas where scores were below average.</li>
                             <li>Consider additional tests to explore further.</li>
                             <li>Reach out to a professional if needed.</li>
                         </ul>
                     </div>
                 </div>
                         )}
        </section>
    )
}
export default Analysis
