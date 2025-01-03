'use client';

import React, { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
    Cell,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import findPositionsForScale from '@/components/(test)/Analysis/Charts/positions';
import rawCannedScaleStatements from '@/components/(test)/Analysis/Data/Constants/scaleCannedStatements';
import { Scale, ScaleStatement, ChartDataItem } from '@/types/chart';

// Constants
const CONSTANTS = {
    CHART_CONFIG: {
        score: { label: 'Score', color: 'hsl(var(--chart-2))' },
    },
    THRESHOLDS: {
        LOW: 10,
        MEDIUM: 20,
    },
    COLORS: {
        LOW: '#FF6B6B',
        MEDIUM: '#F7F751',
        HIGH: '#4CAF50',
    },
} as const;

// Create statements Map during module initialization
const STATEMENTS_MAP = rawCannedScaleStatements.reduce((acc, statement) => {
    const statements = acc.get(statement.name) || [];
    acc.set(statement.name, [...statements, statement]);
    return acc;
}, new Map<string, ScaleStatement[]>());

// Utility functions
const getColor = (score: number): string => {
    const { THRESHOLDS, COLORS } = CONSTANTS;
    if (score <= THRESHOLDS.LOW) return COLORS.LOW;
    if (score <= THRESHOLDS.MEDIUM) return COLORS.MEDIUM;
    return COLORS.HIGH;
};

const getStatement = (scaleName: string, score: number): string => {
    const statements = STATEMENTS_MAP.get(scaleName);
    if (!statements?.length) return 'No statement available for this score.';

    const matchingStatement = statements.find(
        (s) => score > s.low && score <= s.high
    );
    return matchingStatement?.statement ?? 'No statement available for this score.';
};

interface BChartProps {
    scales: Scale[];
    preloadedData: Record<string, number>;
    isLoading: boolean;
    error: string | null;
}

const ScaleCard = React.memo<{ item: ChartDataItem }>(({ item }) => (
    <Card className="bg-hrqColors-skyBlue-700 border-hrqColors-sunsetOrange-500 rounded-2xl shadow-xl">
        <CardContent>
            <p className="text-primary mt-4">{item.statement}</p>
        </CardContent>
    </Card>
));

ScaleCard.displayName = 'ScaleCard';

export const BChart = React.memo<BChartProps>(({ scales, preloadedData, isLoading, error }) => {
    const chartData = useMemo(() => {
        if (!preloadedData || Object.keys(preloadedData).length === 0) {
            return [];
        }

        return scales.map(scale => {
            const positions = findPositionsForScale(scale.number);
            const key = `${positions[0]},${positions[1]}`;
            const response = preloadedData[key] ?? 0;
            const score = response / 2;

            return {
                scale: scale.name,
                score,
                tooltipContent: getStatement(scale.name, score),
                color: getColor(score),
                statement: getStatement(scale.name, score),
            };
        });
    }, [scales, preloadedData]);

    if (isLoading) {
        return (
            <Card className="w-full h-48 flex items-center justify-center">
                <CardContent>Loading...</CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="p-6 text-center">
                    <p className="text-red-500 mb-4">Error: {error}</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <Card className="bg-hrqColors-coolGray-600 border-hrqColors-sunsetOrange-300 rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle>Scale Scores</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={CONSTANTS.CHART_CONFIG}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                            height={300}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="scale"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis
                                domain={[0, 30]}
                                ticks={[0, 5, 10, 15, 20, 25, 30]}
                                tickLine
                                axisLine
                                tickMargin={10}
                            />
                            <Bar dataKey="score" radius={4}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                                <LabelList
                                    dataKey="score"
                                    position="top"
                                    offset={5}
                                    fill="#333"
                                    fontSize={12}
                                    formatter={(value: number) => value.toFixed(2)}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="text-dark flex-col items-start gap-2 text-sm">
                    <div className="text-hrqColors-coolGray-100 flex gap-2 font-medium leading-none">
                        Color indicates score level
                    </div>
                    <div className="leading-none text-muted-foreground">
                        <span style={{ color: '#ff6b6b' }}>Red = Low, </span>
                        <span style={{ color: '#FFD700' }}>Yellow = Medium, </span>
                        <span style={{ color: '#00A000' }}>Green = High</span>
                    </div>
                </CardFooter>
            </Card>
            <div className="mt-8 space-y-4">
                {chartData.map((item, index) => (
                    <ScaleCard key={`scale-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
});

BChart.displayName = 'BChart';
