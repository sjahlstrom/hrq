// 'use client'
//
// import React, { useState, useRef, useCallback } from 'react'
// import { Button } from '@/components/ui/button'
// import { Loader2, Download } from 'lucide-react'
// import { pdf } from '@react-pdf/renderer'
// import html2canvas from 'html2canvas'
// import PDFDocument from './pdf-document'
// import { Scale } from '@/components/(test)/Analysis/Charts/bChart'
// import { BChart } from '@/components/(test)/Analysis/Charts/bChart'
//
// interface PDFDownloadButtonProps {
//     lieAnalysis: string
//     totalSummedValues: number
//     chartData: {
//         scale: string
//         score: number
//         statement: string
//     }[]
//     scales: Scale[][]
// }
//
// const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
//     lieAnalysis,
//     totalSummedValues,
//     chartData,
//     scales,
// }) => {
//     const [isGenerating, setIsGenerating] = useState(false)
//     const chartRefs = useRef<(HTMLDivElement | null)[]>([])
//
//     const setChartRef = useCallback(
//         (el: HTMLDivElement | null, index: number) => {
//             chartRefs.current[index] = el
//         },
//         []
//     )
//
//     const generatePDF = useCallback(async () => {
//         setIsGenerating(true)
//
//         try {
//             // Capture chart images
//             const chartImages = await Promise.all(
//                 scales.map(async (scale, index) => {
//                     const chartElement = chartRefs.current[index]
//                     if (!chartElement) return ''
//
//                     const canvas = await html2canvas(chartElement, {
//                         scale: 2,
//                         logging: false,
//                         useCORS: true,
//                         allowTaint: true,
//                     })
//                     return canvas.toDataURL('image/png')
//                 })
//             )
//
//             // Generate PDF
//             const blob = await pdf(
//                 <PDFDocument
//                     lieAnalysis={lieAnalysis}
//                     totalSummedValues={totalSummedValues}
//                     chartData={chartData}
//                     scales={scales}
//                     chartImages={chartImages}
//                 />
//             ).toBlob()
//
//             // Trigger download
//             const url = URL.createObjectURL(blob)
//             const link = document.createElement('a')
//             link.href = url
//             link.download = `test-analysis-results-${Date.now()}.pdf`
//             link.click()
//             URL.revokeObjectURL(url)
//         } catch (error) {
//             console.error('Error generating PDF:', error)
//         } finally {
//             setIsGenerating(false)
//         }
//     }, [lieAnalysis, totalSummedValues, chartData, scales])
//
//     return (
//         <>
//             <div
//                 style={{
//                     position: 'absolute',
//                     left: '-9999px',
//                     top: '-9999px',
//                 }}
//             >
//                 {scales.map((scale, index) => (
//                     <div
//                         key={`chart-${index}`}
//                         ref={(el) => setChartRef(el, index)}
//                         style={{ width: '500px', height: '300px' }}
//                     >
//                         <BChart scales={scale} />
//                     </div>
//                 ))}
//             </div>
//             {/*<Button onClick={generatePDF} disabled={isGenerating} className="flex  text-red-500  hover:text-red-700  items-center gap-2">*/}
//             {/*    {isGenerating ? (*/}
//             {/*        <>*/}
//             {/*            <Loader2 className="h-4 w-4 animate-spin" />*/}
//             {/*            Generating PDF...*/}
//             {/*        </>*/}
//             {/*    ) : (*/}
//             {/*        <>*/}
//             {/*        Download PDF*/}
//             {/*        </>*/}
//             {/*    )}*/}
//             {/*</Button>*/}
//
//             <Button
//                 onClick={generatePDF}
//                 disabled={isGenerating}
//                 className={`flex items-center gap-2 ${
//                     isGenerating
//                         ? 'text-red-500 hover:text-red-700'
//                         : 'text-red-500 hover:text-red-700 active:bg-red-100 active:text-red-800'
//                 }`}
//             >
//                 {isGenerating ? (
//                     <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Generating PDF...
//                     </>
//                 ) : (
//                     <>
//                         <Download className="h-4 w-4" />
//                         Download PDF
//                     </>
//                 )}
//             </Button>
//         </>
//     )
// }
//
// export default PDFDownloadButton

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Download } from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import html2canvas from 'html2canvas'
import PDFDocument from './pdf-document'
import { Scale } from '@/components/(test)/Analysis/Charts/bChart'
import { BChart } from '@/components/(test)/Analysis/Charts/bChart'

interface PDFDownloadButtonProps {
    lieAnalysis: string
    totalSummedValues: number
    chartData: {
        scale: string
        score: number
        statement: string
    }[]
    scales: Scale[][]
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
                                                                 lieAnalysis,
                                                                 totalSummedValues,
                                                                 chartData,
                                                                 scales,
                                                             }) => {
    const [isGenerating, setIsGenerating] = useState(false)
    const [buttonText, setButtonText] = useState('Download PDF')
    const chartRefs = useRef<(HTMLDivElement | null)[]>([])

    const setChartRef = useCallback(
        (el: HTMLDivElement | null, index: number) => {
            chartRefs.current[index] = el
        },
        []
    )

    const generatePDF = useCallback(async () => {
        setIsGenerating(true)
        setButtonText('Generating PDF...')

        try {
            // Capture chart images
            const chartImages = await Promise.all(
                scales.map(async (scale, index) => {
                    const chartElement = chartRefs.current[index]
                    if (!chartElement) return ''

                    const canvas = await html2canvas(chartElement, {
                        scale: 2,
                        logging: false,
                        useCORS: true,
                        allowTaint: true,
                    })
                    return canvas.toDataURL('image/png')
                })
            )

            // Generate PDF
            const blob = await pdf(
                <PDFDocument
                    lieAnalysis={lieAnalysis}
                    totalSummedValues={totalSummedValues}
                    chartData={chartData}
                    scales={scales}
                    chartImages={chartImages}
                />
            ).toBlob()

            // Trigger download
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `test-analysis-results-${Date.now()}.pdf`
            link.click()
            URL.revokeObjectURL(url)
            setButtonText('Download Complete!')
        } catch (error) {
            console.error('Error generating PDF:', error)
            setButtonText('Download Failed')
        } finally {
            setIsGenerating(false)
            // Reset text after a brief delay to allow the user to see the completion/failure status
            setTimeout(() => setButtonText('Download PDF'), 2000)
        }
    }, [lieAnalysis, totalSummedValues, chartData, scales])

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: '-9999px',
                }}
            >
                {scales.map((scale, index) => (
                    <div
                        key={`chart-${index}`}
                        ref={(el) => setChartRef(el, index)}
                        style={{ width: '500px', height: '300px' }}
                    >
                        <BChart scales={scale} />
                    </div>
                ))}
            </div>
            <Button
                onClick={generatePDF}
                disabled={isGenerating}
                className={`flex items-center gap-2 ${
                    isGenerating
                        ? 'text-red-500 hover:text-red-700 cursor-wait'
                        : 'text-red-500 hover:text-red-700 active:bg-red-100 active:text-red-800'
                }`}
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {buttonText}
                    </>
                ) : (
                    <>
                        <Download className="h-4 w-4" />
                        {buttonText}
                    </>
                )}
            </Button>
        </>
    )
}

export default PDFDownloadButton
