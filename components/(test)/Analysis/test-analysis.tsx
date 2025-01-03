'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import useSWR from 'swr'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { pdf } from '@react-pdf/renderer'
import Pagination from '@/components/(test)/pagination'
import FinalAnalysis from '@/components/(test)/final-analysis'
import { Button } from '@/components/ui/button'
import {
    calculateTestResponseAverage,
    setSummedTotals,
} from '@/lib/actions/users'
import PDFDocument from '@/components/(test)/Analysis/pdf-document'

const ITEMS_PER_PAGE = 6

interface Result {
    scale: number
    positions: number[]
    answers: number[]
    summedResult: number
    analysis: string
}

interface ChartDataItem {
    scale: string
    score: number
    statement: string
    tooltipContent: string
    color: string
}

interface AnalysisData {
    uniqueResults: Result[]
    totalResults: number
    totalSummedValues: number
    lieAnalysis: string
    totalLie: number
    chartData: ChartDataItem[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
    )
}

export default function TestAnalysis() {
    const [fadeIn, setFadeIn] = useState(true)
    const { user, isSignedIn } = useUser()
    const [currentPage, setCurrentPage] = useState(1)

    const {
        data: analysisData,
        error,
        mutate,
    } = useSWR<AnalysisData>(
        `/api/analysis?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    const totalPages = useMemo(() => {
        return analysisData
            ? Math.ceil(analysisData.totalResults / ITEMS_PER_PAGE)
            : 1
    }, [analysisData])

    const persistTotalSummedValues = useCallback(async () => {
        if (isSignedIn && user?.id && analysisData) {
            try {
                const adjustedTotal =
                    analysisData.totalSummedValues + analysisData.totalLie / 10
                await calculateTestResponseAverage(user.id)
                await setSummedTotals(adjustedTotal)
            } catch (error) {
                console.error('Error persisting totalSummedValues:', error)
            }
        }
    }, [isSignedIn, user, analysisData])

    useEffect(() => {
        persistTotalSummedValues()
    }, [persistTotalSummedValues])

    const handlePageChange = useCallback((pageNumber: number) => {
        setFadeIn(false)
        setTimeout(() => {
            setCurrentPage(pageNumber)
            setFadeIn(true)
            window.scrollTo({ top: 440, behavior: 'smooth' })
        }, 300)
    }, [])

    const handlePDFDownload = useCallback(async () => {
        if (!analysisData) return
        try {
            const adjustedTotal =
                analysisData.totalSummedValues + analysisData.totalLie / 10
            const blob = await pdf(
                <PDFDocument
                    lieAnalysis={analysisData.lieAnalysis}
                    totalSummedValues={adjustedTotal}
                    chartData={analysisData.chartData}
                    scales={[]}
                    chartImages={[]}
                />
            ).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `test-analysis-results-${Date.now()}.pdf`
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error generating PDF:', error)
        }
    }, [analysisData])

    if (error) return <div>Failed to load</div>
    if (!analysisData) return <div>Loading...</div>

    const enhancedChartData: ChartDataItem[] = analysisData.chartData.map(item => ({
        ...item,
        tooltipContent: `${item.scale}: ${item.score}`,
        color: '#4299E1' // Default color, adjust as needed
    }))

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                setCurrentPage(1)
                mutate()
            }}
        >
            <section className="py-12 bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100">
                <div className="container mx-auto px-4">
                    <h1 className="animate-fade-in text-3xl font-bold text-gray-800 mb-6">
                        Analysis Results
                    </h1>

                    {analysisData.uniqueResults.length > 0 ? (
                        <div className="space-y-6">
                            {analysisData.uniqueResults.map((result, index) => (
                                <div
                                    key={result.scale}
                                    className={`p-4 shadow-lg rounded-2xl border border-dark ${
                                        index % 2 === 0
                                            ? 'bg-hrqColors-skyBlue-400'
                                            : 'bg-hrqColors-skyBlue-500'
                                    } 
                    ${fadeIn ? 'opacity-100' : 'opacity-0'} 
                    transition-opacity duration-700 ease-in-out`}
                                >
                                    <p className="text-gray-800 animate-fade-in">
                                        {result.analysis}
                                        {result.scale === 100
                                            ? ' (100%)'
                                            : result.scale === 0
                                                ? ' (0%)'
                                                : ''}
                                    </p>
                                </div>
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
                    {currentPage === totalPages && analysisData.lieAnalysis && (
                        <>
                            <FinalAnalysis
                                lieAnalysis={analysisData.lieAnalysis}
                                totalSummedValues={
                                    analysisData.totalSummedValues +
                                    analysisData.totalLie / 10
                                }
                                chartData={enhancedChartData}
                            />
                            <div className="mt-8 flex justify-center">
                                <Button
                                    onClick={handlePDFDownload}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full w-[240px] bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
                                >
                                    Download PDF Report
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </ErrorBoundary>
    )
}