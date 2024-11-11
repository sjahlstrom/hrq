'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import testAnalysisData from '@/components/(test)/Analysis/Data/Constants/TestAnalysisData'
import lieScale from '@/components/(test)/Analysis/Data/Constants/LieScale'
import {
    calculateTestResponseAverage,
    getTestResponses,
    setSummedTotals,
} from '@/app/api/users'
import testQuestions from '@/components/(test)/Test/Data/testQuestions'
import FinalAnalysis from '@/components/(test)/final-analysis'

const LIES = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]

interface Result {
    scale: number
    positions: number[]
    answers: number[]
    summedResult: number
    analysis: string
}

export default function PDFAnalysis() {
    const [answers, setAnswers] = useState<number[]>([])
    const [uniqueResults, setUniqueResults] = useState<Result[]>([])
    const [loading, setLoading] = useState(true)
    const [totalSummedValues, setTotalSummedValues] = useState(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [totalLie, setTotalLie] = useState(0)

    const { user, isSignedIn } = useUser()

    const fetchAnswers = useCallback(async () => {
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
        const lieValues = LIES.map((index) => answers[index] || 0)
        const totalLieValue = lieValues.reduce((acc, value) => acc + value, 0)
        setTotalLie(totalLieValue)
        const analysis =
            lieScale.find(
                (entry) =>
                    totalLieValue >= entry.low && totalLieValue <= entry.high
            )?.analysis || 'No analysis available.'
        setLieAnalysis(analysis)
    }, [])

    const evaluateResults = useCallback((answers: number[]) => {
        const results: Result[] = []
        const evaluatedPositions = new Set<number>()
        let totalSum = 0

        testQuestions.forEach((q, i) => {
            if (q.scale !== 64 && !evaluatedPositions.has(q.position)) {
                const matches = testQuestions
                    .filter(
                        (item, index) =>
                            item.scale === q.scale &&
                            index !== i &&
                            !evaluatedPositions.has(item.position)
                    )
                    .map((item) => item.position)

                if (matches.length > 0) {
                    evaluatedPositions.add(q.position)
                    matches.forEach((pos) => evaluatedPositions.add(pos))

                    const positions = [q.position, ...matches]
                    const answersValues = positions.map(
                        (pos) => answers[pos] || 1
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
                        analysis: '',
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

        const resultsWithAnalysis = uniqueResults.map((result) => ({
            ...result,
            analysis:
                testAnalysisData.find(
                    (q) =>
                        q.scale === result.scale &&
                        result.summedResult >= q.low &&
                        result.summedResult <= q.high
                )?.analysis || 'No analysis available.',
        }))

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
                    const adjustedTotal = totalSummedValues + totalLie / 10
                    await calculateTestResponseAverage(user.id)
                    await setSummedTotals(adjustedTotal)
                } catch (error) {
                    console.error('Error persisting totalSummedValues:', error)
                }
            }
            persistTotalSummedValues()
        }
    }, [isSignedIn, user, totalSummedValues, totalLie])

    if (loading) {
        return <p className="text-gray-600">Loading...</p>
    }

    return (
        <section className="py-12 bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Analysis Results
                </h1>
                {uniqueResults.length > 0 ? (
                    <div className="space-y-6">
                        {uniqueResults.map((result, index) => (
                            <div
                                key={result.scale}
                                className={`p-4 shadow-lg rounded-lg border border-gray-200 ${
                                    index % 2 === 0
                                        ? 'bg-hrqColors-skyBlue-400'
                                        : 'bg-hrqColors-skyBlue-600'
                                } transition-opacity duration-700 ease-in-out`}
                            >
                                <p className="text-gray-800">
                                    {result.analysis}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No results available.</p>
                )}
                {lieAnalysis && (
                    <FinalAnalysis
                        lieAnalysis={lieAnalysis}
                        totalSummedValues={totalSummedValues + totalLie / 10}
                    />
                )}
            </div>
        </section>
    )
}