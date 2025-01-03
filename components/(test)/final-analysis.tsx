'use client';

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScoreClassificationTable from '@/components/(test)/score-classification-table';
import { BChart } from '@/components/(test)/Analysis/Charts/bChart';
import Scales from '@/components/(test)/Analysis/Data/Constants/Scales';
import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions';
import { batchSumTestResponses } from '@/lib/actions/users';
import { Scale, ChartDataItem } from '@/types/chart';

interface FinalAnalysisProps {
    lieAnalysis: string;
    totalSummedValues: number;
    chartData: ChartDataItem[];
}

const MemoizedScoreClassificationTable = React.memo(ScoreClassificationTable);

const FinalAnalysis: React.FC<FinalAnalysisProps> = ({
                                                         lieAnalysis,
                                                         totalSummedValues,
                                                         chartData,
                                                     }) => {
    const [scaleData, setScaleData] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const allScales = useMemo<Scale[][]>(
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

    useEffect(() => {
        let mounted = true;

        const fetchAllScaleData = async () => {
            try {
                setIsLoading(true);
                const allPositions = allScales.flatMap(scaleArray =>
                    scaleArray.flatMap(scale => {
                        const positions = findPositionsForScale(scale.number);
                        // Explicitly type the tuple and verify length
                        if (positions.length === 2) {
                            const positionTuple: [number, number] = [positions[0], positions[1]];
                            return [positionTuple];
                        }
                        return [];
                    })
                );

                const results = await batchSumTestResponses(allPositions);
                if (mounted) {
                    setScaleData(results);
                    setIsLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch scale data');
                    setIsLoading(false);
                }
            }
        };

        fetchAllScaleData();

        return () => {
            mounted = false;
        };
    }, [allScales]);

    const renderBChart = useCallback(
        (scaleArray: Scale[], index: number) => (
            <div key={index} className="w-full px-1">
                <BChart
                    scales={scaleArray}
                    preloadedData={scaleData}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        ),
        [scaleData, isLoading, error]
    );

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-red-500">Error loading data: {error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div className="mt-8 space-y-8">
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