'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import testAnalysisData from '@/components/(test)/Analysis/Data/TestAnalysisData'
import lieScale from '@/components/(test)/Analysis/Data/LieScale'
import {
    calculateTestResponseAverage,
    getTestResponses,
    setSummedTotals,
} from '@/app/api/users'
import testQuestions from '@/components/(test)/Test/Data/testQuestions'
import ResultCard from '@/components/(test)/ResultCard'
import Pagination from '@/components/(test)/Pagination'
import FinalAnalysis from '@/components/(test)/FinalAnalysis'

const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]

 const TestAnalysis = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [uniqueResults, setUniqueResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [totalSummedValues, setTotalSummedValues] = useState<number>(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [totalLie, setTotalLie] = useState<number>(0)
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
        const totalLieValue = lieValues.reduce((acc, value) => acc + value, 0)
        setTotalLie(totalLieValue)
        const analysis =
            lieScale.find(
                (entry) => totalLieValue >= entry.low && totalLieValue <= entry.high
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
                    const adjustedTotal = totalSummedValues + (totalLie / 10)
                    await calculateTestResponseAverage(user.id)
                    await setSummedTotals(adjustedTotal)
                    console.log(
                        'Persisted Total Summed Values:',
                        adjustedTotal
                    )
                } catch (error) {
                    console.error('Error persisting totalSummedValues:', error)
                }
            }
            persistTotalSummedValues()
        }
    }, [isSignedIn, user, totalSummedValues, totalLie])

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
                    totalSummedValues={totalSummedValues + (totalLie / 10)}
                />
            )}
        </section>
    )
}

export default TestAnalysis