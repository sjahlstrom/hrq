import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function ResultCard({ result, index }) {
    const getResultBackgroundColor = (index: number) =>
        index % 2 === 0 ? 'bg-pantone621' : 'bg-pantone622'

    return (
        <Card className={`${getResultBackgroundColor(index)} border-gray-400`}>
            <CardContent className="p-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Scale: {result.scale}
                </h2>
                <p className="text-gray-700">
                    Question Positions: {result.positions.join(', ')}
                </p>
                <p className="text-gray-700">
                    Answers: {result.answers.join(', ')}
                </p>
                <p className="text-gray-700">
                    Summed Result: {result.summedResult}
                </p>
                <p className="text-gray-700">Analysis: {result.analysis}</p>
            </CardContent>
        </Card>
    )
}
