import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ScoreClassificationTable from '@/components/(test)/score-classification-table'
import NextSteps from '@/components/(test)/next-steps'
import { BChart } from '@/components/(test)/Analysis/bChart'
import {
    scales,
    scales2,
    scales3,
    scales4,
    scales5,
    scales6,
    scales7,
    scales8,
    scales9,
    scales10,
    scales11,
    scales12,
} from '@/components/(test)/Analysis/Data/Constants/Scales'
import { Button } from '@/components/ui/button'

interface FinalAnalysisProps {
    lieAnalysis: string
    totalSummedValues: number
}

const FinalAnalysis: React.FC<FinalAnalysisProps> = ({
    lieAnalysis,
    totalSummedValues,
}) => {
    return (
        <>
            <div className="mt-8 space-y-8">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-gray-700">{lieAnalysis}</p>
                    </CardContent>
                </Card>
                <ScoreClassificationTable />
                <NextSteps totalSummedValues={totalSummedValues} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gpp-4 py-2 p-4">
                <div className="w-full px-1">
                    <BChart scales={scales} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales2} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales3} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales4} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales5} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales6} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales7} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales8} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales9} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales10} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales11} />
                </div>
                <div className="w-full px-1">
                    <BChart scales={scales12} />
                </div>
            </div>
            <Button>Generate PDF</Button>
        </>
    )
}

export default FinalAnalysis
