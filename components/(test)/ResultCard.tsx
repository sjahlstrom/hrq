import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface ResultCardProps {
    result: {
        scale: number;
        positions: number[];
        answers: number[];
        summedResult: number;
        analysis: string;
    };
    index: number;
}

export default function ResultCard({ result, index }: ResultCardProps) {
    const getResultBackgroundColor = (index: number) =>
        index % 2 === 0 ? 'bg-green-800' : 'bg-green-900'
    return (
        <Card className={`${getResultBackgroundColor(index)} border border-gray-400`}>
            <CardContent className="p-4">
                {/*<h2 className="text-2xl font-semibold text-gray-900 mb-2">*/}
                {/*    Scale: {result.scale}*/}
                {/*</h2>*/}
                {/*<p className="text-gray-700 mb-1">*/}
                {/*    Question Positions: {result.positions.join(', ')}*/}
                {/*</p>*/}
                {/*<p className="text-gray-700 mb-1">*/}
                {/*    Answers: {result.answers.join(', ')}*/}
                {/*</p>*/}
                {/*<p className="text-gray-700 mb-2">*/}
                {/*    Summed Result: {result.summedResult}*/}
                {/*</p>*/}
                <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-gray-800 font-medium">Analysis:</p>
                    <p className="text-gray-700 mt-1">{result.analysis}</p>
                </div>
            </CardContent>
        </Card>
    )
}