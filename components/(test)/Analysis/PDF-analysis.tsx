// 'use client'
//
// import React, { useCallback, useEffect, useState } from 'react'
// import { useUser } from '@clerk/nextjs'
// import useSWR from 'swr'
// import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
// import FinalAnalysis from '@/components/(test)/final-analysis'
// import { Button } from '@/components/ui/button'
// import { calculateTestResponseAverage, setSummedTotals } from '@/app/api/users'
// import PDFDownloadButton from '@/components/(test)/Analysis/pdf-download-button'
//
// interface Result {
//     scale: number
//     positions: number[]
//     answers: number[]
//     summedResult: number
//     analysis: string
// }
//
// interface AnalysisData {
//     uniqueResults: Result[]
//     totalResults: number
//     totalSummedValues: number
//     lieAnalysis: string
//     totalLie: number
//     chartData: {
//         scale: string
//         score: number
//         statement: string
//     }[]
// }
//
// const fetcher = (url: string) => fetch(url).then((res) => res.json())
//
// function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
//     return (
//         <div role="alert">
//             <p>Something went wrong:</p>
//             <pre>{error.message}</pre>
//             <Button onClick={resetErrorBoundary}>Try again</Button>
//         </div>
//     )
// }
//
// export default function Analysis() {
//     const [fadeIn, setFadeIn] = useState(true)
//     const { user, isSignedIn } = useUser()
//
//     const {
//         data: analysisData,
//         error,
//         mutate,
//     } = useSWR<AnalysisData>('/api/analysis?limit=58', fetcher, {
//         revalidateOnFocus: false,
//         revalidateOnReconnect: false,
//     })
//
//     const persistTotalSummedValues = useCallback(async () => {
//         if (isSignedIn && user?.id && analysisData) {
//             try {
//                 const adjustedTotal =
//                     analysisData.totalSummedValues + analysisData.totalLie / 10
//                 await calculateTestResponseAverage(user.id)
//                 await setSummedTotals(adjustedTotal)
//             } catch (error) {
//                 console.error('Error persisting totalSummedValues:', error)
//             }
//         }
//     }, [isSignedIn, user, analysisData])
//
//     useEffect(() => {
//         persistTotalSummedValues()
//     }, [persistTotalSummedValues])
//
//     useEffect(() => {
//         setFadeIn(true)
//     }, [analysisData])
//
//     const isDataReady = analysisData && analysisData.uniqueResults && analysisData.uniqueResults.length > 0
//
//     useEffect(() => {
//         if (isDataReady) {
//             console.log('Analysis data is ready:', analysisData)
//         }
//     }, [isDataReady, analysisData])
//
//     if (error) return <div>Failed to load</div>
//     if (!analysisData) return <div>Loading...</div>
//
//     return (
//         <ErrorBoundary
//             FallbackComponent={ErrorFallback}
//             onReset={() => {
//                 mutate()
//             }}
//         >
//             <section className="py-12 bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100">
//                 <div className="container mx-auto px-4">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-6">
//                         Analysis Results
//                     </h1>
//                     {analysisData.uniqueResults.length > 0 ? (
//                         <div className="space-y-6">
//                             {analysisData.uniqueResults.map((result, index) => (
//                                 <div
//                                     key={result.scale}
//                                     className={`p-4 shadow-lg rounded-lg border border-gray-200 ${
//                                         index % 2 === 0
//                                             ? 'bg-hrqColors-skyBlue-400'
//                                             : 'bg-hrqColors-skyBlue-600'
//                                     }
//                     ${fadeIn ? 'opacity-100' : 'opacity-0'}
//                     transition-opacity duration-700 ease-in-out`}
//                                 >
//                                     <p className="text-gray-800">
//                                         {result.analysis}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="text-gray-600">No results available.</p>
//                     )}
//                     {analysisData.lieAnalysis && (
//                         <FinalAnalysis
//                             lieAnalysis={analysisData.lieAnalysis}
//                             totalSummedValues={
//                                 analysisData.totalSummedValues +
//                                 analysisData.totalLie / 10
//                             }
//                             chartData={analysisData.chartData}
//                         />
//                     )}
//                     <div className="mt-6">
//                         <PDFDownloadButton analysisData={analysisData} />
//                     </div>
//                 </div>
//             </section>
//         </ErrorBoundary>
//     )
// }

'use client'

import React, { useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import useSWR from 'swr'
import { pdf } from '@react-pdf/renderer'
import { calculateTestResponseAverage, setSummedTotals } from '@/app/api/users'
import PDFDocument from '@/components/(test)/Analysis/pdf-document'

interface Scale {
    number: number;
    name: string;
}

interface Result {
    scale: number
    positions: number[]
    answers: number[]
    summedResult: number
    analysis: string
}

interface AnalysisData {
    uniqueResults: Result[]
    totalResults: number
    totalSummedValues: number
    lieAnalysis: string
    totalLie: number
    chartData: {
        scale: string
        score: number
        statement: string
    }[]
    scales?: Scale[][]
}

const fetcher = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('An error occurred while fetching the data.')
    }
    return response.json()
}

export default function HeadlessPDFGenerator() {
    const { user, isSignedIn } = useUser()

    const {
        data: analysisData,
        error
    } = useSWR<AnalysisData>('/api/analysis?limit=58', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const persistTotalSummedValues = useCallback(async () => {
        if (isSignedIn && user?.id && analysisData) {
            try {
                const adjustedTotal = analysisData.totalSummedValues + analysisData.totalLie / 10
                await calculateTestResponseAverage(user.id)
                await setSummedTotals(adjustedTotal)
            } catch (error) {
                console.error('Error persisting totalSummedValues:', error)
            }
        }
    }, [isSignedIn, user, analysisData])

    const generateAndDownloadPDF = async () => {
        if (!analysisData) return

        try {
            const adjustedTotal = analysisData.totalSummedValues + analysisData.totalLie / 10
            await persistTotalSummedValues()

            // Generate PDF
            const blob = await pdf(
                <PDFDocument
                    lieAnalysis={analysisData.lieAnalysis}
                    totalSummedValues={adjustedTotal}
                    chartData={analysisData.chartData}
                    scales={analysisData.scales || []}
                    chartImages={[]} // Since we're running headless, we won't have chart images
                />
            ).toBlob()

            // Trigger download
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `test-analysis-results-${Date.now()}.pdf`
            link.click()
            URL.revokeObjectURL(url)

        } catch (error) {
            console.error('Error generating PDF:', error)
        }
    }

    // Auto-generate PDF when data is ready
    React.useEffect(() => {
        if (analysisData && !error) {
            generateAndDownloadPDF()
        }
    }, [analysisData])

    // Return null since we don't want to render anything
    return null
}