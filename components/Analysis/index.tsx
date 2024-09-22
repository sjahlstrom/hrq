'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import testAnalysisData from '@/components/Analysis/Data/TestAnalysisData'
import lieScale from '@/components/Analysis/Data/LieScale'
import {
    calculateTestResponseAverage,
    getTestResponses,
    setSummedTotals,
} from '@/app/api/users'
import testQuestions from '@/components/(menu)/Test/Data/testQuestions'
import SampleAnalysis from '@/components/Analysis/SampleAnalysis'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]

export default function Analysis() {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    return mode === 'test' ? <TestAnalysis /> : <SampleAnalysis />
}

function TestAnalysis() {
    const [answers, setAnswers] = useState<number[]>([])
    const [uniqueResults, setUniqueResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [totalSummedValues, setTotalSummedValues] = useState<number>(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const { user, isSignedIn } = useUser()

    const fetchAnswers = useCallback(async () => {
        setLoading(true)
        try {
            const fetchedAnswers = await getTestResponses()
            setAnswers(fetchedAnswers)
        } catch (error) {
            console.error('Error fetching answers:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    const calculateLieValues = useCallback((answers: number[]) => {
        const lieValues = lies.map((index) => answers[index]).filter(Boolean)
        const totalLie = lieValues.reduce((acc, value) => acc + value, 0)

        const analysis =
            lieScale.find(
                (entry) => totalLie >= entry.low && totalLie <= entry.high
            )?.analysis || 'No analysis available.'
        setLieAnalysis(analysis)
    }, [])

    const evaluateResults = useCallback((answers: number[]) => {
        const results = []
        const evaluatedPositions = new Set()
        let totalSum = 0

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
                        pos >= 0 && pos < answers.length ? answers[pos] : 1
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

                    totalSum += result
                }
            }
        })

        setTotalSummedValues(totalSum)

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
    }, [])

    useEffect(() => {
        fetchAnswers()
    }, [fetchAnswers])

    useEffect(() => {
        if (answers.length > 0) {
            calculateLieValues(answers)
            evaluateResults(answers)
        }
    }, [answers, calculateLieValues, evaluateResults])

    useEffect(() => {
        if (isSignedIn && user?.id) {
            const persistTotalSummedValues = async () => {
                try {
                    await calculateTestResponseAverage(user.id)
                    await setSummedTotals(totalSummedValues)
                    console.log(
                        'Persisted Total Summed Values:',
                        totalSummedValues
                    )
                } catch (error) {
                    console.error('Error persisting totalSummedValues:', error)
                }
            }
            persistTotalSummedValues()
        }
    }, [isSignedIn, user, totalSummedValues])

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth <= 1178 ? 4 : 6)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const indexOfLastResult = currentPage * itemsPerPage
    const indexOfFirstResult = indexOfLastResult - itemsPerPage
    const currentResults = uniqueResults.slice(
        indexOfFirstResult,
        indexOfLastResult
    )
    const totalPages = Math.ceil(uniqueResults.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 440, behavior: 'smooth' })
    }

    if (loading) {
        return <p className="text-gray-600">Loading...</p>
    }

    return (
        <section className="p-6 min-h-screen bg-gray-300">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis</h1>
            {currentResults.length > 0 ? (
                <div className="space-y-4">
                    {currentResults.map((result, index) => (
                        <ResultCard key={index} result={result} index={index} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No results available.</p>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            {currentPage === totalPages && lieAnalysis && (
                <FinalAnalysis
                    lieAnalysis={lieAnalysis}
                    totalSummedValues={totalSummedValues}
                />
            )}
        </section>
    )
}

function ResultCard({ result, index }) {
    const getResultBackgroundColor = (index: number) =>
        index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'

    return (
        <Card className={`${getResultBackgroundColor(index)} border-gray-400`}>
            <CardContent className="p-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Scale: {result.scale}
                </h2>
                <p className="text-gray-700">
                    Question Positions: {result.positions.join(', ')}
                </p>
                <p className="text-gray-700">
                    Answers: {result.answers.join(', ')}
                </p>
                <p className="text-gray-700">
                    Summed Result: {result.summedResult}
                </p>
                <p className="text-gray-700">Analysis: {result.analysis}</p>
            </CardContent>
        </Card>
    )
}

function Pagination({ currentPage, totalPages, handlePageChange }) {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav
            className="flex flex-col items-center mt-6"
            aria-label="Pagination"
        >
            <ul className="inline-flex items-center space-x-2">
                {/*Previous button*/}
                <li>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-[120px] bg-pantone624 hover:bg-pantone625 active:bg-green-800 border border-pantone621 transition-colors duration-300"
                    >
                        <span className="sr-only">Next</span>
                        Previous
                    </Button>

                </li>

                {/* Page Number Buttons */}
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <Button
                            onClick={() => handlePageChange(number)}
                            variant={
                                currentPage === number ? 'secondary' : 'outline'
                            }
                            size="icon"
                            className="rounded-full bg-pantone624 hover:bg-pantone625  active:bg-green-800 border border-pantone624 transition-colors duration-300 mx-1"
                        >
                            {number}
                        </Button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-[120px] bg-pantone624 hover:bg-pantone625 border border-pantone621 transition-colors duration-300"
                    >
                        <span className="sr-only">Next</span>
                        Next
                    </Button>
                </li>
            </ul>

            {/* Page X of X Text */}
            <div className="mt-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </div>
        </nav>
    )
}

function FinalAnalysis({ lieAnalysis, totalSummedValues }) {
    return (
        <div className="mt-8 space-y-8">
            <Card>
                <CardContent className="p-6">
                    <p className="text-gray-700">{lieAnalysis}</p>
                </CardContent>
            </Card>
            <ScoreClassificationTable />
            <NextSteps totalSummedValues={totalSummedValues} />
        </div>
    )
}

function ScoreClassificationTable() {
    const tableData = [
        {
            score: '≥ 1501.0',
            percentile: '98th and above',
            rq: '130 and above',
            classification: 'Very Superior',
        },
        {
            score: '1416 to 1500.5',
            percentile: '91 to 97',
            rq: '120-129',
            classification: 'Superior',
        },
        {
            score: '1314 to 1415.5',
            percentile: '75 to 90',
            rq: '110-119',
            classification: 'High Average',
        },
        {
            score: '1152 to 1313.5',
            percentile: '25 to 74',
            rq: '90-109',
            classification: 'Average',
        },
        {
            score: '1027 to 1151.5',
            percentile: '9 to 24',
            rq: '80-89',
            classification: 'Low Average',
        },
        {
            score: '903.5 to 1026.5',
            percentile: '2 to 8',
            rq: '70-79',
            classification: 'Borderline',
        },
        {
            score: '≤ 903',
            percentile: '1.98 and below',
            rq: '69 and below',
            classification: 'Inferior',
        },
    ]

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-red-800 text-center mb-6">
                    Score Classification Table
                </h2>
                <div className="grid grid-cols-4 gap-2 text-center text-red-800">
                    <div className="font-semibold">
                        Total (Composite) Scores
                    </div>
                    <div className="font-semibold">Percentile</div>
                    <div className="font-semibold">RQ</div>
                    <div className="font-semibold">Classification</div>
                    {tableData.map((row, index) => (
                        <React.Fragment key={index}>
                            <div>{row.score}</div>
                            <div>{row.percentile}</div>
                            <div>{row.rq}</div>
                            <div>{row.classification}</div>
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function NextSteps({ totalSummedValues }) {
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Next Steps
                </h2>
                <p className="text-gray-700 mt-4">
                    Based on your analysis, we recommend reviewing the results
                    carefully and considering the following actions:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                    <li className="font-semibold">
                        Your Total Composite Score is {totalSummedValues}
                    </li>
                    <li>Review the areas where scores were below average.</li>
                    <li>Consider additional tests to explore further.</li>
                    <li>Reach out to a professional if needed.</li>
                </ul>
            </CardContent>
        </Card>
    )
}
