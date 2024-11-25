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
                <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-gray-700 mt-1">{result.analysis}</p>
                </div>
            </CardContent>
        </Card>
    )
}