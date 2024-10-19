import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ScoreClassificationTable from '@/components/(test)/score-classification-table'
import NextSteps from '@/components/(test)/next-steps'

interface FinalAnalysisProps {
    lieAnalysis: string
    totalSummedValues: number
}

const FinalAnalysis: React.FC<FinalAnalysisProps> = ({ lieAnalysis, totalSummedValues }) => {
    return (
        <div className="mt-8 space-y-8">
            <Card>
                <CardContent className="p-6">
                    <p className="text-gray-700">{lieAnalysis}</p>
                </CardContent>
            </Card>
            <ScoreClassificationTable />
            <NextSteps totalSummedValues={totalSummedValues} />
        </div>
    )
}

export default FinalAnalysis