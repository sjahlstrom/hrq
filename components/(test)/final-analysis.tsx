'use client'

import React, { useMemo, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ScoreClassificationTable from '@/components/(test)/score-classification-table'
import NextSteps from '@/components/(test)/next-steps'
import { BChart } from '@/components/(test)/Analysis/Charts/bChart'
import Scales from '@/components/(test)/Analysis/Data/Constants/Scales'
import PDFDownloadButton from '@/components/(test)/Analysis/pdf-download-button'

interface ScaleItem {
    number: number
    name: string
}

type ScaleArray = ScaleItem[]

interface ChartDataItem {
    scale: string
    score: number
    statement: string
}

interface FinalAnalysisProps {
    lieAnalysis: string
    totalSummedValues: number
    chartData: ChartDataItem[]
}

const MemoizedBChart = React.memo(BChart)
const MemoizedScoreClassificationTable = React.memo(ScoreClassificationTable)
const MemoizedNextSteps = React.memo(NextSteps)

const PDFDownloadButtonWrapper = React.memo(
    ({
        lieAnalysis,
        totalSummedValues,
        chartData,
        scales,
    }: {
        lieAnalysis: string
        totalSummedValues: number
        chartData: ChartDataItem[]
        scales: ScaleArray[]
    }) => (
        <div className="mt-4 flex justify-center">
            <PDFDownloadButton
                lieAnalysis={lieAnalysis}
                totalSummedValues={totalSummedValues}
                chartData={chartData}
                scales={scales}
            />
        </div>
    )
)

PDFDownloadButtonWrapper.displayName = 'PDFDownloadButtonWrapper'

const FinalAnalysis: React.FC<FinalAnalysisProps> = React.memo(
    ({ lieAnalysis, totalSummedValues, chartData }) => {
        const allScales = useMemo<ScaleArray[]>(
            () => [
                Scales.scales,
                Scales.scales2,
                Scales.scales3,
                Scales.scales4,
                Scales.scales5,
                Scales.scales6,
                Scales.scales7,
                Scales.scales8,
                Scales.scales9,
                Scales.scales10,
                Scales.scales11,
                Scales.scales12,
            ],
            []
        )

        const memoizedChartData = useMemo(() => chartData, [chartData])

        const renderBChart = useCallback(
            (scaleItem: ScaleArray, index: number) => (
                <div key={index} className="w-full px-1">
                    <MemoizedBChart scales={scaleItem} />
                </div>
            ),
            []
        )

        return (
            <>
                <div className="mt-8 space-y-8">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-gray-700">{lieAnalysis}</p>
                        </CardContent>
                    </Card>
                    <MemoizedScoreClassificationTable />
                    <MemoizedNextSteps totalSummedValues={totalSummedValues} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 p-4">
                    {allScales.map(renderBChart)}
                </div>
                <PDFDownloadButtonWrapper
                    lieAnalysis={lieAnalysis}
                    totalSummedValues={totalSummedValues}
                    chartData={memoizedChartData}
                    scales={allScales}
                />
            </>
        )
    }
)

FinalAnalysis.displayName = 'FinalAnalysis'

export default FinalAnalysis
