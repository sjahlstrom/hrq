'use client'

import React, { useState, useRef, useCallback, useMemo } from 'react'
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
                                                                 scales,
                                                             }) => {
    const [isGenerating, setIsGenerating] = useState(false)
    const chartRefs = useRef<(HTMLDivElement | null)[]>([])
    const generationInProgress = useRef(false)
    const [cachedImages, setCachedImages] = useState<string[]>([])
    const lastGeneratedAt = useRef<number>(0)
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

    const setChartRef = useCallback(
        (el: HTMLDivElement | null, index: number) => {
            chartRefs.current[index] = el
        },
        []
    )

    // Memoize chart rendering options
    const chartOptions = useMemo(() => ({
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        removeContainer: true,
        foreignObjectRendering: true,
    }), [])

    // Debounced chart generation
    const generateChartImages = useCallback(async () => {
        const now = Date.now()
        if (
            cachedImages.length === scales.length &&
            now - lastGeneratedAt.current < CACHE_DURATION
        ) {
            return cachedImages
        }

        const images = await Promise.all(
            scales.map(async (scale, index) => {
                const chartElement = chartRefs.current[index]
                if (!chartElement) {
                    console.warn(`Chart element ${index + 1} not found`)
                    return ''
                }

                try {
                    // Use requestAnimationFrame for better performance
                    await new Promise(requestAnimationFrame)

                    const canvas = await html2canvas(chartElement, chartOptions)
                    return canvas.toDataURL('image/png', 0.8) // Compress images
                } catch (error) {
                    console.error(`Error capturing chart ${index + 1}:`, error)
                    return ''
                }
            })
        )

        // Update cache
        setCachedImages(images)
        lastGeneratedAt.current = now
        return images
    }, [scales, cachedImages, chartOptions])

    // Optimized PDF generation with debouncing and caching
    const generatePDF = useCallback(async () => {
        if (generationInProgress.current) {
            return
        }

        try {
            generationInProgress.current = true
            setIsGenerating(true)

            const chartImages = await generateChartImages()

            const blob = await pdf(
                <PDFDocument
                    lieAnalysis={lieAnalysis}
                    totalSummedValues={totalSummedValues}
                    chartData={chartData}
                    scales={scales}
                    chartImages={chartImages}
                />
            ).toBlob()

            // Create and trigger download
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `test-analysis-results-${Date.now()}.pdf`

            // Use click() on the next animation frame
            requestAnimationFrame(() => {
                link.click()
                URL.revokeObjectURL(url)
            })

        } catch (error) {
            console.error('Error generating PDF:', error)
        } finally {
            generationInProgress.current = false
            setIsGenerating(false)
        }
    }, [lieAnalysis, totalSummedValues, chartData, scales, generateChartImages])

    // Memoize hidden charts container
    const hiddenCharts = useMemo(() => (
        <div
            style={{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                pointerEvents: 'none',
                opacity: 0,
            }}
            aria-hidden="true"
        >
            {scales.map((scale, index) => (
                <div
                    key={`chart-${index}`}
                    ref={(el) => setChartRef(el, index)}
                    style={{
                        width: '500px',
                        height: '300px',
                        contain: 'paint layout'
                    }}
                >
                    <BChart scales={scale} />
                </div>
            ))}
        </div>
    ), [scales, setChartRef])

    return (
        <>
            {hiddenCharts}
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

export default React.memo(PDFDownloadButton)