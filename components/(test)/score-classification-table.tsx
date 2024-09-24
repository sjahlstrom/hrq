import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const ScoreClassificationTable = () => {
    const tableData = [
        {
            score: '≥ 1501.0',
            percentile: '98th and above',
            rq: '130 and above',
            classification: 'Very Superior',
        },
        {
            score: '1416 to 1500.5',
            percentile: '91 to 97',
            rq: '120-129',
            classification: 'Superior',
        },
        {
            score: '1314 to 1415.5',
            percentile: '75 to 90',
            rq: '110-119',
            classification: 'High Average',
        },
        {
            score: '1152 to 1313.5',
            percentile: '25 to 74',
            rq: '90-109',
            classification: 'Average',
        },
        {
            score: '1027 to 1151.5',
            percentile: '9 to 24',
            rq: '80-89',
            classification: 'Low Average',
        },
        {
            score: '903.5 to 1026.5',
            percentile: '2 to 8',
            rq: '70-79',
            classification: 'Borderline',
        },
        {
            score: '≤ 903',
            percentile: '1.98 and below',
            rq: '69 and below',
            classification: 'Inferior',
        },
    ]

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-red-800 text-center mb-6">
                    Score Classification Table
                </h2>
                <div className="grid grid-cols-4 gap-2 text-center text-red-800">
                    <div className="font-semibold">
                        Total (Composite) Scores
                    </div>
                    <div className="font-semibold">Percentile</div>
                    <div className="font-semibold">RQ</div>
                    <div className="font-semibold">Classification</div>
                    {tableData.map((row, index) => (
                        <React.Fragment key={index}>
                            <div>{row.score}</div>
                            <div>{row.percentile}</div>
                            <div>{row.rq}</div>
                            <div>{row.classification}</div>
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ScoreClassificationTable