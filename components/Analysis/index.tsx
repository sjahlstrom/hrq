// 'use client'
//
// import React, { useCallback, useEffect, useState } from 'react'
// import testAnalysisData from '@/components/Analysis/Data/TestAnalysisData'
// import lieScale from '@/components/Analysis/Data/LieScale'
// import { useSearchParams } from 'next/navigation'
// import { getTestResponses } from '@/app/api/answers'
// import testQuestions from '@/components/(menu)/Test/Data/testQuestions'
// import SampleAnalysis from '@/components/Analysis/SampleAnalysis'
//
// const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]
// const evaluatedPositions = new Set()
// const results = []
//
// export const Analysis = () => {
//     const searchParams = useSearchParams()
//     const mode = searchParams.get('mode')
//
//     if (mode === 'test') {
//         return <TestAnalysis /> // Render the TestAnalysis component
//     } else {
//         return <SampleAnalysis /> // Render the SampleAnalysis component
//     }
// }
//
// const TestAnalysis = () => {
//     const [answers, setAnswers] = useState<number[]>([])
//     const [matchedQuestions, setMatchedQuestions] = useState<any[]>([])
//     const [loading, setLoading] = useState<boolean>(true)
//     const [currentPage, setCurrentPage] = useState<number>(1)
//     const [totalLieValue, setTotalLieValue] = useState<number>(0)
//     const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
//     const [uniqueResults, setUniqueResults] = useState<any[]>([])
//     const [itemsPerPage, setItemsPerPage] = useState<number>(6) // Default page size
//     const [totalPages, setTotalPages] = useState<number>(0) // Total pages calculation
//
//     const fetchAnswers = useCallback(async () => {
//         setLoading(true)
//         try {
//             let fetchedAnswers = await getTestResponses()
//
//             if (fetchedAnswers.length > 0) {
//                 const questionsList = fetchedAnswers
//                     .map((answer, index) => {
//                         return (
//                             testAnalysisData.find(
//                                 (q) =>
//                                     q.answer === index &&
//                                     q.low <= answer &&
//                                     q.high >= answer &&
//                                     q.scale
//                             ) || null
//                         )
//                     })
//                     .filter(Boolean)
//
//                 setMatchedQuestions(questionsList)
//             }
//
//             setAnswers(fetchedAnswers)
//         } catch (error) {
//             console.error('Error fetching answers:', error)
//             setMatchedQuestions([])
//         } finally {
//             setLoading(false)
//         }
//     }, [])
//
//     useEffect(() => {
//         fetchAnswers()
//     }, [fetchAnswers])
//
//     useEffect(() => {
//         if (answers.length > 0) {
//             const lieValues = lies
//                 .map((index) => answers[index])
//                 .filter(Boolean)
//             const totalLie = lieValues.reduce((acc, value) => acc + value, 0)
//             setTotalLieValue(totalLie)
//
//             const analysis =
//                 lieScale.find(
//                     (entry) => totalLie >= entry.low && totalLie <= entry.high
//                 )?.analysis || 'No analysis available.'
//             setLieAnalysis(analysis)
//         }
//     }, [answers])
//
//     useEffect(() => {
//         window.scrollTo({ top: 440, behavior: 'smooth' })
//     }, [currentPage])
//
//     useEffect(() => {
//         // Adjust items per page based on screen width
//         const handleResize = () => {
//             setItemsPerPage(window.innerWidth <= 1178 ? 4 : 6)
//         }
//
//         // Set initial items per page
//         handleResize()
//
//         // Add resize event listener
//         window.addEventListener('resize', handleResize)
//
//         // Clean up event listener on component unmount
//         return () => window.removeEventListener('resize', handleResize)
//     }, [])
//
//     useEffect(() => {
//         if (matchedQuestions.length > 0) {
//             setTotalPages(Math.ceil(matchedQuestions.length / itemsPerPage))
//         }
//     }, [matchedQuestions, itemsPerPage])
//
//     const handlePageChange = (pageNumber: number) => {
//         if (pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber)
//         }
//     }
//
//     const getResultBackgroundColor = (index) => {
//         return index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'
//     }
//
//     useEffect(() => {
//         if (testQuestions.length > 0 && answers.length > 0) {
//             testQuestions.forEach((q, i) => {
//                 if (q.scale !== 64 && !evaluatedPositions.has(q.position)) {
//                     const matches = testQuestions.reduce((acc, item, index) => {
//                         if (
//                             item.scale === q.scale &&
//                             index !== i &&
//                             !evaluatedPositions.has(item.position)
//                         ) {
//                             acc.push(item.position)
//                         }
//                         return acc
//                     }, [])
//
//                     if (matches.length > 0) {
//                         evaluatedPositions.add(q.position)
//                         matches.forEach((pos) => evaluatedPositions.add(pos))
//
//                         const positions = [q.position, ...matches]
//                         const answersValues = positions.map((pos) =>
//                             pos >= 0 && pos < answers.length ? answers[pos] : 0
//                         )
//                         const sum = answersValues.reduce(
//                             (total, value) => total + value,
//                             0
//                         )
//                         const result = Math.floor(sum / 2)
//
//                         results.push({
//                             scale: q.scale,
//                             positions,
//                             answers: answersValues,
//                             summedResult: result,
//                         })
//                     }
//                 }
//             })
//
//             const uniqueResultsMap = new Map(
//                 results.map((item) => [item.scale, item])
//             )
//             const uniqueResults = Array.from(uniqueResultsMap.values())
//
//             const resultsWithAnalysis = uniqueResults.map((result) => {
//                 const analysis =
//                     testAnalysisData.find(
//                         (q) =>
//                             q.scale === result.scale &&
//                             result.summedResult >= q.low &&
//                             result.summedResult <= q.high
//                     )?.analysis || 'No analysis available.'
//
//                 return {
//                     ...result,
//                     analysis,
//                 }
//             })
//
//             setUniqueResults(resultsWithAnalysis)
//         }
//     }, [answers])
//
//     const indexOfLastResult = currentPage * itemsPerPage
//     const indexOfFirstResult = indexOfLastResult - itemsPerPage
//     const currentUniqueResults = uniqueResults.slice(
//         indexOfFirstResult,
//         indexOfLastResult
//     )
//     const totalUniquePages = Math.ceil(uniqueResults.length / itemsPerPage)
//
//     return (
//         <section className="p-6 min-h-screen bg-gray-100">
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis</h1>
//
//             {loading ? (
//                 <p className="text-gray-600">Loading...</p>
//             ) : currentUniqueResults.length > 0 ? (
//                 <div className="space-y-4">
//                     {currentUniqueResults.map((result, index) => (
//                         <div
//                             key={index}
//                             className={`p-4 shadow-md rounded-lg border border-gray-200 ${getResultBackgroundColor(index)}`}
//                         >
//                             <p className="text-gray-700">{result.analysis}</p>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-600">No results available.</p>
//             )}
//
//             <div className="flex justify-center mt-6 space-x-4">
//                 <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     className={`relative w-24 px-3 py-2 rounded overflow-hidden transition-all duration-300 ${
//                         currentPage === 1
//                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                             : 'bg-logo-green text-white hover:bg-[#4F7164] group'
//                     }`}
//                     disabled={currentPage === 1}
//                 >
//                     <span
//                         className={`relative z-10 ${currentPage === 1 ? 'pointer-events-none' : ''}`}
//                     >
//                         Previous
//                     </span>
//                     <span className="absolute inset-0 overflow-hidden rounded-md">
//                         <span
//                             className={`absolute left-0 w-full h-full origin-center -translate-x-full rounded-full bg-[#4F7164] transition-transform duration-500 ${
//                                 currentPage === 1
//                                     ? 'hidden'
//                                     : 'group-hover:translate-x-0 group-hover:scale-150'
//                             }`}
//                         ></span>
//                     </span>
//                 </button>
//
//                 {/* Conditional rendering for page numbers */}
//                 <div className="hidden md:flex">
//                     {Array.from(
//                         { length: totalUniquePages },
//                         (_, i) => i + 1
//                     ).map((pageNumber) => (
//                         <button
//                             key={pageNumber}
//                             onClick={() => handlePageChange(pageNumber)}
//                             className={`px-3 py-2 rounded ${currentPage === pageNumber ? 'bg-[#9BB7A4] text-gray-800' : 'bg-gray-200 text-[#9BB7A4] hover:bg-[#4F7164] hover:text-white'}`}
//                         >
//                             {pageNumber}
//                         </button>
//                     ))}
//                 </div>
//
//                 <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     className={`relative w-24 px-3 py-2 rounded overflow-hidden transition-all duration-300 ${
//                         currentPage === totalUniquePages
//                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                             : 'bg-logo-green text-white hover:bg-[#4F7164] group'
//                     }`}
//                     disabled={currentPage === totalUniquePages}
//                 >
//                     <span
//                         className={`relative z-10 ${currentPage === totalUniquePages ? 'pointer-events-none' : ''}`}
//                     >
//                         Next
//                     </span>
//                     <span className="absolute inset-0 overflow-hidden rounded-md">
//                         <span
//                             className={`absolute left-0 w-full h-full origin-center -translate-x-full rounded-full bg-[#4F7164] transition-transform duration-500 ${
//                                 currentPage === totalUniquePages
//                                     ? 'hidden'
//                                     : 'group-hover:translate-x-0 group-hover:scale-150'
//                             }`}
//                         ></span>
//                     </span>
//                 </button>
//             </div>
//
//             {currentPage === totalUniquePages && lieAnalysis && (
//                 <div className="mt-8">
//                     <div className="bg-pantone624 shadow-md rounded-lg border border-gray-200 p-6">
//                         <p className="text-gray-700 mt-2">{lieAnalysis}</p>
//                     </div>
//                 </div>
//             )}
//         </section>
//     )
// }
//
// export default Analysis


'use client'

import React, { useCallback, useEffect, useState } from 'react'
import testAnalysisData from '@/components/Analysis/Data/TestAnalysisData'
import lieScale from '@/components/Analysis/Data/LieScale'
import { useSearchParams } from 'next/navigation'
import { getTestResponses } from '@/app/api/answers'
import testQuestions from '@/components/(menu)/Test/Data/testQuestions'
import SampleAnalysis from '@/components/Analysis/SampleAnalysis'

const lies = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]
const evaluatedPositions = new Set()
const results = []

export const Analysis = () => {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')

    if (mode === 'test') {
        return <TestAnalysis /> // Render the TestAnalysis component
    } else {
        return <SampleAnalysis /> // Render the SampleAnalysis component
    }
}

const TestAnalysis = () => {
    const [answers, setAnswers] = useState<number[]>([])
    const [matchedQuestions, setMatchedQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [fadeIn, setFadeIn] = useState<boolean>(false) // State to control fade-in effect
    const [totalLieValue, setTotalLieValue] = useState<number>(0)
    const [lieAnalysis, setLieAnalysis] = useState<string | null>(null)
    const [uniqueResults, setUniqueResults] = useState<any[]>([])
    const [itemsPerPage, setItemsPerPage] = useState<number>(6) // Default page size
    const [totalPages, setTotalPages] = useState<number>(0) // Total pages calculation

    const fetchAnswers = useCallback(async () => {
        setLoading(true)
        try {
            let fetchedAnswers = await getTestResponses()

            if (fetchedAnswers.length > 0) {
                const questionsList = fetchedAnswers
                    .map((answer, index) => {
                        return (
                            testAnalysisData.find(
                                (q) =>
                                    q.answer === index &&
                                    q.low <= answer &&
                                    q.high >= answer &&
                                    q.scale
                            ) || null
                        )
                    })
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

    useEffect(() => {
        fetchAnswers()
    }, [fetchAnswers])

    useEffect(() => {
        if (answers.length > 0) {
            const lieValues = lies
                .map((index) => answers[index])
                .filter(Boolean)
            const totalLie = lieValues.reduce((acc, value) => acc + value, 0)
            setTotalLieValue(totalLie)

            const analysis =
                lieScale.find(
                    (entry) => totalLie >= entry.low && totalLie <= entry.high
                )?.analysis || 'No analysis available.'
            setLieAnalysis(analysis)
        }
    }, [answers])

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
        if (matchedQuestions.length > 0) {
            setTotalPages(Math.ceil(matchedQuestions.length / itemsPerPage))
        }
    }, [matchedQuestions, itemsPerPage])

    useEffect(() => {
        // Trigger fade-in when the page changes
        setFadeIn(false)
        const timer = setTimeout(() => setFadeIn(true), 100) // Delay to ensure smooth fade-in
        return () => clearTimeout(timer) // Clean up timer on component unmount
    }, [currentPage])

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const getResultBackgroundColor = (index) => {
        return index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'
    }

    useEffect(() => {
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
                    className={`space-y-4 transition-opacity duration-5000 ${
                        fadeIn ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {currentUniqueResults.map((result, index) => (
                        <div
                            key={index}
                            className={`p-4 shadow-md rounded-lg border border-gray-200 ${getResultBackgroundColor(index)}`}
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
                    className={`relative w-24 px-3 py-2 rounded overflow-hidden transition-all duration-300 ${
                        currentPage === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-logo-green text-white hover:bg-[#4F7164] group'
                    }`}
                    disabled={currentPage === 1}
                >
                    <span
                        className={`relative z-10 ${currentPage === 1 ? 'pointer-events-none' : ''}`}
                    >
                        Previous
                    </span>
                </button>

                <div className="hidden md:flex">
                    {Array.from(
                        { length: totalUniquePages },
                        (_, i) => i + 1
                    ).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 rounded ${currentPage === pageNumber ? 'bg-[#9BB7A4] text-gray-800' : 'bg-gray-200 text-[#9BB7A4] hover:bg-[#4F7164] hover:text-white'}`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`relative w-24 px-3 py-2 rounded overflow-hidden transition-all duration-300 ${
                        currentPage === totalUniquePages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-logo-green text-white hover:bg-[#4F7164] group'
                    }`}
                    disabled={currentPage === totalUniquePages}
                >
                    <span
                        className={`relative z-10 ${currentPage === totalUniquePages ? 'pointer-events-none' : ''}`}
                    >
                        Next
                    </span>
                </button>
            </div>

            {currentPage === totalUniquePages && lieAnalysis && (
                <div className="mt-8">
                    <div className="bg-pantone624 shadow-md rounded-lg border border-gray-200 p-6">
                        <p className="text-gray-700 mt-2">{lieAnalysis}</p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Analysis
