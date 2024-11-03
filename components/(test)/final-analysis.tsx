import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ScoreClassificationTable from '@/components/(test)/score-classification-table'
import NextSteps from '@/components/(test)/next-steps'
import { BChart } from '@/components/(test)/Analysis/bChart'
import scaleEnums from '@/components/(test)/Analysis/Data/Constants/scaleEnums'

interface FinalAnalysisProps {
    lieAnalysis: string
    totalSummedValues: number
}

const scales = [
    { number: scaleEnums.AGR, name: 'AGR' },
    { number: scaleEnums.ALT, name: 'ALT' },
    { number: scaleEnums.AUT, name: 'AUT' },
    { number: scaleEnums.BOU, name: 'BOU' },
    { number: scaleEnums.CNC, name: 'CNC' },
]
const scales2 = [
    { number: scaleEnums.COO, name: 'COO' },
    { number: scaleEnums.GEQ, name: 'GEQ' },
    { number: scaleEnums.EMI, name: 'EMI' },
    { number: scaleEnums.EMP, name: 'EMP' },
    { number: scaleEnums.FOR, name: 'FOR' },
]

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
            </div>
        </>
    )
}

export default FinalAnalysis
