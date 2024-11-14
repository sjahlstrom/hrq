'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
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
                                                                 scales
                                                             }) => {
    const [isGenerating, setIsGenerating] = useState(false)
    const chartRefs = useRef<(HTMLDivElement | null)[]>([])

    const setChartRef = useCallback((el: HTMLDivElement | null, index: number) => {
        chartRefs.current[index] = el
    }, [])

    const generateChartImages = async () => {
        const images = await Promise.all(
            scales.map(async (scale, index) => {
                const chartElement = chartRefs.current[index]
                if (chartElement) {
                    // Wait for any animations or renders to complete
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    try {
                        const canvas = await html2canvas(chartElement, {
                            scale: 2, // Increase resolution
                            logging: true, // Enable logging for debugging
                            useCORS: true,
                            allowTaint: true
                        })
                        return canvas.toDataURL('image/png')
                    } catch (error) {
                        console.error(`Error capturing chart ${index + 1}:`, error)
                        return ''
                    }
                }
                console.warn(`Chart element ${index + 1} not found`)
                return ''
            })
        )
        return images
    }

    const generatePDF = async () => {
        setIsGenerating(true)
        try {
            const chartImages = await generateChartImages()
            console.log('Generated chart images:', chartImages.length)
            const blob = await pdf(
                <PDFDocument
                    lieAnalysis={lieAnalysis}
                    totalSummedValues={totalSummedValues}
                    chartData={chartData}
                    scales={scales}
                    chartImages={chartImages}
                />
            ).toBlob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'test-analysis-results.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error generating PDF:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <>
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                {scales.map((scale, index) => (
                    <div key={index} ref={(el) => setChartRef(el, index)} style={{ width: '500px', height: '300px' }}>
                        <BChart scales={scale} />
                    </div>
                ))}
            </div>
            <Button
                onClick={generatePDF}
                disabled={isGenerating}
                className="flex items-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating PDF...
                    </>
                ) : (
                    'Download PDF'
                )}
            </Button>
        </>
    )
}

export default PDFDownloadButton