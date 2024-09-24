import { Card, CardContent } from '@/components/ui/card'
import ScoreClassificationTable from'@/components/(test)/score-classification-table'
import NextSteps from '@/components/(test)/next-steps'
import React from 'react'

const FinalAnalysis = ({ lieAnalysis, totalSummedValues }) => {
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