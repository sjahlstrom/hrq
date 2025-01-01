'use client';

import React, { useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScoreClassificationTable from '@/components/(test)/score-classification-table';
import { BChart } from '@/components/(test)/Analysis/Charts/bChart';
import Scales from '@/components/(test)/Analysis/Data/Constants/Scales';

interface ScaleItem {
    number: number;
    name: string;
}

type ScaleArray = ScaleItem[];

interface ChartDataItem {
    scale: string;
    score: number;
    statement: string;
}

interface FinalAnalysisProps {
    lieAnalysis: string;
    totalSummedValues: number;
    chartData: ChartDataItem[];
}

const MemoizedBChart = React.memo(BChart);
const MemoizedScoreClassificationTable = React.memo(ScoreClassificationTable);

const FinalAnalysis: React.FC<FinalAnalysisProps> = ({
                                                         lieAnalysis,
                                                         totalSummedValues,
                                                         chartData,
                                                     }) => {
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
    );

    const renderBChart = useCallback(
        (scaleItem: ScaleArray, index: number) => (
            <div key={index} className="w-full px-1">
                <MemoizedBChart scales={scaleItem} />
            </div>
        ),
        []
    );

    return (
        <>
            <div className="mt-8 space-y-8">
                {/* Display totalSummedValues */}


                <Card>
                    <CardContent className="p-6">
                        <p className="text-gray-700">{lieAnalysis}</p>
                    </CardContent>
                </Card>
                <div className="text-dark font-semibold text-lg text-center">
                    Your total score: {totalSummedValues}
                </div>
                <MemoizedScoreClassificationTable />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 p-4">
                {allScales.map(renderBChart)}
            </div>
        </>
    );
};

FinalAnalysis.displayName = 'FinalAnalysis';

export default React.memo(FinalAnalysis);
